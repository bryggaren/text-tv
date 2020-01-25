import { IFundDetail, IFundRecord } from '../models';
import { KeyValueStore, IItems } from '../utils';

class FundInfoService {
    private fundStore = new KeyValueStore<IFundRecord>('fondkollen', 'fundInfo');
    public async AddFund(fundRecord: IFundRecord): Promise<void> {
        const funds = await this.getFunds();

        return this.fundStore.setItem(fundRecord.company, fundRecord);
    }

    public isExisting(fund: IFundDetail): boolean {
        return true;
    }

    private async getFunds() {
        const keys = await this.fundStore.getItems();

        const funds: IFundRecord[] = [];
        for (const key in keys) {
            funds.push(await this.fundStore.getItem(key));
        }

        return funds;
    }
}

export const fundInfoService = new FundInfoService();

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
