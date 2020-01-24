export interface IItems<T> {
    [key: string]: T;
}

export interface IItem<T> {
    key: string;
    value: T;
}

export class KeyValueStore<T> {
    constructor(
        private dbName: string,
        private storeName: string,
        private indexedDB = window.indexedDB,
    ) {}

    public async setItem(key: string, value: T): Promise<void> {
        const [objectStore, transaction] = await this.startTransaction('readwrite');
        const request = this.makePutRequest(objectStore, key, value);
        await Promise.all([transaction, request]);
        objectStore.transaction.db.close();
    }

    public async setItems(items: { [key: string]: T }): Promise<void> {
        const [objectStore, transaction] = await this.startTransaction('readwrite');
        const requests = Object.keys(items).map((key) =>
            this.makePutRequest(objectStore, key, items[key]),
        );
        await Promise.all([transaction, ...requests]);
        objectStore.transaction.db.close();
    }

    public async getItem(key: string): Promise<T> {
        const [objectStore, transaction] = await this.startTransaction();
        const request = this.makeGetRequest(objectStore, key);
        const [, item] = await Promise.all([transaction, request]);
        objectStore.transaction.db.close();
        return item;
    }

    public async getItems(keys: string[] | null = null): Promise<IItems<T>> {
        const [objectStore, transaction] = await this.startTransaction();

        // no keys means get all
        if (keys === null) {
            return await this.makeGetAllRequest(objectStore);
        }

        const requests = keys.map((key) => {
            return this.makeGetRequest(objectStore, key).then((value: T) => {
                return { key, value } as IItem<T>;
            });
        });

        const convertToObject = (result: Array<IItem<T>>) =>
            result.reduce(
                (object, property) => {
                    object[property.key] = property.value;
                    return object;
                },
                {} as IItems<T>,
            );

        objectStore.transaction.db.close();

        return await Promise.all(requests)
            .then(convertToObject)
            .then(async (result) => {
                await transaction;
                return result;
            });
    }

    public async removeItem(key: string): Promise<void> {
        const [objectStore, transaction] = await this.startTransaction('readwrite');
        const request = this.makeDeleteRequest(objectStore, key);
        await Promise.all([transaction, request]);
        objectStore.transaction.db.close();
    }

    public async removeItems(keys: string[]): Promise<void> {
        const [objectStore, transaction] = await this.startTransaction('readwrite');
        const requests = keys.map((key) => this.makeDeleteRequest(objectStore, key));
        await Promise.all([transaction, ...requests]);
        objectStore.transaction.db.close();
    }

    public async clear(): Promise<void> {
        const [objectStore, transaction] = await this.startTransaction('readwrite');
        const request = new Promise((resolveRequest, rejectRequest) => {
            const clearRequest = objectStore.clear();
            clearRequest.onsuccess = resolveRequest;
            clearRequest.onerror = rejectRequest;
        });
        await Promise.all([transaction, request]);
        objectStore.transaction.db.close();
    }

    private initializeDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => this.openDatabase(resolve, reject));
    }

    private openDatabase(
        resolve: (value?: IDBDatabase) => void,
        reject: (reason: any) => void,
        version?: number,
    ) {
        // No indexedDB available, e.g. private tab in Edge
        if (!this.indexedDB) {
            return reject('No indexedDB support');
        }

        const request: IDBOpenDBRequest =
            version === undefined
                ? this.indexedDB.open(this.dbName)
                : this.indexedDB.open(this.dbName, version);

        request.onerror = () => reject(request.error);
        // Logging for debug purposes, we should be able to recover after being blocked
        request.onblocked = () => console.error('KeyValueStore blocked, store:', this.storeName);
        request.onsuccess = () => {
            const db = request.result;

            db.onabort = reject;
            db.onerror = reject;
            db.onversionchange = db.close;

            // The current database hasn't got the objectStore, close the database
            // and open a new with higher version to trigger onupgradeneeded.
            if (!this.hasObjectStore(db, this.storeName)) {
                db.close();
                this.openDatabase(resolve, reject, db.version + 1);
                return;
            }

            resolve(db);
        };
        request.onupgradeneeded = () => {
            const db = request.result;

            if (this.hasObjectStore(db, this.storeName)) {
                return;
            }

            db.createObjectStore(this.storeName);
        };
    }

    private hasObjectStore(db: IDBDatabase, storeName: string) {
        const objectStores: DOMStringList = db.objectStoreNames;

        return objectStores.contains(storeName);
    }

    private async startTransaction(
        mode: IDBTransactionMode = 'readonly',
    ): Promise<[IDBObjectStore, Promise<Event>]> {
        // Rejections from initialization should be cought by the consumers of the public methods
        const db = await this.initializeDatabase();

        try {
            const transaction = db.transaction([this.storeName], mode);
            const objectStore = transaction.objectStore(this.storeName);

            const transactionPromise = new Promise<Event>(
                (resolveTransaction, rejectTransaction) => {
                    transaction.oncomplete = () => resolveTransaction();
                    transaction.onerror = (event) => {
                        /**
                         * This step relies on any since the types lie from what we have been
                         * able to tell. The transaction.error property that is documented on
                         * MDN seems to be always null so either the unit tests mocking db
                         * don't adhere to the API correctly (most probable cause) or something
                         * else is wrong here.
                         *
                         * There are tests validating this in case the API would change but
                         * those tests won't detect if the types changes.
                         */
                        rejectTransaction((event.target as any).error);
                    };
                },
            );

            return [objectStore, transactionPromise];
        } catch (error) {
            // Transaction failed, e.g. beacause it's closed, try to reinitialize the database
            await this.initializeDatabase();
            return this.startTransaction(mode);
        }
    }

    private makePutRequest(objectStore: IDBObjectStore, key: string, value: T): Promise<Event> {
        return new Promise((resolveRequest, rejectRequest) => {
            try {
                const request = objectStore.put(value, key);
                request.onsuccess = resolveRequest;
                request.onerror = rejectRequest;
            } catch (error) {
                objectStore.transaction.abort();
                return rejectRequest(error);
            }
        });
    }

    private makeDeleteRequest(objectStore: IDBObjectStore, key: string): Promise<Event> {
        return new Promise((resolveRequest, rejectRequest) => {
            const request = objectStore.delete(key);
            request.onsuccess = resolveRequest;
            request.onerror = rejectRequest;
        });
    }

    private makeGetRequest(objectStore: IDBObjectStore, key: string): Promise<T> {
        return new Promise((resolveRequest, rejectRequest) => {
            const request = objectStore.get(key);
            request.onsuccess = () => resolveRequest(request.result);
            request.onerror = () => rejectRequest(request.error);
        });
    }

    private makeGetAllRequest(objectStore: IDBObjectStore): Promise<IItems<T>> {
        return new Promise((resolveRequest, rejectRequest) => {
            const result: IItems<T> = {};
            const request = objectStore.openCursor();

            // onsuccess will fire for each property in the database, accumulating data in result
            request.onsuccess = () => {
                const cursor: IDBCursorWithValue | null = request.result;

                if (cursor) {
                    result[cursor.key as string] = cursor.value;
                    cursor.continue();
                    return;
                }

                resolveRequest(result);
            };
            request.onerror = rejectRequest;
        });
    }
}
