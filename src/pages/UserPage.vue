<template>
	<div class="user-info-container">
		<van-cell
			title="昵称"
			:value="userInfo.username"
			is-link
			to="/user/edit"
			@click="edit('username', '昵称', userInfo.username)"
		/>
		<van-cell title="账号" :value="userInfo.userAccount" />

		<van-cell
			title="头像"
			is-link
			to="/user/edit"
			@click="edit('avatarUrl', '头像', userInfo.avatarUrl)"
		>
			<img :src="userInfo.avatarUrl" style="height: 40px" />
		</van-cell>

		<!-- TODO 性别男女映射01 -->
		<van-cell
			title="性别"
			:value="userInfo.gender"
			is-link
			to="/user/edit"
			@click="edit('gender', '性别', userInfo.gender)"
		/>
		<van-cell
			title="电话"
			:value="userInfo.phone"
			to="/user/edit"
			@click="edit('phone', '电话', userInfo.phone)"
		/>
		<van-cell
			title="邮箱"
			:value="userInfo.email"
			to="/user/edit"
			@click="edit('email', '邮箱', userInfo.email)"
		/>
		<van-cell title="编号" :value="userInfo.planetCode" />
		<van-cell title="注册时间" :value="formatDate(userInfo.createTime)" />
		<van-button round block type="danger" @click="handleLogout"> 退出登录 </van-button>
		<!-- </div> -->
		<!-- TODO 优化 -->
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { provide } from 'vue';
import { inject } from 'vue';
import useUserStore from '../store/user';
import { LOGIN_URL } from '../common/constants';

const userStore = useUserStore();
const userInfo = userStore.userInfo;
console.log(userInfo);

const router = useRouter();

const handleLogout = async () => {
	const res = userStore.logout();
	if (res) {
		router.replace(LOGIN_URL);
	}
};

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString();
};

// 动态路由
const edit = (editKey: string, editName: string, currentValue: string) => {
	router.push({
		path: '/user/edit',
		query: {
			editKey,
			editName,
			currentValue,
		},
	});
};
</script>

<style scoped>
.van-cell {
	flex-grow: 1;
}

.user-info-container {
	display: flex;
	flex-direction: column;
	width: 100vh;
	height: calc(100vh - 100px); /* 替换 X 为其他元素的总高度 */
	overflow: auto; /* 添加滚动 */
	padding: 0 20px; /* 添加左右的内边距 */
}
</style>
