<template>
	<van-form>
		<van-cell-group inset>
			<van-field
				v-model="userData.userAccount"
				name="账号"
				label="账号"
				placeholder="账号"
				:rules="[{ required: true, message: '请填写账号' }]"
			/>
			<van-field
				v-model="userData.userPassword"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<van-field
				v-model="userData.checkPassword"
				name="检查密码"
				type="password"
				label="请再次输入密码"
				placeholder="请再次输入密码"
				:rules="[{ required: true, message: '请再次输入密码' }]"
			/>
			<van-field
				v-model="userData.planetCode"
				name="编号"
				label="编号"
				placeholder="编号"
				:rules="[{ required: true, message: '请填写编号' }]"
			/>
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit" @click="onRegister">
				提交
			</van-button>
			<router-link to="/user/login" style="display: block; text-align: center; margin-top: 10px">
				已经注册？点击这里登录
			</router-link>
		</div>
	</van-form>
</template>

<script setup lang="ts">
import useUserStore from '../store/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { USER_ACCOUNT, USER_PASSWORD, CHECK_PASSWORD, PLANET_CODE } from '../common/constants';

const router = useRouter();

// reactive never use 'value'
const userData = reactive({
	[USER_ACCOUNT]: '',
	[USER_PASSWORD]: '',
	[CHECK_PASSWORD]: '',
	[PLANET_CODE]: '',
});

const userStore = useUserStore();

const onRegister = async () => {
	// login action is an async, so it will return promise
	const res = await userStore.register(userData);
	if (res) {
		await userStore.getCurrentUser();
		userStore.lastRegisteredUserAccount = userData[USER_ACCOUNT];
		userStore.lastRegisteredUserPassword = userData[USER_PASSWORD];
		router.replace('/user/login');
	}
	// 清空注册表单
	userData.username = '';
	userData.password = '';
	userData.checkPassword = '';
	userData.planetCode = '';
};
</script>
