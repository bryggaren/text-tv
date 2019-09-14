import { IFundDetail } from ".";

export interface IFundInfo {
    company: string | null
    funds: IFundDetail[];
}

export class FundInfo implements IFundInfo {
    public company: string
    public funds: IFundDetail[];
    constructor(company: string) {
        this.company= company
        this.funds= []
    }
}