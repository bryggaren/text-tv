import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { Revenue, Funds } from './components';

export class Main extends React.Component {
    public render() {
        return (
            <Switch>
                <Route exact path='/' component={Revenue}/>
                <Route path='/funds' component={Funds}/>
            </Switch>
        //     <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.tsx</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        )
    }
}