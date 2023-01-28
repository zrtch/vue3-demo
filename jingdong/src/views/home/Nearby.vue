<template>
  <div class="nearby">
    <h3 class="nearby_title">附近店铺</h3>
    <div class="nearby_item" v-for="(item, index) in list" :key="item.id">
      <img :src="item.img" alt="" class="nearby_item_img" />
      <div class="nearby_content">
        <div class="nearby_content_title">{{ item.title }}</div>
        <div class="nearby_content_tags">
          <span class="nearby_content_tag" v-for="tag in item.tags">
            {{ tag }}
          </span>
        </div>
        <p class="nearby_content_highlight">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nearby",
  setup() {
    const list = [
      {
        id: 1,
        img: "http://www.dell-lee.com/imgs/vue3/near.png",
        title: "沃尔玛",
        tags: ["月售1万+", "月售1万+"],
        desc: "VIP尊享满89元减4元运费",
      },
      {
        id: 2,
        img: "http://www.dell-lee.com/imgs/vue3/near.png",
        title: "沃尔玛",
        tags: ["月售1万+", "月售1万+"],
        desc: "VIP尊享满89元减4元运费",
      },
      {
        id: 3,
        img: "http://www.dell-lee.com/imgs/vue3/near.png",
        title: "沃尔玛",
        tags: ["月售1万+", "月售1万+"],
        desc: "VIP尊享满89元减4元运费",
      },
    ];
    return {
      list,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.nearby {
  &_title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  &_item {
    padding-top: 0.12rem;
    display: flex;
    &_img {
      width: 0.56rem;
      height: 0.56rem;
      margin-right: 0.16rem;
    }
  }
  &_content {
    flex: 1;
    padding-bottom: 0.12rem;
    border-bottom: 1px solid $content-bgColor;
    &_title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &_tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }
    &_tag {
      margin-right: 0.16rem;
    }
    &_highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>
