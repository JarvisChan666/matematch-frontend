// Set config defaults when creating the instance
//自定义实例默认值
import axios from 'axios';

const myAxios = axios.create({
	// baseURL: 'https://192.168.43.104:8080/api',
	// baseURL: 'https://localhost:8080/api',
	baseURL: 'http://localhost:8080/api',
	// baseURL: 'https://44.226.122.3/api/',
});

// cookie保存登录态
myAxios.defaults.withCredentials = true;

// 拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		console.log('请求发送了', config);
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	},
);

// 添加响应拦截器
myAxios.interceptors.response.use(
	function (response) {
		// 对响应数据做点什么
		console.log('请求收到了', response);
		return response;
	},
	function (error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	},
);

export default myAxios;
