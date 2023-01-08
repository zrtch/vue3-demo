<template>
  <div>
    <input v-model="inputValue" />
    <button class="button" @click="hanldeAdd">添加</button>
  </div>
  <ul>
    <list-item v-for="item in list" :key="item" :msg="item" />
  </ul>
</template>

<script>
import { reactive, ref } from 'vue'
import ListItem from './ListItem.vue'
export default {
  name: 'App',
  components: { ListItem },
  setup() {
    const inputValue = ref('')
    const list = reactive([])
    const hanldeAdd = () => {
      list.push(inputValue.value)
      inputValue.value = ' '
    }
    return {
      inputValue,
      list,
      hanldeAdd,
    }
  },
}
</script>

<style>
.button {
  margin-left: 20px;
}
</style>
