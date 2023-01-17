<template>
  <div class="wrapper">
    <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        placeholder="请输入密码"
        type="password"
        v-model="password"
      />
    </div>
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        placeholder="确认密码"
        type="password"
        v-model="checkPassword"
      />
    </div>
    <div class="wrapper_login-button" @click="handleRegister">注册</div>
    <div class="wrapper_login-link" @click="handleClick">已有账号去登录</div>
    <Toast v-if="toastData.showToast" :message="toastData.toastMsg" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

// 处理注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "", checkPassword: "" });

  const handleRegister = async () => {
    try {
      const result = await post("api/user/register", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
      console.log(result);
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password, checkPassword } = toRefs(data);
  return { username, password, checkPassword, handleRegister };
};

// 处理登录跳转
const useLoginEffect = () => {
  const router = useRouter(); // 获取路由实例
  const handleClick = () => {
    router.push({ name: "Login" });
  };
  return { handleClick };
};

export default {
  name: "Register",
  components: { Toast },
  setup() {
    const { toastData, showToast } = useToastEffect();
    const { handleClick } = useLoginEffect();
    const { username, password, checkPassword, handleRegister } =
      useRegisterEffect(showToast);
    return {
      toastData,
      showToast,
      username,
      password,
      checkPassword,
      handleRegister,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &_img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto 0.4rem auto;
  }
  &_input {
    height: 0.48rem;
    padding: 0 0.16rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    &_content {
      line-height: 0.48rem;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &_login-button {
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.3);
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  &_login-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
