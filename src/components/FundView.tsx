import * as React from 'react'
import { IFundInfo } from '../models'
import { FundPicker } from './FundPicker'

export interface IFundViewProps {
    funds: IFundInfo[];
}
export class FundView extends React.Component<IFundViewProps> {
    public render() {
        return <FundPicker allFunds={this.props.funds} onAddFund={(c, f) => { console.log(c, f) }} />
    }
}