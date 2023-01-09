<template>
  <div>
    <!-- router-link是跳转路由的标签 -->
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/vuex">Vuex</router-link>
  </div>
  <!-- router-view负责展示当前路由对应的组件内容 -->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style></style>
