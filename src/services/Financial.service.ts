import { userFundService } from '.';
import { IFundInfo } from '../models';
import { fundInfoService } from './FundInfo.service';

class FinancialService {
    public async getDailyRevenue(funds: IFundInfo[]): Promise<number> {
        const fundItems = await fundInfoService.getFundStorageItems(funds);
        const userFunds = await userFundService.getFunds();

        let total: number = 0;
        fundItems.forEach((fund) => {
            const userFund = userFunds.find((item) => {
                return item.company === fund.company && item.name === fund.name;
            });

            const percentage = (100 + fund.dailyPercentage) / 100;
            const originalValue = fund.price / percentage;
            const dailyRevenue = (fund.price - originalValue) * (userFund ? userFund.shares : 0);
            total = total + dailyRevenue;
        });
        return total;
    }
}
export const financialService = new FinancialService();
