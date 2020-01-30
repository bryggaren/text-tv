export interface IUserFundStorageItem {
    company: string;
    name: string;
    shares: number;
}

export class UserFundStorageItem implements IUserFundStorageItem {
    public company: string;
    public name: string;
    public shares: number;
    constructor(company: string, name: string, shares: number) {
        this.company = company;
        this.name = name;
        this.shares = shares;
    }
}
