<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position_icon">&#xebbb;</span
      >北京理工大学国防科技园2号楼10层<span class="iconfont position_notice"
        >&#xe627;</span
      >
    </div>
    <div class="search">
      <span class="iconfont">&#xe651;</span>
      山姆会员商店优惠商品
    </div>
    <div class="banner">
      <img
        class="banner_img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        alt=""
      />
    </div>
    <div class="icons">
      <div class="icons_item" v-for="(item, index) in list" :key="index">
        <img class="icons_item_img" :src="item.src" alt="" />
        <p class="icons_item_desc">{{ item.name }}</p>
      </div>
    </div>
    <div class="gap"></div>
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
<script>
import { reactive } from "vue";
export default {
  setup() {
    const list = reactive([
      {
        name: "超市便利",
        src: "http://www.dell-lee.com/imgs/vue3/超市.png",
      },
      {
        name: "菜市场",
        src: "http://www.dell-lee.com/imgs/vue3/菜市场.png",
      },
      {
        name: "水果店",
        src: "http://www.dell-lee.com/imgs/vue3/水果店.png",
      },
      {
        name: "鲜花绿植",
        src: "http://www.dell-lee.com/imgs/vue3/鲜花.png",
      },
      {
        name: "医药健康",
        src: "http://www.dell-lee.com/imgs/vue3/医药健康.png",
      },
      {
        name: "家具时尚",
        src: "http://www.dell-lee.com/imgs/vue3/家居.png",
      },
      {
        name: "烘焙蛋糕",
        src: "http://www.dell-lee.com/imgs/vue3/蛋糕.png",
      },
      {
        name: "签到",
        src: "http://www.dell-lee.com/imgs/vue3/签到.png",
      },
      {
        name: "大牌免运",
        src: "http://www.dell-lee.com/imgs/vue3/大牌免运.png",
      },
      {
        name: "红包套餐",
        src: "http://www.dell-lee.com/imgs/vue3/红包.png",
      },
    ]);
    return {
      list,
    };
  },
};
</script>

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
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  .iconfont {
    font-size: 0.16rem;
    display: inline-block;
    padding: 0 0.12rem 0 0.12rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &_img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &_item {
    width: 20%;
    &_img {
      display: block;
      margin: 0 auto;
      width: 0.4rem;
      height: 0.4rem;
    }
    &_desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: 0.1rem;
  background: $content-bgColor;
  margin: 0 -0.18rem;
}
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
