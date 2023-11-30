<template>
	<!--  TODO 反馈组件添加：Loading加载中。下拉刷新，展示组件骨架屏-->
	<UserCardList :user-list="userList" />
	<van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import myAxios from '../plugins/myAxios.ts';
import qs from 'qs';
import { showToast } from 'vant';
import UserCardList from '../components/UserCardList.vue';
import { watch } from 'vue';

const showPopover = ref(false);

// 通过 actions 属性来定义菜单选项
const onSelect = (action) => showToast(action.text);

const route = useRoute();

const userList = ref([]);

const showEmail = () => {
	showToast('提示内容');
};

const tags = route.query.tags ? route.query.tags.split(',') : [];

const pageNum = ref(1); // 当前页数

let isLoading = false; // 新增：数据是否正在加载
// Fetch user list from API
// 分页查询，一页10个
const fetchUserList = async () => {
	if (isLoading) return; // 如果数据正在加载，那么就不再触发新的加载
	isLoading = true; // 开始加载数据
	try {
		const response = await myAxios.get('/user/recommend', {
			params: {
				pageSize: 10,
				pageNum: pageNum.value,
			},
		});
		console.log('/user/recommend successed', response);
		showToast('请求成功');
		const newRecords = response?.data?.data?.records;
		if (newRecords) {
			newRecords.forEach((user) => {
				if (user.tags) {
					user.tags = JSON.parse(user.tags);
				}
			});
			// 追加新的用户列表数据到现有的用户列表中
			userList.value = [...userList.value, ...newRecords];
		}
	} catch (error) {
		console.error('/user/recommend error', error);
		showToast('请求失败');
	} finally {
		isLoading = false; // 加载数据完成
	}
};

// 新增：检测用户是否滚动到页面底部
const checkScroll = () => {
	const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
	if (nearBottom) {
		pageNum.value++; // 增加页数
		fetchUserList(); // 加载下一页的数据
	}
};

onMounted(async () => {
	// 第一次加载数据
	await fetchUserList();

	// 监听滚动事件
	window.addEventListener('scroll', checkScroll, { passive: true });
});

onUnmounted(() => {
	// 移除滚动事件监听
	window.removeEventListener('scroll', checkScroll);
});
</script>

<!-- 这个 Vue 组件的主要功能是从后端 API 获取用户列表数据，并在页面上显示这些数据。当用户滚动到页面底部时，会自动加载更多的数据。

以下是这个组件的主要逻辑：

在 onMounted 钩子函数中，首次加载数据并设置滚动事件监听器。

fetchUserList 函数用于从后端 API 获取用户列表数据。每次调用这个函数时，都会获取下一页的数据，并将这些数据追加到现有的用户列表中。

checkScroll 函数用于检测用户是否滚动到页面底部。如果用户滚动到页面底部，那么就增加页数并加载下一页的数据。

在 fetchUserList 函数中，使用了一个 isLoading 状态来跟踪数据是否正在加载。如果数据正在加载，那么就不再触发新的加载。这可以防止在数据还在加载时就触发多次加载。

在 onUnmounted 钩子函数中，移除滚动事件监听器。

从这个组件中，你可以学到以下几点：

如何在 Vue 组件中使用 ref 来创建响应式引用。

如何在 Vue 组件中使用 onMounted 和 onUnmounted 钩子函数。

如何在 Vue 组件中使用 window.addEventListener 和 window.removeEventListener 来添加和移除事件监听器。

如何在 Vue 组件中使用 axios 来从后端 API 获取数据。

如何在 Vue 组件中使用 ... 扩展运算符来追加数组元素。

如何在 Vue 组件中使用状态来跟踪数据是否正在加载，以防止在数据还在加载时就触发多次加载。 -->

<style>
/* 这里可以添加你的样式 */
</style>
