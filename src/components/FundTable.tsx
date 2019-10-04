import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IFundInfo } from '../models';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 14,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }),
)(TableRow);

function createData(company: string, fund: string, shares: number) {
    return { company, fund, shares };
}

const rows = [
    createData('Frozen yoghurt', '159', 6.0),
    createData('Ice cream sandwich', '237', 9.0)
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            borderLeft: '1px solid lightgrey'
        },
        table: {
            minWidth: 700,
        },
    }),
);

export interface IFundTableProps {
    funds: Partial<IFundInfo>[]
}

export const FundTable: React.FunctionComponent<IFundTableProps> = ({ }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Fondbolag</StyledTableCell>
                        <StyledTableCell>Fond</StyledTableCell>
                        <StyledTableCell align="right">Andelar</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <StyledTableRow key={row.company}>
                            <StyledTableCell component="th" scope="row">
                                {row.company}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.fund}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.shares}</StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
