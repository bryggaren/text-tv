import { IFundDetail, IUserFund, FundInfo, UserFund } from '../models';
import { KeyValueStore, IItems } from '../utils';

const Company_Fund_Separator = '#/#/#';
class UserFundService {
    private fundStore = new KeyValueStore<IUserFund>('fondkollen', 'fundRecords');
    public async addFund(company: string, name: string, shares: number = 0): Promise<void> {
        const newFundKey = company.concat(Company_Fund_Separator, name);
        const existingFund = (await this.fundStore.getItem(newFundKey)) !== undefined;

        if (existingFund) {
            alert('Den här fonden finns redan bland dina fonder!');
        } else {
            this.fundStore.setItem(newFundKey, new UserFund(company, name));
        }
    }

    public async deleteFund(company: string, name: string) {
        const key = company.concat(Company_Fund_Separator, name);
        await this.fundStore.removeItem(key);
    }

    public async changeHoldings(company: string, name: string, shares: number) {
        const key = company.concat(Company_Fund_Separator, name);
        await this.fundStore.removeItem(key);
        await this.addFund(company, name, shares);
    }
    public async getFunds(): Promise<IUserFund[]> {
        const keys = await this.fundStore.getItems();
        const funds: IUserFund[] = [];
        for (const key in keys) {
            funds.push(await this.fundStore.getItem(key));
        }
        return funds;
    }
}

export const userFundService = new UserFundService();

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
