import React from 'react';
import { IFundRecord } from '../models';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    IconButton,
} from '@material-ui/core';
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
                {fund.holdingInfo.map((holding) => {
                    return (
                        <ListItem button style={{ marginLeft: 4 }} key={holding.fundName}>
                            <ListItemText primary={holding.fundName} />
                            <TextField
                                style={{ maxWidth: 80 }}
                                label="Andelar"
                                variant="outlined"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {/* <ListItemSecondaryAction> */}
                            <IconButton edge="end" aria-label="delete fund">
                                <DeleteIcon />
                            </IconButton>
                            {/* </ListItemSecondaryAction> */}
                        </ListItem>
                    );
                })}
            </div>
        );
    }

    private async addFund(company: string, fundName: string) {
        // await fundInfoService.AddFund({company: company, name: fundName, shares: 0})
    }
}
