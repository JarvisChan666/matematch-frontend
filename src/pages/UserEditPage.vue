<template>
	<van-form>
		<van-field
			v-model="newValue"
			:name="editUser.editKey"
			:label="editUser.editName"
			:placeholder="`请输入${newValue}`"
		/>
		<van-button type="primary" native-type="submit" @click="onSubmit">提交</van-button>
	</van-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import useUserStore from '../store/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// editKey=username&editName=昵称&currentValue=jarvis
const editUser = ref({
	editKey: route.query.editKey,
	editName: route.query.editName,
	currentValue: route.query.currentValue,
});

const newValue = ref(editUser.value.currentValue);

console.log(editUser);

const onSubmit = async () => {
	const { editKey } = editUser.value;

	// Create a copy of the current userInfo
	const updatedUser = { ...userStore.userInfo };

	// Update the field
	updatedUser[editKey] = newValue.value;

	// Call the updateUser action in the user store
	await userStore.updateUser(updatedUser);
	router.push('/user/info');
};
</script>
