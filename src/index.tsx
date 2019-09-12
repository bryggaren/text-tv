import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import MenuAppBar from './components/MenuAppBar';
import { Main } from './Main';
import './index.css';

ReactDOM.render(<div>
    <MemoryRouter>
<MenuAppBar />
 <Main />    
 </MemoryRouter>
</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
