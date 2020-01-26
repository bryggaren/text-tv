import { IFundDetail } from '.';
import { IFundRecord } from './IFundRecord';

export interface IFundInfo {
    company: string;
    funds: IFundDetail[];
}

export class FundInfo implements IFundInfo {
    public company: string;
    public funds: IFundDetail[];
    constructor(company: string) {
        this.company = company;
        this.funds = [];
    }
}
