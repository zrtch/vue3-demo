<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position_icon">&#xebbb;</span
      >北京理工大学国防科技园2号楼10层<span class="iconfont position_notice"
        >&#xe627;</span
      >
    </div>
  </div>
  <div class="docker">
    <span class="docker_item docker_item--active">
      <div class="iconfont">&#xe7d4;</div>
      <div class="docker_title">首页</div>
    </span>
    <span class="docker_item">
      <div class="iconfont">&#xe6e6;</div>
      <div class="docker_title">购物车</div>
    </span>
    <span class="docker_item">
      <div class="iconfont">&#xe643;</div>
      <div class="docker_title">订单</div>
    </span>
    <span class="docker_item"
      ><div class="iconfont">&#xe61a;</div>
      <div class="docker_title">我的</div>
    </span>
  </div>
</template>

<style lang="scss">
@import "./style/viriables.scss";
@import "./style/mixins.scss";
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem;
}
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  @include ellipsis;
  .position_icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
    margin-right: 0.02rem;
  }
  .position_notice {
    position: absolute;
    font-size: 0.16rem;
    right: 0;
  }
}
.docker {
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border: 0.01rem solid #f1f1f1;
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
