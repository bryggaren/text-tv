import { KeyValueStore } from '../utils';
import { IFundInfoRecord } from '../models';

class FinancialService {
    private fundStore = new KeyValueStore<IFundInfoRecord[]>('fondkollen', 'fundInfo');
    public async getDailyStatus(): Promise<number> {
        const fundRecords = await this.fundStore.getItem(new Date().toLocaleDateString('sv-se'));
        let total: number = 0;
        fundRecords.map((item) => {
            const percentage = (100 + item.fund.dailyPercentage) / 100;
            const originalValue = item.fund.currentValue / percentage;
            const dailyRevenue = (item.fund.currentValue - originalValue) * item.fund.holdings;
            total = total + dailyRevenue;
        });
        return total;
    }
}
export const financialService = new FinancialService();
