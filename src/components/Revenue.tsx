import * as React from 'react';
import { financialService } from '../services';

interface IRevenueState {
    dailyTotal: number;
}
export class Revenue extends React.Component<{}, IRevenueState> {
    constructor(props: any) {
        super(props);
        this.state = { dailyTotal: 0 };
    }

    public async componentDidMount() {
        const daily = await financialService.getDailyStatus();
        this.setState({ dailyTotal: daily });
    }

    public render() {
        return <div style={{ color: 'yellow' }}>{this.state.dailyTotal}</div>;
    }
}
