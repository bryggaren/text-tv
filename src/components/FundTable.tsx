import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IFundInfo } from '../models';
import { IconButton, List } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { FundPicker } from './FundPicker';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            overflowY: 'scroll',
        },
    }),
);

export interface IFundTableProps {
    funds: IFundInfo[];
}

export class FundTable extends React.Component<IFundTableProps> {
    const classes = useStyles();
    public render() {
        return (
            <div style={{ display: 'flex', overflow: 'hidden' }}>
                <List style={{width: '100%',maxWidth: 360, backgroundColor: 'white', overflowY: 'scroll'}}
            component="nav"
            aria-labelledby="nested-list-subheader"

            className={classes.root}
        >
            {allFunds.map((fundInfo: IFundInfo, index) => {
                return <FundInfoItem key={index} fundInfo={fundInfo} onAddFund={onAddFund} />;
            })}
        </List>
            </div>
        );
    }

    private async addFund(company: string, fundName: string) {
        // await fundInfoService.AddFund({company: company, name: fundName, shares: 0})
    }
}
