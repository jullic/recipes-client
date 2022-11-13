import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/store';

import './index.css';
import './styles/global.css';
import { axios } from './axios';

const container = document.getElementById('root')!;
const root = createRoot(container);

// axios.post(`/auth/login`, { email: '12@ds.re', password: '1234566' }).catch(err => console.log(err));

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);


