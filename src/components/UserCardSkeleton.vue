<template>
	<van-skeleton :loading="loading" title :row="3">
		<slot></slot>
		<template #template>
			<div :style="{ display: 'flex', width: '100%' }">
				<van-skeleton title avatar avatar-size="80px" :row="3" />
				<div :style="{ flex: 1, marginLeft: '16px' }">
					<van-skeleton-paragraph row-width="60%" />
					<van-skeleton-paragraph />
					<van-skeleton-paragraph />
					<van-skeleton-paragraph />
				</div>
			</div>
		</template>
	</van-skeleton>
	<van-empty v-if="!loading && (!userList || userList.length < 1)" description="搜索结果为空" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
	loading: Boolean,
});
</script>
