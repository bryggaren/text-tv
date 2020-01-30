import React from 'react';
import { IUserFund } from '../models';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { groupBy } from 'lodash-es';
import { UserFundItem } from './FundHolding/FundHoldingItem';
import { userFundService } from '../services';

export interface IFundTableState {
    funds: _.Dictionary<IUserFund[]>;
}

export class FundTable extends React.Component<{}, IFundTableState> {
    constructor(props: any) {
        super(props);
        this.state = {
            funds: {},
        };
    }
    public async componentDidMount() {
        const data = await userFundService.getFunds();
        this.setState({ funds: this.getGroupedFunds(data) });
    }

    render() {
        const { funds } = this.state;
        return (
            <div style={{ display: 'flex', overflow: 'hidden' }}>
                <List
                    style={{
                        width: '100%',
                        maxWidth: 360,
                        backgroundColor: 'white',
                        overflowY: 'scroll',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {Object.keys(funds).map((company) => (
                        <div key={company}>
                            <ListItem style={{ color: 'green' }}>
                                <ListItemText primary={company} />
                            </ListItem>
                            {funds[company].map((fund) => (
                                <UserFundItem
                                    key={fund.name}
                                    company={company}
                                    name={fund.name}
                                    shares={fund.shares}
                                    onDelete={this.deleteFund}
                                    onSharesChange={this.changeHoldings}
                                />
                            ))}
                        </div>
                    ))}
                </List>
            </div>
        );
    }

    private deleteFund = (company: string, fund: string) => {
        userFundService.deleteFund(company, fund).then(() => {
            this.updateFunds();
        });
    };

    private changeHoldings = (company: string, fund: string, holdings: number) => {
        userFundService.changeHoldings(company, fund, holdings).then(() => {
            this.updateFunds();
        });
    };

    private async updateFunds() {
        const data = await userFundService.getFunds();
        this.setState({
            funds: this.getGroupedFunds(data),
        });
    }

    private getGroupedFunds(funds: IUserFund[]) {
        return groupBy(funds, 'company');
    }
}
