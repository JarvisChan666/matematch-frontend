<template>
	<van-form>
		<van-cell-group inset>
			<van-field
				v-model="userData.userAccount"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
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
				name="星球编号"
				label="星球编号"
				placeholder="星球编号"
				:rules="[{ required: true, message: '请填写星球编号' }]"
			/>
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit" @click="onRegister">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<script setup lang="ts">
import useUserStore from '../store/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// reactive never use 'value'
const userData = reactive({
	userAccount: '',
	userPassword: '',
	checkPassword: '',
	planetCode: '',
});

const userStore = useUserStore();

const onRegister = async () => {
	// login action is an async, so it will return promise
	const res = await userStore.register(userData);
	if (res) {
		await userStore.getCurrentUser();
		router.replace('/user/login');
	}
	// 清空注册表单
	userData.username = '';
	userData.password = '';
	userData.checkPassword = '';
	userData.planetCode = '';
};
</script>
