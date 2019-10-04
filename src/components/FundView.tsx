import * as React from 'react'
import { IFundInfo } from '../models'
import { FundPicker } from './FundPicker'
import { FundTable } from './FundTable'

export interface IFundViewProps {
    funds: IFundInfo[];
}
export class FundView extends React.Component<IFundViewProps> {
    public render() {
        return (
            <div style={{ display: 'flex',overflow: 'hidden', maxHeight: '95vh'}}>
                <FundPicker allFunds={this.props.funds} onAddFund={(c, f) => { console.log(c, f) }} />
                <FundTable funds={this.props.funds} />
            </div>

        )
    }
}