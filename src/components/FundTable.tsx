import React from 'react';
import { IFundRecord } from '../models';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { fundRecordService } from '../services';
import { FundHoldingItem } from './FundHolding/FundHoldingItem';

export interface IFundTableState {
    funds: IFundRecord[];
}

export class FundTable extends React.Component<{}, IFundTableState> {
    constructor(props: any) {
        super(props);
        this.state = {
            funds: [],
        };
    }
    public async componentDidMount() {
        const data = await fundRecordService.getFunds();
        this.setState({ funds: data });
    }

    public render() {
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
                    {this.state.funds.map((fund) => {
                        return this.renderHolding(fund);
                    })}
                </List>
            </div>
        );
    }

    private renderHolding(fund: IFundRecord) {
        return (
            <div key={fund.company}>
                <ListItem style={{ color: 'green' }}>
                    <ListItemText primary={fund.company} />
                </ListItem>
                {fund.holdingInfo.map((item) => {
                    return (
                        <FundHoldingItem
                            key={item.fundName}
                            company={fund.company}
                            fundName={item.fundName}
                            holdings={item.holdings || 0}
                            onDelete={this.deleteFund}
                            onHoldingsChange={this.changeHoldings}
                        />
                    );
                })}
            </div>
        );
    }

    private deleteFund = (company: string, fund: string) => {
        fundRecordService.deleteFund(company, fund).then(() => {
            this.updateFunds();
        });
    };

    private changeHoldings = (company: string, fund: string, holdings: number) => {
        fundRecordService.changeHoldings(company, fund, holdings).then(() => {
            this.updateFunds();
        });
    };

    private async updateFunds() {
        const data = await fundRecordService.getFunds();
        this.setState({
            funds: data,
        });
    }
}
