<template>
  <button @click="handleClick">改变vuex数据</button>
  <div>{{ vuexName }}</div>
</template>

<script>
import { useStore } from 'vuex'
import { toRefs } from 'vue'
export default {
  setup() {
    const store = useStore()
    const { vuexName } = toRefs(store.state)
    const handleClick = () => {
      store.dispatch('changeVuex', 'compoisiton vuex')
    }
    return { vuexName, handleClick }
  },
}
</script>

<style></style>
