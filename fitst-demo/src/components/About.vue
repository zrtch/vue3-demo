<template>
  <div>111</div>
</template>

<script>
import { reactive, ref } from 'vue'
import ListItem from './ListItem.vue'
export default {
  // name: 'About',
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
