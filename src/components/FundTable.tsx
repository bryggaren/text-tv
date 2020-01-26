import React from 'react';
import { IFundRecord } from '../models';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { fundInfoService } from '../services';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

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
        const data = await fundInfoService.getFunds();
        this.setState({ funds: data });
        // console.log('Data', data);

        // fundInfoService.getFunds().then((data) => {
        //     this.setState({ funds: data });
        //     console.log('Data', data);
        // });
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
                        return (
                            <ListItem>
                                <ListItemIcon>
                                    <BusinessCenterIcon />
                                </ListItemIcon>
                                <ListItemText primary={fund.company} />
                            </ListItem>
                        );
                    })}
                    {/* {allFunds.map((fundInfo: IFundInfo, index) => {
                        return (
                            <FundInfoItem key={index} fundInfo={fundInfo} onAddFund={onAddFund} />
                        );
                    })} */}
                </List>
            </div>
        );
    }

    private async addFund(company: string, fundName: string) {
        // await fundInfoService.AddFund({company: company, name: fundName, shares: 0})
    }
}
