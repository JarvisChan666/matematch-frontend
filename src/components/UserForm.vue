<!-- <template>
  <van-form>
    <van-cell-group inset>
      <van-field
        v-for="field in fields"
        :key="field.name"
        v-model="userData[field.name]"
        :name="field.label"
        :label="field.label"
        :placeholder="field.placeholder"
        :type="field.type"
        :rules="field.rules"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit" @click="onSubmit(userData)">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// 传入不同的表单和处理函数
const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
});

const userData = reactive(
  props.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
);
</script> -->