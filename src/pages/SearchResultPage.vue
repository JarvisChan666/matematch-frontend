<template>
  <!--  TODO 反馈组件添加：Loading加载中。下拉刷新，展示组件骨架屏-->
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag v-for="tag in tags" plain type="primary" style="margin-top: 8px">{{ tag }}</van-tag>
    </template>
    <template #footer>
      <van-popover :actions="actions" @select="onSelect">
        <template #reference>
          <!--          TODO 展示用户邮箱-->
          <van-button type="primary" @click="showEmail">TODO获取邮箱</van-button>
        </template>
      </van-popover>
    </template>

  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import myAxios from '../plugins/myAxios.ts';
import qs from 'qs';
import {showToast} from 'vant';

const showPopover = ref(false);

// 通过 actions 属性来定义菜单选项
const onSelect = (action) => showToast(action.text);


const route = useRoute();

const userList = ref([]);

const showEmail = () => {
  showToast('提示内容');
};

const tags = route.query.tags ? route.query.tags.split(',') : [];

onMounted(async () => {
  const userListData = await myAxios
      .get('/user/search/tags', {
        withCredentials: false,
        params: {
          tagNameList: tags,
        },
        // 前端序列化 前端字符串 后端要数组
        paramsSerializer: {
          serialize: (params) => qs.stringify(params, {indices: false}),
        },
      })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error', error);
      });
  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
});


</script>

<style>
/* 这里可以添加你的样式 */
</style>
