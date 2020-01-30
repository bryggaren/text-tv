import * as React from 'react';
import { ListItem, ListItemText, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
export interface IUserFundItemProps {
    company: string;
    name: string;
    shares: number;
    onDelete(company: string, name: string): void;
    onSharesChange(company: string, name: string, shares: number): void;
}

interface IUserFundItemState {
    shares: number;
}

export class UserFundItem extends React.Component<IUserFundItemProps, IUserFundItemState> {
    constructor(props: IUserFundItemProps) {
        super(props);
        this.state = {
            shares: this.props.shares,
        };
    }

    public render() {
        return (
            <ListItem button style={{ marginLeft: 4 }}>
                <ListItemText primary={this.props.name} />
                <TextField
                    style={{ maxWidth: 80 }}
                    label="Andelar"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.shares}
                    onChange={(event) => {
                        const { value } = event.target;
                        this.setState({ shares: Number(value) });
                    }}
                    onBlur={this.onBlur}
                />
                <IconButton edge="end" aria-label="delete fund" onClick={this.onDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        );
    }

    private onDelete = () => {
        this.props.onDelete(this.props.company, this.props.name);
    };

    private onBlur = () => {
        this.props.onSharesChange(this.props.company, this.props.name, this.state.shares);
    };
}
