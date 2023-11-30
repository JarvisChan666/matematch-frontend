<template>
	<van-card
		v-for="(user, index) in userList"
		:desc="user.profile"
		:title="`${user.username} (${user.planetCode})`"
		:thumb="user.avatarUrl"
		style="padding-bottom: 50px"
	>
		<template #tags>
			<van-tag v-for="tag in tags" plain type="primary" style="margin-top: 8px">{{ tag }}</van-tag>
		</template>
		<template #footer>
			<van-popover :actions="actions" @select="onSelect">
				<template #reference>
					<!--          TODO 展示用户邮箱-->
					<van-button type="primary" @click="() => showEmail(index)">TODO获取邮箱</van-button>
				</template>
			</van-popover>
		</template>
	</van-card>
	<!-- 回到顶部 -->
	<van-back-top right="15vw" bottom="10vh" offset="800" />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { userType } from '../models/user';
import { showToast } from 'vant';

interface UserCardListProps {
	userList: userType[];
}

// withDefault让props有个默认值空数组
const props = withDefaults(defineProps<UserCardListProps>(), {
	userList: [] as userType[],
});

const showEmail = (index: number) => {
	const user = props.userList[index];
	showToast(user.email);
};
</script>
