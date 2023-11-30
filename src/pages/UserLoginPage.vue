<template>
	<van-form>
		<van-cell-group inset>
			<van-field
				v-model="userData.userAccount"
				name="账号"
				label="账号"
				placeholder="账号"
				:rules="rules.userAccount"
			/>
			<van-field
				v-model="userData.userPassword"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="rules.userPassword"
			/>
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit" @click="handleLogin">
				提交
			</van-button>
			<router-link to="/user/register" style="display: block; text-align: center; margin-top: 10px">
				还没有注册？点击这里
			</router-link>
		</div>
		<van-divider />
		<van-row type="flex" justify="space-around" class="vanRow">
			<van-col span="6.3">
				<van-icon class="iconfont" class-prefix="icon" name="githublogo" />
			</van-col>
			<van-col span="6.3">
				<van-icon class="iconfont" class-prefix="icon" name="google" />
			</van-col>
			<van-col span="6.3">
				<van-icon class="iconfont" class-prefix="icon" name="weixin" />
			</van-col>
			<van-col span="6.3">
				<van-icon class="iconfont" class-prefix="icon" name="gitee" />
			</van-col>
		</van-row>
	</van-form>
</template>

<script setup lang="ts">
import useUserStore from '../store/user';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { provide } from 'vue';
import { showSuccessToast, showFailToast } from 'vant';
import { userType } from '../models/user';
import { USER_INFO_URL } from '../common/constants';
import '../assets/icon/iconfont.css';

// reactive never use 'value'
// 封装起来
const userData: userType = reactive({
	userAccount: '',
	userPassword: '',
});

const userStore = useUserStore();

// Get the username and password from the user store
const userAccountFromStore = userStore.lastRegisteredUserAccount;
const userPasswordFromStore = userStore.lastRegisteredUserPassword;

// Fill the login form with the username and password
userData.userAccount = userAccountFromStore || '';
userData.userPassword = userPasswordFromStore || '';

const router = useRouter();

const handleLogin = async () => {
	const res = await userStore.login(userData);
	if (res) {
		await userStore.getCurrentUser();
		router.replace(USER_INFO_URL);
	}
	// 清空登录表单
	userData.userAccount = '';
	userData.userPassword = '';
};

// 表单验证规则
const rules = reactive({
	userAccount: [{ required: true, message: '请填写账号' }],
	userPassword: [{ required: true, message: '请填写密码' }],
});
</script>

<style scoped>
.iconfont {
	font-size: 2em; /* 设置图标的大小 */
}

.github-icon {
	color: #4078c0; /* GitHub 的颜色 */
}

.google-icon {
	color: #4285f4; /* Google 的颜色 */
}

.weixin-icon {
	color: #7bb32e; /* 微信的颜色 */
}

.gitee-icon {
	color: #c71d23; /* 码云 Gitee 的颜色 */
}
</style>
