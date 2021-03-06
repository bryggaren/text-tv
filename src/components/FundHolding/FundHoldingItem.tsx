import * as React from 'react';
import { ListItem, ListItemText, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
export interface IFundHoldingProps {
    company: string;
    fundName: string;
    shares: number;
    onDelete(company: string, fundName: string): void;
    onHoldingsChange(company: string, fund: string, shares: number): void;
}

interface IFundSharesState {
    internalShares: number;
}

export class FundHoldingItem extends React.Component<IFundHoldingProps, IFundSharesState> {
    constructor(props: IFundHoldingProps) {
        super(props);
        this.state = {
            internalShares: this.props.shares,
        };
    }

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
                    value={this.state.internalShares}
                    onChange={(event) => {
                        const { value } = event.target;
                        this.setState({ internalShares: Number(value) });
                    }}
                    onBlur={this.onHoldingsBlur}
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

    private onHoldingsBlur = () => {
        this.props.onHoldingsChange(
            this.props.company,
            this.props.fundName,
            this.state.internalShares,
        );
    };
}
