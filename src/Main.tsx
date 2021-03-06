import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Revenue, FundView } from './components';
import { IFundInfo } from './models';
import { FundTable } from './components/FundTable';

export interface IMainProps {
    funds: IFundInfo[];
}
export class Main extends React.Component<IMainProps> {
    public render() {
        return (
            <Switch>
                <Route exact path="/" render={(props) => <Revenue funds={this.props.funds} />} />
                <Route path="/funds" render={(props) => <FundView funds={this.props.funds} />} />
                <Route path="/holdings" component={FundTable} />} />
            </Switch>
        );
    }
}
