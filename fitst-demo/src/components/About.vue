<template>
  <div @click="handleClick">this is an about page</div>
  <div>{{ myName }}</div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    myName() {
      return this.$store.state.name
    },
  },
  methods: {
    handleClick() {
      // 第一步，想改变数据，vuex要求第一步，必须派发一个change的action,
      this.$store.dispatch('change', 'hello world')
      // 如果只是修改数据 也可以直接使用commit
      // this.$store.commit('change')
    },
  },
}
</script>

<style>
.button {
  margin-left: 20px;
}
</style>
