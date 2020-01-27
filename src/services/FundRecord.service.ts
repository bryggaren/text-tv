import { IFundDetail, IFundRecord } from '../models';
import { KeyValueStore, IItems } from '../utils';

const Company_Fund_Separator = '#/#/#';
class FundRecordService {
    private fundStore = new KeyValueStore<number>('fondkollen', 'fundRecords');
    public async addFund(company: string, name: string): Promise<void> {
        const newFundKey = company.concat(Company_Fund_Separator, name);
        const existingFund = (await this.fundStore.getItem(newFundKey)) !== undefined;

        if (existingFund) {
            alert('Den här fonden finns redan bland dina fonder!');
        } else {
            this.fundStore.setItem(newFundKey, 0);
        }
    }

    public async deleteFund(company: string, name: string) {
        const key = company.concat(Company_Fund_Separator, name);
        await this.fundStore.removeItem(key);
    }

    public async changeHoldings(company: string, name: string, holdings: number) {
        const key = company.concat(Company_Fund_Separator, name);
        await this.fundStore.removeItem(key);
        await this.fundStore.setItem(key, holdings);
    }
    public async getFunds(): Promise<IFundRecord[]> {
        const keys = await this.fundStore.getItems();
        const funds: IFundRecord[] = [];
        for (const key in keys) {
            const fundRecord = this.createFundRecord(key, await this.fundStore.getItem(key));
            const existingCompany = funds.find((fund) => fund.company === fundRecord.company);
            if (existingCompany) {
                existingCompany.holdingInfo.push(fundRecord.holdingInfo[0]);
                existingCompany.holdingInfo.sort((a, b) => {
                    const x = a.fundName.toLowerCase();
                    const y = b.fundName.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                funds.push(fundRecord);
            }
        }
        funds.sort((a, b) => {
            const x = a.company.toLowerCase();
            const y = b.company.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        console.log(funds);
        return funds;
    }

    private createFundRecord(key: string, value: number): IFundRecord {
        const info = key.split(Company_Fund_Separator);
        return { company: info[0], holdingInfo: [{ fundName: info[1], shares: value }] };
    }
}

export const fundRecordService = new FundRecordService();

// public setCustomerInfo(projectId: Id, value: string): Promise<void> {
//     return this.customerInfoStore.setItem(projectId, value);
// }

// public async getCustomerInfo(projectId: Id): Promise<string> {
//     const project = await this.projectService.get(projectId);
//     let customerInfo = await this.customerInfoStore.getItem(project.id);
//     if (customerInfo) {
//         return customerInfo;
//     }

//     // Item could have asd1 key if migrated project
//     if (project.origin && project.origin.source === 'asd1') {
//         customerInfo = await this.customerInfoStore.getItem(project.origin.id);

//         // Update key with asd2 project id if found
//         if (customerInfo) {
//             const preparedFor = JSON.parse(customerInfo);
//             this.customerInfoStore.setItem(projectId, preparedFor);
//             this.customerInfoStore.removeItem(project.origin.id);
//             return preparedFor;
//         }
//     }

//     // We always default to an empty string for validation simplicity
//     // in the rest of the application.
//     return '';
// }

// public async clearCustomerInfo(): Promise<void> {
//     return this.customerInfoStore.clear();
// }
