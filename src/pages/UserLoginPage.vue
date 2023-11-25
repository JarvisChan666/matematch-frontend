<template>
	<van-form @submit="onSubmit">
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
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit" @click="onLogin">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<script setup lang="ts">
import useUserStore from '../store/user';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { provide } from 'vue';
import { showSuccessToast, showFailToast } from 'vant';

// reactive never use 'value'
// 封装起来
const userData = reactive({
	userAccount: '',
	userPassword: '',
});

const userStore = useUserStore();

const router = useRouter();

const onLogin = async () => {
	const res = await userStore.login(userData);
	if (res) {
		await userStore.getCurrentUser();
		router.replace('/user/info');
	}
	// 清空登录表单
	userData.userAccount = '';
	userData.userPassword = '';
};

const onLogout = () => {
	userStore.logout();
};
</script>
