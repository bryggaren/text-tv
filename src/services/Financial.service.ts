import { KeyValueStore } from '../utils';
import { IFundInfoRecord, IFundInfo, FundInfoRecord } from '../models';
import { fundRecordService } from '.';

class FinancialService {
    private fundStore = new KeyValueStore<IFundInfoRecord[]>('fondkollen', 'fundInfo');
    public async getDailyStatus(funds: IFundInfo[]): Promise<number> {
        const userFunds = await fundRecordService.getFunds();
        let fundInfoRecords: IFundInfoRecord[] = [];
        userFunds.map((record) => {
            const companyItem = funds.find((item) => item.company === record.company);
            if (companyItem) {
                record.holdingInfo.map((holding) => {
                    const fundDetail = companyItem.funds.find(
                        (fund) => fund.name === holding.fundName,
                    );
                    if (fundDetail) {
                        fundInfoRecords.push(
                            new FundInfoRecord(companyItem.company, {
                                ...fundDetail,
                                holdings: holding.holdings,
                            }),
                        );
                    }
                });
            }
        });

        console.log('Records', fundInfoRecords);

        let total: number = 0;
        fundInfoRecords.map((item) => {
            const percentage = (100 + item.fund.dailyPercentage) / 100;
            const originalValue = item.fund.currentValue / percentage;
            const dailyRevenue = (item.fund.currentValue - originalValue) * item.fund.holdings;
            total = total + dailyRevenue;
        });
        return total;
    }
}
export const financialService = new FinancialService();
