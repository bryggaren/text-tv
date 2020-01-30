import { IFundDetail } from './IFundDetail';

export interface IFundInfoStorageItem extends IFundDetail {
    company: string;
}

export class FundInfoStorageItem implements IFundInfoStorageItem {
    public company: string;
    public name: string;
    public price: number;
    public dailyPercentage: number;
    public yearlyPercentage: number;
    constructor(
        company: string,
        name: string,
        price: number,
        dailyPercentage: number,
        yearlyPercentage: number,
    ) {
        this.company = company;
        this.name = name;
        this.price = price;
        this.dailyPercentage = dailyPercentage;
        this.yearlyPercentage = yearlyPercentage;
    }
}
