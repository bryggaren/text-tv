import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { List } from '@material-ui/core';
import { IFundInfo } from '../../models';
import { FundItem } from './FundItem';

export interface IFundInfoItemProps {
    fundInfo: IFundInfo;
    onAddFund(compmany: string, fundName: string): void;
}

export const FundInfoItem: React.FunctionComponent<IFundInfoItemProps> = ({
    fundInfo,
    onAddFund,
}) => {
    const [hoveredFund, setHoveredFund] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const updateHoveredFund = (name: string) => {
        setHoveredFund(name);
    };

    const resetHoveredFund = () => {
        setHoveredFund('');
    };

    const onAdd = (fundName: string) => {
        onAddFund(fundInfo.company, fundName);
    };
    return (
        <div key={fundInfo.company}>
            <ListItem style={{ color: 'green' }} button onClick={handleClick}>
                <ListItemIcon>
                    <BusinessCenterIcon />
                </ListItemIcon>
                <ListItemText primary={fundInfo.company} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {fundInfo.funds.map((fund) => {
                return (
                    <Collapse key={fund.name} in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <FundItem fund={fund} onAdd={onAdd} />
                        </List>
                    </Collapse>
                );
            })}
        </div>
    );
};
