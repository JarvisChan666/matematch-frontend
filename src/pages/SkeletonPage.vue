<template>
  <van-skeleton>
    <template #template>
      <div :style="{ display: 'flex', width: '100%' }">
        <van-skeleton-image/>
        <div :style="{ flex: 1, marginLeft: '16px' }">
          <van-skeleton-paragraph row-width="60%"/>
          <van-skeleton-paragraph/>
          <van-skeleton-paragraph/>
          <van-skeleton-paragraph/>
        </div>
      </div>
    </template>
  </van-skeleton>
</template>

<script>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

onMounted(() => {
  // 在此处触发数据请求，并等待数据的加载
  // 加载完成后，通过编程式导航跳转到实际内容页面
  fetchDataAndNavigateToUsersPage();
});

const fetchDataAndNavigateToUsersPage = async () => {
  try {
    // 请求用户数据的 API
    const response = await fetch('/user/search/tags');
    const data = await response.json();

    if (response.ok) {
      // 数据请求成功，导航到实际内容页面
      await router.replace({path: '/user/search/tags', query: {data: JSON.stringify(data)}});
    } else {
      // 数据请求失败，显示错误信息或跳转到其他页面
      await router.replace('/');
    }
  } catch (error) {
    // 处理潜在的错误情况
    await router.replace('/');
  }
};
</script>