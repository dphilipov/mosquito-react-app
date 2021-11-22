// React, Hooks
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// Services
import authServices from './services/authServices';

// Components
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import Profile from './components/Profile/Profile';
import Main from './components/Main/Main';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';
import Map from './components/Map/Map';
import Footer from './components/Footer/Footer';


// CSS
import './App.module.css';

const App = () => {
	return (
			<>
				<Header />

				<Switch>
					<Route path="/" exact>
						<Main />
					</Route>

					<Route path="/register" component={Register} />

					<Route path="/login" component={Login} />

					<Route path="/create" component={Create} />

					<Route path="/profile/:profileName" component={Profile} />

					<Route path="/article/:id" exact component={Details} />

					<Route path="/article/:id/edit" component={Edit} />

					<Route path="/map" component={Map} />

					<Route render={() => <h1>Error Page</h1>} />
				</Switch>

				<Footer />
			</>
	);

}

export default App;

