import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/store';

import './index.css';
import './styles/global.css';
localStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmUyMDdiMTliY2JmN2FiNzFmNzgxMSIsImlhdCI6MTY2ODE2MTY1OX0.tHNZJEbW3VqYewrprVjCPHk4l_IwsMOmGAue9R7Ov_U');

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);


