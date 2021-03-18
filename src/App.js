import './App.module.css';

import { Component } from 'react';
import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';
import React from 'react';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

class App extends Component {
	constructor(props) {
		super(props)

	}

	
	render() {
		return (
			<React.Fragment>
				<Header />

				<Switch>
					<Route path="/" exact>
						<Main />
					</Route>

					<Route path="/register" component={Register} />

					<Route path="/login" component={Login} />

					<Route path="/create" component={Create} />

					<Route render={() => <h1>Error Page</h1>} />
				</Switch>


				<Footer />
			</React.Fragment>
		);
	}

}

export default App;

