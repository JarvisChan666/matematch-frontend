// 共享组件用户状态
import { defineStore } from 'pinia';
import axios from '../plugins/myAxios';
import { showSuccessToast, showFailToast } from 'vant';
import { userType } from '../models/user';
import router from '../router';
import {
	LOGIN_URL,
	LOGOUT_URL,
	REGISTER_URL,
	CURRENT_USER_URL,
	UPDATE_USER_URL,
} from '../common/constants';
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
			try {
				const res = await axios.post(LOGIN_URL, userData);
				const { data, description } = res.data;
				// 用data判断，后端登录失败还是返回code=0
				if (data) {
					this.userInfo = Object.freeze(data);
					showSuccessToast('登录成功');
					return true;
				} else {
					showFailToast('登录失败 ' + description);
					return false;
				}
			} catch (error) {
				console.error('Login failed', error);
				return false;
			}
		},

		async register(userData: userType) {
			try {
				const res = await axios.post(REGISTER_URL, userData);
				const { data, code, description } = res.data;
				if (code === 0) {
					// 使用Object.freeze来冻结userInfo对象。这样可以防止Vue对userInfo进行不必要的数据劫持，从而提高性能。
					this.userInfo = Object.freeze(data);
					// this.userInfo = data;
					showSuccessToast('注册成功');
					return true;
				} else {
					showFailToast('注册失败 ' + description);
					return false;
				}
			} catch (error) {
				// 处理网络错误或其他导致 axios.post 失败的错误
				console.error('Register failed', error);
				return false;
			}
		},

		// TODO:退出功能
		async logout() {
			try {
				const res = await axios.post(LOGOUT_URL);
				const { code, description } = res.data;
				// 清除客户端的用户数据
				if (code == 0) {
					this.userInfo = {};
					showSuccessToast('退出成功');
					return true;
				} else {
					showFailToast('退出失败 ' + description);
					return false;
				}
			} catch (error) {
				console.error('Logout failed', error);
			}
		},

		async getCurrentUser() {
			try {
				const cachedData = localStorage.getItem('userInfo');
				if (cachedData) {
					const userInfo = JSON.parse(cachedData);
					console.log('get current user from localStorage' + userInfo);
					return userInfo;
				}
				const res = await axios.get(CURRENT_USER_URL);
				const { data, code } = res.data;
				if (code === 0) {
					// 前端只要文字，后端只要数字，两边通信时先转成对方需要的(这里都给前端处理)
					// Map gender from 0 and 1 to '男' and '女'
					data.gender = data.gender === 0 ? '男' : '女';
					localStorage.setItem('userInfo', JSON.stringify(data));
					console.log('get current user from axios' + data);
					return data;
				} else {
					// 只有当当前路由不是登录路由时，才显示失败的 Toast 消息
					const path = router.currentRoute.value.path;
					if (path !== LOGIN_URL && path != REGISTER_URL && path != '/') {
						showFailToast('获取用户异常');
					}
					return false;
				}
			} catch (error) {
				console.error('get user failed', error);
			}
			return false;
		},

		// 要编辑的是editkey字段，当前值为currentValue
		// editKey=username&editName=昵称&currentValue=jarvis
		async updateUser(updateUser: userType) {
			// Map gender from '男' and '女' to 0 and 1
			updateUser.gender = updateUser.gender === '男' ? 0 : 1;
			// 是否更新用户用put请求？
			const res = await axios.post(UPDATE_USER_URL, updateUser);
			if (res.data.code === 0) {
				localStorage.removeItem('userInfo');
				this.userInfo = await this.getCurrentUser();
				showSuccessToast('更新信息成功');
			} else {
				showFailToast('更新信息失败');
			}
		},
	},
});

export default useUserStore;
