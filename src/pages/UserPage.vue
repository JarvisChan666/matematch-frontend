<template>
	<div>
		<!-- TODO 骨架优化，后端请求到后渲染 -->
		<!-- <van-skeleton v-if="isLoading" row="4" :animate="true" />
    <div v-else> -->
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
		<van-cell title="注册时间" :value="userInfo.createTime" to="/user/edit" />
		<van-cell title="星球编号" :value="userInfo.planetCode" />
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

const userStore = useUserStore();
const userInfo = userStore.userInfo;
console.log(userInfo);

const isLoading = ref(true);

const router = useRouter();

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

<style scoped></style>
