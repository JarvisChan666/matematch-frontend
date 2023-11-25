// import axios from 'axios';
import { defineStore } from 'pinia';
import axios from '../plugins/myAxios';
import { showSuccessToast, showFailToast } from 'vant';

const LOGIN_URL = '/user/login';
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
		userAccount: '',
		//这里userInfo应该不重复，前两个用于登录
		//方便userInfo[editkey]取值更新user信息
		userInfo: {} as { [key: string]: any },
	}),

	getters: {},

	actions: {
		async login(userData: any) {
			try {
				const res = await axios.post(LOGIN_URL, userData);
				const { data, code } = res.data;
				if (code === 0) {
					this.userAccount = data.userAccount;
					this.userInfo = data;
					localStorage.setItem('user', JSON.stringify(data));
					return true;
				}
			} catch (error) {
				showFailToast('登陆失败');
			}
			return false;
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
		async updateUser(updateUser: any) {
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
