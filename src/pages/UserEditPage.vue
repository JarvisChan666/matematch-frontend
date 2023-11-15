<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="editUser.currentValue"
      :name="editUser.editKey"
      :label="editUser.editName"
      :placeholder="`请输入${editUser.editName}`"
    />
    <van-button type="primary" native-type="submit">提交</van-button>
  </van-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});

console.log(editUser)

const onSubmit = () => {
  // 在这里处理表单数据
  console.log('submit:');

  // 提交完成后返回用户页面
  router.push('/user');
};
</script>
