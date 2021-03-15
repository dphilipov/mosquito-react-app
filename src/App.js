import style from './App.module.css';

import { Component } from 'react';
import postServices from './services/postServices'
import React from 'react';
import Header from './components/Header/Header';
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
				<Main articles={this.state.articles} />
				<Footer />
			</React.Fragment>
		);
	}

}

export default App;
