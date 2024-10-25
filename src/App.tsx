import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './component/Header/Header';
import './index.css';

import { UsersPage } from './pages/UsersPage/UsersPage';
import { UserPage } from './component/UserPage/UserPage';

const App = () => {
	return (
		<div className='bg-black flex flex-col justify-between min-h-full'>
			<Header />
			<div className='container my-0 mx-auto mb-2 px-4'>
				<Routes>
					<Route path='/' element={<UsersPage />} />
					<Route path='/user/:userId' element={<UserPage />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
