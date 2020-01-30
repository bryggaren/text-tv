import { KeyValueStore } from '../utils';
import { IUserFundStorageItem, UserFundStorageItem } from '../models';

const Company_Fund_Separator = '#/#/#';
class UserFundService {
    private fundStore = new KeyValueStore<IUserFundStorageItem>('fondkollen', 'userFunds');
    public async addFund(company: string, name: string, shares: number = 0): Promise<void> {
        const newFundKey = company.concat(Company_Fund_Separator, name);
        const existingFund = (await this.fundStore.getItem(newFundKey)) !== undefined;

        if (existingFund) {
            alert('Den här fonden finns redan bland dina fonder!');
        } else {
            this.fundStore.setItem(newFundKey, new UserFundStorageItem(company, name, shares));
        }
    }

    public async deleteFund(company: string, name: string) {
        const key = company.concat(Company_Fund_Separator, name);
        await this.fundStore.removeItem(key);
    }

    public async updateShares(company: string, name: string, shares: number) {
        const key = company.concat(Company_Fund_Separator, name);
        await this.fundStore.removeItem(key);
        await this.addFund(company, name, shares);
    }
    public async getFunds(): Promise<IUserFundStorageItem[]> {
        const keys = await this.fundStore.getItems();
        const funds: IUserFundStorageItem[] = [];
        for (const key in keys) {
            funds.push(await this.fundStore.getItem(key));
        }
        return funds;
    }
}

export const userFundService = new UserFundService();
