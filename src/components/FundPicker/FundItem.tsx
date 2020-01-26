import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalAtm from '@material-ui/icons/LocalAtm';
import { IFundDetail } from '../../models/FundDetails';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fund: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export interface IFundItemProps {
    fund: IFundDetail;
    onAdd(fundName: string): void;
}

export const FundItem: React.FunctionComponent<IFundItemProps> = ({ fund, onAdd }) => {
    const classes = useStyles();

    return (
        <ListItem button className={classes.fund} onClick={() => onAdd(fund.name)}>
            <ListItemIcon>
                <LocalAtm />
            </ListItemIcon>
            <ListItemText primary={fund.name} />
        </ListItem>
    );
};
