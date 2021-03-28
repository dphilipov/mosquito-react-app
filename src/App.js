import './App.module.css';

import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserProvider } from './components/userContext';
import React from 'react';
import authServices from './services/authServices';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import Profile from './components/Profile/Profile';
import Main from './components/Main/Main';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';
import Footer from './components/Footer/Footer';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: 'Guest',
			uid: '',
			isLogged: false,
		}

		this.userCheck = this.userCheck.bind(this);
	}

	userCheck = () => {
		if (Boolean(authServices.getUserData())) {
			let updatedUser = authServices.getUserData();
			this.setState({
				email: updatedUser.email,
				uid: updatedUser.uid,
				isLogged: true
			});

		} else {
			this.setState({
				email: 'Guest',
				uid: '',
				isLogged: false,
			});
		}
	}

	componentDidMount() {
		if (Boolean(authServices.getUserData())) {
			let updatedUser = authServices.getUserData();
			this.setState({
				email: updatedUser.email,
				uid: updatedUser.uid,
				isLogged: true
			});

		} else {
			this.setState({
				email: 'Guest',
				uid: '',
				isLogged: false,
			});
		}
	}

	render() {
		return (
			<UserProvider value={this.state}>
				<React.Fragment>
					<Header action={this.userCheck} />

					<Switch>
						<Route path="/" exact>
							<Main />
						</Route>

						<Route path="/register" component={Register} />

						<Route path="/login" render={(props) => <Login action={props, this.userCheck} />} />

						<Route path="/create" component={Create} />

						<Route path="/profile/:profileName" render={(props) => <Profile action={props, this.userCheck} />} />

						<Route path="/article/:id" exact component={Details} />

						<Route path="/article/:id/edit" component={Edit} />

						<Route render={() => <h1>Error Page</h1>} />
					</Switch>


					<Footer />
				</React.Fragment>
			</UserProvider>
		);
	}

}

export default App;

