<script setup>
import BasicLayout from './layouts/BasicLayout.vue';
import UserLayout from './layouts/UserLayout.vue';
import UserLoginPage from './pages/UserLoginPage.vue';
import useUserStore from './store/user';

const userStore = useUserStore();
</script>
<template>
	<div>
		<BasicLayout v-if="userStore.userAccount" msg="" />
		<UserLayout v-else msg="" />
	</div>
</template>

<style scoped></style>
