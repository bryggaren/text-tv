import { IFundDetail } from '../models';
import { KeyValueStore } from '../utils';

class FundInfoService {

    private fundStore = new KeyValueStore<string | undefined>(
        'fondkollen',
        'fundInfo',
    );
    public AddFund(company: string, fund: string): Promise<void>  {
        return Promise.resolve(localStorage.setItem(company,fund))
        // return this.fundStore.setItem(company,fund)
    }

    public isExisting(fund: IFundDetail): boolean {
        return true;
    }

    private getFunds(): IFundDetail[] {
        return [];
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