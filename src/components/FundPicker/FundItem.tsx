import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalAtm from '@material-ui/icons/LocalAtm';
import { Button } from '@material-ui/core';
import { IFundInfo, IFundDetail } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fund: {
            paddingLeft: theme.spacing(4),
            color: 'green',
            '&:hover': {
                color: 'darkgreen',
            }
        }
    }),
);

export interface IFundItemProps {
    fund: IFundDetail;
    hasHover: boolean
    onAdd(fundName: string): void;
}

export const FundItem: React.FunctionComponent<IFundItemProps> = ({ fund, hasHover, onAdd }) => {
    const classes = useStyles();

    return (

        <ListItem button className={classes.fund}>
            <ListItemIcon>
                <LocalAtm />
            </ListItemIcon>
            <ListItemText primary={fund.name} />

            <Button style={{ display: hasHover ? 'flex' : 'none' }} onClick={() => onAdd(fund.name)}>Välj</Button>

        </ListItem>


    );
}
