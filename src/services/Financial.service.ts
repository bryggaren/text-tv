import { KeyValueStore } from '../utils';
import { userFundService } from '.';
import { IFundInfoRecord, IFundInfo, FundInfoRecord, FundInfo } from '../models/FundInfo';

class FinancialService {
    private fundStore = new KeyValueStore<IFundInfoRecord[]>('fondkollen', 'fundInfo');
    public async getDailyStatus(funds: IFundInfo[]): Promise<number> {
        const userFunds = await userFundService.getFunds();
        let fundInfoRecords: IFundInfoRecord[] = [];
        funds.map((fundInfo) => {
            userFunds.map((userFund) => {
                const fundDetail = fundInfo.funds.find((fund) => {
                    return fundInfo.company === userFund.company && fund.name === userFund.name;
                });
                if (fundDetail) {
                    fundInfoRecords.push(
                        new FundInfoRecord(fundInfo.company, {
                            ...fundDetail,
                            shares: userFund.shares,
                        }),
                    );
                }
            });
        });

        console.log('userFunds', userFunds);
        console.log('fundInfoRecords', fundInfoRecords);

        let total: number = 0;
        fundInfoRecords.map((item) => {
            const percentage = (100 + item.fund.dailyPercentage) / 100;
            const originalValue = item.fund.currentValue / percentage;
            const dailyRevenue = (item.fund.currentValue - originalValue) * item.fund.shares;
            total = total + dailyRevenue;
        });
        return total;
    }
}
export const financialService = new FinancialService();
