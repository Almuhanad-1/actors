import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Actors from './components/actors/Actors';
import AddActor from './components/actor/AddActor';
import EditActor from './components/actor/EditActor';
import SignIn from './components/signin/Signin';
import { useState } from 'react';
import Navbar from './components/nav/Navbar';
function App() {
	const [token, setToken] = useState(window.localStorage.getItem('token'))
	const updateToken = (token) => {
		setToken(token)
	}
	return (
		<>
			<Navbar />
			<div className='container py-4'>
				<div className='row'>
					<div className='col'>
						<Routes>
							<Route path='/' exact element={<Actors />} />
							{
								token && <Route path='/add' element={<AddActor />} />
							}
							<Route path='/edit/:id' element={<EditActor />} />
							<Route path='/signin' element={<SignIn updateToken={updateToken} />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
