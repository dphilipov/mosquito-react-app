import './App.module.css';

import { Component } from 'react';
import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';
import postServices from './services/postServices'
import React from 'react';
import Header from './components/Header/Header';
import Create from './components/Create/Create';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			articles: []
		}
	}

	componentDidMount() {
		postServices.getAll()
			.then(collection => {
				this.setState({ articles: collection });
			})
			.catch(err => console.log(err))

	}

	render() {
		return (
			<React.Fragment>
				<Header />

				<Switch>
					<Route path="/create" component={Create} />

					<Route path="/">
						<Main articles={this.state.articles} />
					</Route>
				</Switch>


				<Footer />
			</React.Fragment>
		);
	}

}

export default App;

