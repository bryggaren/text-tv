import { IFundDetail, IFundRecord } from '../models';
import { KeyValueStore, IItems } from '../utils';

const Company_Fund_Separator = '#/#/#';
class FundInfoService {
    private fundStore = new KeyValueStore<number>('fondkollen', 'fundInfo');
    public async AddFund(fundRecord: IFundRecord): Promise<void> {
        const newFundKey = fundRecord.company.concat(
            Company_Fund_Separator,
            fundRecord.holdingInfo.fundName,
        );
        const existingFund = (await this.fundStore.getItem(newFundKey)) !== undefined;

        if (existingFund) {
            alert('Den här fonden finns redan bland dina fonder!');
        } else {
            this.fundStore.setItem(newFundKey, fundRecord.holdingInfo.shares || 0);
        }
    }

    public async getFunds(): Promise<IFundRecord[]> {
        const keys = await this.fundStore.getItems();
        const funds: IFundRecord[] = [];
        for (const key in keys) {
            const fund = this.SplitCompanyFund(key);
            fund.holdingInfo.shares = await this.fundStore.getItem(key);
            funds.push(fund);
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
        return funds;
    }

    private SplitCompanyFund(key: string): IFundRecord {
        const info = key.split(Company_Fund_Separator);
        return { company: info[0], holdingInfo: { fundName: info[1] } };
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
