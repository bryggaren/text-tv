import React from 'react';
import { IFundRecord } from '../models';
import { List } from '@material-ui/core';

export interface IFundTableProps {
    // funds: IFundRecord[];
}

export class FundTable extends React.Component<IFundTableProps> {
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
