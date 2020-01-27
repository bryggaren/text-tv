export interface IFundRecord {
    company: string;
    holdingInfo: IFundHoldings[];
}

export interface IFundHoldings {
    fundName: string;
    holdings: number;
}
