<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  props: ["message"],
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>
