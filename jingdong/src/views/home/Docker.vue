<template>
  <div class="docker">
    <span
      v-for="(item, index) in dockerList"
      :class="{ docker_item: true, 'docker_item--active': index === 0 }"
      class="docker_item"
      :key="index"
    >
      <div class="iconfont" v-html="item.icon" />
      <div class="docker_title">{{ item.text }}</div>
    </span>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Docker",
  setup() {
    const dockerList = reactive([
      { icon: "&#xe7d4;", text: "首页" },
      { icon: "&#xe6e6;", text: "购物车" },
      { icon: "&#xe643;", text: "订单" },
      { icon: "&#xe61a;", text: "我的" },
    ]);
    return {
      dockerList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.docker {
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  display: flex;
  color: $content-fontcolor;
  &_item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &_title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
