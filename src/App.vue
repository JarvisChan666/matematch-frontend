<script setup>
import BasicLayout from './layouts/BasicLayout.vue';
import UserLayout from './layouts/UserLayout.vue';
import useUserStore from './store/user';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const layoutComponent = computed(() => {
	switch (route.meta.layout) {
		case 'UserLayout':
			return UserLayout;
		default:
			return BasicLayout;
	}
});

const userStore = useUserStore();
</script>
<template>
	<!-- <div>
		<BasicLayout v-if="userStore.userAccount" msg="" />
		<UserLayout v-else msg="" />
	</div> -->
	<component :is="layoutComponent">
		<router-view />
	</component>
</template>

<style scoped></style>
