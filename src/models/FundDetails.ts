export interface IFundDetail {
    name: string;
    currentValue: number;
    dailyPercentage: number;
    yearlyPercentage: number;
    shares: number;
}

export class FundDetail implements IFundDetail {
    public name: string;
    public currentValue: number;
    public dailyPercentage: number;
    public yearlyPercentage: number;
    public shares: number;

    constructor(name: string, currentValue: number) {
        this.name = name;
        this.currentValue = currentValue;
        this.dailyPercentage = 0;
        this.yearlyPercentage = 0;
        this.shares = 0;
    }
}
