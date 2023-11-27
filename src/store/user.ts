// 共享组件用户状态
import { defineStore } from 'pinia';
import axios from '../plugins/myAxios';
import { showSuccessToast, showFailToast } from 'vant';
import { userType } from '../models/user';

const LOGIN_URL = '/user/login';
const REGISTER_URL = 'user/register';
const CURRENT_USER_URL = '/user/current';
const UPDATE_USER_URL = '/user/update';

// 类型优化
// interface User {
// 	userAccount: string;
// 	// Add other user properties here
// 	// ...
// }

const useUserStore = defineStore('user', {
	state: () => ({
		userInfo: {} as { [key: string]: any },
		// 临时变量 注册完后直接填充登陆表单
		lastRegisteredUserAccount: '',
		lastRegisteredUserPassword: '',
	}),

	getters: {},

	actions: {
		async login(userData: userType) {
			const res = await axios.post(LOGIN_URL, userData);
			const { data, code, description } = res.data;
			if (code === 0) {
				this.userInfo = data;
				showSuccessToast('登录成功');
				return true;
			} else {
				showFailToast('登录成功, ' + description);
				return false;
			}
		},

		async register(userData: userType) {
			const res = await axios.post(REGISTER_URL, userData);
			const { data, code, description } = res.data;
			if (code === 0) {
				this.userInfo = data;
				showSuccessToast('注册成功');
				// localStorage.setItem('user', JSON.stringify(data));
				return true;
			} else {
				showFailToast('注册失败, ' + description);
				return false;
			}
		},

		// TODO:退出功能
		logout() {
			this.userAccount = '';
			// Remove user data from localStorage
			localStorage.removeItem('user');
		},

		async getCurrentUser() {
			try {
				const res = await axios.get(CURRENT_USER_URL);
				const { data, code } = res.data;
				console.log('get current user' + data);
				if (code === 0) {
					return data;
				}
			} catch (error) {
				showFailToast('获取用户异常');
			}
			return false;
		},

		// 要编辑的是editkey字段，当前值为currentValue
		// editKey=username&editName=昵称&currentValue=jarvis
		async updateUser(updateUser: userType) {
			// 是否更新用户用put请求？
			const res = await axios.post(UPDATE_USER_URL, updateUser);
			if (res.data.code === 0) {
				this.userInfo = updateUser;
				showSuccessToast('更新信息成功');
			} else {
				showFailToast('失败文案');
			}
		},
	},
});

export default useUserStore;
