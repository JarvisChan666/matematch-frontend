<template>
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="请再次输入密码"
				label="请再次输入密码"
				placeholder="请再次输入密码"
				:rules="[{ required: true, message: '请再次输入密码' }]"
			/>
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit"> 提交 </van-button>
		</div>
	</van-form>
</template>

<script setup>
import useUserStore from '../store/user';

// reactive never use 'value'
const userData = reactive({
	username: '',
	password: '',
});

const userStore = useUserStore();

const onLogin = async () => {
  // login action is an async, so it will return promise
  await userStore.login(userData);
  userData.username = '';
  userData.password = '';
};

const onLogout = () => {
  userStore.logout();
}
</script>