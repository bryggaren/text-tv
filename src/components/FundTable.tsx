import React from 'react';
import { IUserFund } from '../models';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { groupBy } from 'lodash-es';
import { FundHoldingItem } from './FundHolding/FundHoldingItem';
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
        const { funds } = this.state; // Essentially does: const funds = this.state.funds;
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
                                <FundHoldingItem
                                    key={fund.name}
                                    company={company}
                                    fundName={fund.name}
                                    holdings={fund.shares}
                                    onDelete={this.deleteFund}
                                    onHoldingsChange={this.changeHoldings}
                                />
                            ))}
                        </div>
                    ))}
                </List>
            </div>
        );
    }

    // public render() {
    //     return (
    //         <div style={{ display: 'flex', overflow: 'hidden' }}>
    //             <List
    //                 style={{
    //                     width: '100%',
    //                     maxWidth: 360,
    //                     backgroundColor: 'white',
    //                     overflowY: 'scroll',
    //                 }}
    //                 component="nav"
    //                 aria-labelledby="nested-list-subheader"
    //             >
    //                 {Object.keys(this.state.funds).map((key, index) => {
    //                     <div key={index}>
    //                         <ListItem style={{ color: 'green' }}>
    //                             <ListItemText primary={key} />
    //                         </ListItem>
    //                     </div>;
    //                 })}
    //             </List>
    //         </div>
    //     );
    // }

    private getGroupedFunds(funds: IUserFund[]) {
        return groupBy(funds, 'company');
    }

    // private renderFunds() {
    //     for (let company in this.state.funds) {
    //         let funds = this.state.funds[company];
    //         {
    //             // <div key={company}>
    //             <ListItem style={{ color: 'green' }}>
    //                 <ListItemText primary={company} />
    //             </ListItem>;
    //             {
    //                 funds.map((fund) => {
    //                     return (
    //                         <FundHoldingItem
    //                             key={fund.name}
    //                             company={company}
    //                             fundName={fund.name}
    //                             holdings={fund.shares}
    //                             onDelete={this.deleteFund}
    //                             onHoldingsChange={this.changeHoldings}
    //                         />
    //                     );
    //                 });
    //             }
    //             // </div>;
    //         }
    //     }
    // }

    // private renderHolding(fund: IUserFund) {
    // <div key={fund.company}>
    //     <ListItem style={{ color: 'green' }}>
    //         <ListItemText primary={fund.company} />
    //     </ListItem>
    //     {fund.holdingInfo.map((item) => {
    //         return (
    //             <FundHoldingItem
    //                 key={item.fundName}
    //                 company={fund.company}
    //                 fundName={item.fundName}
    //                 holdings={item.holdings || 0}
    //                 onDelete={this.deleteFund}
    //                 onHoldingsChange={this.changeHoldings}
    //             />
    //         );
    //     })}
    // </div>
    // }

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
}
