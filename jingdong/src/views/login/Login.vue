<template>
  <div class="wrapper">
    <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        placeholder="请输入用户名"
        v-model="data.username"
      />
    </div>
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        placeholder="请输入密码"
        type="password"
        v-model="data.password"
      />
    </div>
    <div class="wrapper_login-button" @click="handleLogin">登录</div>
    <div class="wrapper_login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="data.showToast" :message="data.toastMsg" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { post } from "../../utils/request";
import Toast from "../../components/Toast";

export default {
  name: "Login",
  components: { Toast },
  setup() {
    const data = reactive({
      password: "",
      username: "",
      showToast: false,
      toastMsg: "",
    });
    const router = useRouter(); // 获取路由实例

    const showToast = (message) => {
      data.showToast = true;
      data.toastMsg = message;
      setTimeout(() => {
        data.showToast = false;
        data.toastMsg = message;
      }, 2000);
    };

    const handleLogin = async () => {
      try {
        const result = await post("11/api/user/login", {
          username: data.username,
          password: data.password,
        });
        if (result?.errno === 0) {
          localStorage.isLogin = true;
          router.push({ name: "Home" });
        } else {
          showToast("登录失败");
        }
        console.log(result);
      } catch (e) {
        showToast("请求失败");
      }
    };
    const handleRegisterClick = () => {
      router.push({ name: "Register" });
    };
    return {
      data,
      handleLogin,
      handleRegisterClick,
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
