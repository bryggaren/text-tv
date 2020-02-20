import { IFundDetail } from './FundDetails';

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

export interface IFundInfoRecord {
    company: string;
    fund: IFundDetail;
}

export class FundInfoRecord implements IFundInfoRecord {
    public company: string;
    public fund: IFundDetail;
    constructor(company: string, fund: IFundDetail) {
        this.company = company;
        this.fund = fund;
    }
}
