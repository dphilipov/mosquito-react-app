// React, Hooks
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// Context
import { UserProvider } from './components/userContext';

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
	const [user, setUser] = useState({
		email: 'Guest',
		uid: '',
		isLogged: false,
	})


	const userCheck = () => {
		if (Boolean(authServices.getUserData())) {
			const updatedUser = authServices.getUserData();
			setUser({
				email: updatedUser.email,
				uid: updatedUser.uid,
				isLogged: true
			});

		} else {
			setUser({
				email: 'Guest',
				uid: '',
				isLogged: false,
			});
		}
	}

	useEffect(() => {
		if (Boolean(authServices.getUserData())) {
			const updatedUser = authServices.getUserData();
			setUser({
				email: updatedUser.email,
				uid: updatedUser.uid,
				isLogged: true
			});

		} else {
			setUser({
				email: 'Guest',
				uid: '',
				isLogged: false,
			});
		}
	}, [])


	return (
		<UserProvider value={user}>
			<>
				<Header action={userCheck} />

				<Switch>
					<Route path="/" exact>
						<Main />
					</Route>

					<Route path="/register" component={Register} />

					<Route path="/login" render={(props) => <Login action={userCheck} />} />

					<Route path="/create" component={Create} />

					<Route path="/profile/:profileName" render={(props) => <Profile action={userCheck} />} />

					<Route path="/article/:id" exact component={Details} />

					<Route path="/article/:id/edit" component={Edit} />

					<Route path="/map" component={Map} />

					<Route render={() => <h1>Error Page</h1>} />
				</Switch>

				<Footer />
			</>
		</UserProvider>
	);

}

export default App;

