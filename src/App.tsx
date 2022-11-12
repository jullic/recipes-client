import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './layouts/PageLayout/PageLayout';
import { Create } from './pages/Create/Create';
import { FavoritesPage } from './pages/Favorites/Favorites';
import { HomePage } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { MyPage } from './pages/My/My';
import { NotFoundPage } from './pages/NotFound/NotFound';
import { ProfilePage } from './pages/Profile/Profile';
import { RecipePage } from './pages/Recipe/Recipe';
import { Register } from './pages/Register/Register';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<PageLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/recipes/:id' element={<RecipePage />} />
					<Route path='/favorites' element={<FavoritesPage />} />
					<Route path='/my' element={<MyPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/create' element={<Create />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
