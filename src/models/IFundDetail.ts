export interface IFundDetail {
    name: string;
    price: number;
    dailyPercentage: number;
    yearlyPercentage: number;
}

export class FundDetail implements IFundDetail {
    public name: string;
    public price: number;
    public dailyPercentage: number;
    public yearlyPercentage: number;

    constructor(name: string, currentValue: number) {
        this.name = name;
        this.price = currentValue;
        this.dailyPercentage = 0;
        this.yearlyPercentage = 0;
    }
}
