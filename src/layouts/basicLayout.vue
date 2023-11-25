<script setup>
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

// Facade for navigation 门面模式
const navigate = {
  back: () => {
    if (router.currentRoute.value.name === 'User') {
      router.replace('/');
    } else {
      // TODO: Add logic to prevent infinite back navigation
      router.back();
      alert(router.currentRoute.value.name);
    }
  },
  toSearch: () => {
    router.push('/search');
  },
};

// Function to handle tab bar change events
const onChange = (index) => showToast(`标签 ${index}`);

// Functions to handle navigation bar button clicks
const onClickLeft = () => navigate.back();
const onClickRight = () => navigate.toSearch();
</script>

<template>
  <!-- Navigation bar -->
  <van-nav-bar
    title="Title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <!-- Search icon on the right side of the navigation bar -->
    <template #right>
      <a class="search-btn">
        <img src="../static/search_icon.svg" alt="Search Icon" />
      </a>
    </template>
  </van-nav-bar>

  <!-- Main content area -->
  <main id="content">
    <router-view />
  </main>

  <!-- Tab bar at the bottom of the page -->
  <van-tabbar route @change="onChange" v-model="active">
    <van-tabbar-item to="/" icon="home-o" name="index">Home</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">Search</van-tabbar-item>
    <van-tabbar-item to="/user/info" icon="friends-o" name="user">Me</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.search-btn {
  color: #888888;
  margin-bottom: 3px;
  font-size: 24px;
  width: 20px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.4s;
}
</style>
