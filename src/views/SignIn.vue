<template>
  <div class="login-container">
    <h2 class="login-title">Sign In</h2>
    <a-form layout="vertical" class="login-form" :model="signInForm" @submit="handleSignIn()">
      <h2 class="title">用户登录 LOGIN</h2>
      <a-form-item>
        <a-input v-model:value="signInForm.username" placeholder="Username">
          <template #prefix>
            <UserOutlined style="color:rgba(0,0,0,.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="signInForm.password" type="password" placeholder="Password">
          <template #prefix>
            <LockOutlined style="color:rgba(0,0,0,.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <a-button
                class="button"
                type="primary"
                html-type="submit"
                :loading="submitting"
                :disabled="signInForm.username === '' || signInForm.password === ''"
            >
              Sign In
            </a-button>
          </a-col>
          <a-col :span="12">
            <a-button type="primary" class="button" v-on:click="handleSignOut()">Sign Out</a-button>
          </a-col>
        </a-row>

      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import router from '../router'
import {signIn, signOut} from "../api/api.js";
import {LockOutlined, UserOutlined} from '@ant-design/icons-vue'
import {message} from "ant-design-vue";

export default {
  name: 'SignIn',
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      submitting: false,
      signInForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 32, message: '密码至少需要6个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async handleSignIn() {
      this.submitting = true;
      await setTimeout(() => {
        signIn(this.signInForm).then(() => {
          message.success("登入成功")
          router.push("/");
          this.submitting = false;
        }).catch(() => {
          this.submitting = false;
        });
      },1000)
    },
    async handleSignOut() {
      await signOut();
      await message.success("登出成功");
      await router.push("/signIn");
    }

  }
}
</script>
<style>
.login-form {
  width: 80%;
  height: 80%;
  margin: 0 auto;
}

.login-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-size: cover;
  background: url("../assets/background.jpg");
}

.title {
  margin-bottom: 50px;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}

.button {
  width: 80%;
}

/* Log */
.login-title {
  color: #fff;
  text-align: center;
  font-size: 48px;
  font-family: Microsoft Yahei;
}

</style>
