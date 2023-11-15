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
      <div class="search-box">
        <a class="search-btn">
          <!-- TODO 点击搜索后隐藏title -->
          <img src="../../src/assets/search_icon.svg" />
          <i class="fa fa-search" aria-hidden="false"></i>
        </a>
        <!-- <input type="text" class="search-txt" placeholder="搜索" /> -->
        <div class="search-line"></div>
      </div>
    </template>
  </van-nav-bar>

  <!-- Main content area -->
  <div id="content">
    <router-view />
  </div>

  <!-- Tab bar at the bottom of the page -->
  <van-tabbar route @change="onChange" v-model="active">
    <van-tabbar-item to="/" icon="home-o" name="index">Home</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">Search</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">Me</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

/* .search-txt {
  border: none;
  background: none;
  outline: none;
  padding: 0;
  color: #222;
  font-size: 16px;
  line-height: 40px;
  width: 0;
  transition: 0.4s;
} */
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
.search-box:hover .search-txt {
  width: 200px;
  padding: 0 12px;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>
