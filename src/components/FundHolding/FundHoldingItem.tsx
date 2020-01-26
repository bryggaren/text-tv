import { IFundRecord } from '../../models';
import * as React from 'react';
import { ListItem, ListItemText, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
export interface IFundHoldingProps {
    company: string;
    fundName: string;
    holdings: number;
    onDelete(company: string, fundName: string): void;
    onHoldingsChange(): void;
}

export class FundHoldingItem extends React.Component<IFundHoldingProps> {
    public render() {
        return (
            <ListItem button style={{ marginLeft: 4 }}>
                <ListItemText primary={this.props.fundName} />
                <TextField
                    style={{ maxWidth: 80 }}
                    label="Andelar"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.holdings}
                />
                <IconButton edge="end" aria-label="delete fund" onClick={this.onDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        );
    }

    private onDelete = () => {
        this.props.onDelete(this.props.company, this.props.fundName);
    };
}
