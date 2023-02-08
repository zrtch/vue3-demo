<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "Toast",
  props: ["message"],
};

// 弹窗的逻辑都封装到此处
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMsg: "",
  });
  const showToast = (message) => {
    toastData.showToast = true;
    toastData.toastMsg = message;
    setTimeout(() => {
      toastData.showToast = false;
      toastData.toastMsg = message;
    }, 2000);
  };
  return { toastData, showToast };
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
