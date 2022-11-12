import axiosLib from 'axios';

export const axios = axiosLib.create({
	baseURL: 'http://localhost:3300',
});

axios.interceptors.request.use((config: any) => {
	config.headers.Authorization = window.localStorage.getItem('access_token');
	return config;
})