<script setup>
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

// Facade for navigation 门面模式
const navigate = {
  back: () => {
    // TODO: Add logic to prevent infinite back navigation
    router.back();
  },
  toSearch: () => {
    router.push('/search');
  },
};

const onChange = (index) => showToast(`标签 ${index}`);

const onClickLeft = () => navigate.back();
const onClickRight = () => navigate.toSearch();
</script>

<template>
  <van-nav-bar
    title="Title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view />
  </div>
  <van-tabbar route @change="onChange" v-model="active">
    <van-tabbar-item to="/" icon="home-o" name="index">Home</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">Search</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">Me</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
