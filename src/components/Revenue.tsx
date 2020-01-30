import * as React from 'react';
import { financialService } from '../services';
import { IFundInfo } from '../models';

export interface IRevenueProps {
    funds: IFundInfo[];
}
interface IRevenueState {
    dailyTotal: number;
}
export class Revenue extends React.Component<IRevenueProps, IRevenueState> {
    constructor(props: IRevenueProps) {
        super(props);
        this.state = { dailyTotal: 0 };
    }

    public async componentDidMount() {
        const daily = await financialService.getDailyRevenue(this.props.funds);
        this.setState({ dailyTotal: daily });
    }

    public render() {
        return <div style={{ color: 'yellow' }}>{this.state.dailyTotal}</div>;
    }
}
