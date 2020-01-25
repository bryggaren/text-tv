import * as React from 'react';
import { IFundInfo } from '../models';
import { FundPicker } from './FundPicker';
import { fundInfoService } from '../services';

export interface IFundViewProps {
    funds: IFundInfo[];
}
export class FundView extends React.Component<IFundViewProps> {
    public render() {
        return (
            <div style={{ display: 'flex', overflow: 'hidden' }}>
                <FundPicker allFunds={this.props.funds} onAddFund={this.addFund} />
            </div>
        );
    }

    private async addFund(company: string, fundName: string) {
        await fundInfoService.AddFund({ company: company, name: fundName, shares: 0 });
    }
}
