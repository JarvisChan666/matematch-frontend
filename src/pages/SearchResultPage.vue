<template>
	<!--  TODO 反馈组件添加：Loading加载中。下拉刷新，展示组件骨架屏-->
	<UserCardList :user-list="userList"/>
	<van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import myAxios from '../plugins/myAxios.ts';
import qs from 'qs';
import { showToast } from 'vant';
import UserCardList from '../components/UserCardList.vue';

const showPopover = ref(false);

// 通过 actions 属性来定义菜单选项
const onSelect = (action) => showToast(action.text);

const route = useRoute();

const userList = ref([]);

const showEmail = () => {
	showToast('提示内容');
};

const tags = route.query.tags ? route.query.tags.split(',') : [];

const fetchUserList = async() => {
	 try {
    const response = await myAxios.get('/user/search/tags', {
      params: {
        tagNameList: tags,
      },
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { indices: false }),
      },
    });

    console.log('/user/search/tags succeed', response);

    const userListData = response.data?.data;

    if (userListData) {
      userListData.forEach((user) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = userListData;
    }
  } catch (error) {
    console.log('/user/search/tags error', error);
		showToast('Failed to fetch user list');
    // Add more error handling logic here
  }
}

onMounted(async () => {
	fetchUserList();
});
</script>

<style>
/* 这里可以添加你的样式 */
</style>
