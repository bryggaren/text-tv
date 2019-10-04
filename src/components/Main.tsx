import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { Revenue, FundView } from '.';

export class Main extends React.Component {
    public render() {
        return (
            <Switch>
                <Route exact path='/' component={Revenue} />
                <Route path='/funds' component={FundView} />
            </Switch>
        )
    }
}