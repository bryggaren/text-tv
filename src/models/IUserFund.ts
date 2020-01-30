export interface IUserFund {
    company: string;
    name: string;
    shares: number;
}

export class UserFund implements IUserFund {
    public company: string;
    public name: string;
    public shares: number;
    constructor(company: string, name: string, shares: number = 0) {
        this.company = company;
        this.name = name;
        this.shares = shares;
    }
}
