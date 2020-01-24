import * as React from 'react'
import { IFundInfo } from '../models'
import { FundPicker } from './FundPicker'
import { FundTable } from './FundTable'
import { fundInfoService } from '../services'

export interface IFundViewProps {
    funds: IFundInfo[];
}
export class FundView extends React.Component<IFundViewProps> {
    public render() {
        return (
            <div style={{ display: 'flex',overflow: 'hidden'}}>
                <FundPicker allFunds={this.props.funds} onAddFund={this.addFund} />
                {/* <FundTable funds={this.props.funds} /> */}
            </div>

        )
    }

    private async addFund(company: string, fundName: string ) {
        await fundInfoService.AddFund(company,fundName)
    }
}