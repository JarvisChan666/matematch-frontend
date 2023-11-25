// import axios from 'axios';
import { defineStore } from 'pinia';
import axios from '../plugins/myAxios';
import { showSuccessToast, showFailToast } from 'vant';

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
			// 后端接受的是整个user
			const res = await axios.post('/user/login', userData);
			const { data, code } = res.data;
			console.log(code);
			if (code === 0) {
				this.userAccount = data.userAccount;
				this.userInfo = data;
				console.log('user login successful');
				// Store user data in localStorage
				localStorage.setItem('user', JSON.stringify(data));
				return true;
			}
			return false;
		},

		logout() {
			this.userAccount = '';
			// Remove user data from localStorage
			localStorage.removeItem('user');
		},

		async getCurrentUser() {
			const res = await axios.get('/user/current');
			const { data, code } = res.data;
			console.log('get current user' + data);
			if (code === 0) {
				return data;
			}
		},

		// 要编辑的是editkey字段，当前值为currentValue
		// editKey=username&editName=昵称&currentValue=jarvis
		async updateUser(updateUser: any) {
			// 是否更新用户用put请求？
			const res = await axios.post('/user/update', updateUser);
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
