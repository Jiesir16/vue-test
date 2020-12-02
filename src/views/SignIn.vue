<template>
  <div class="home">


    <a-form layout="inline" :model="signInForm" @submit="handleSignIn">
      <a-form-item>
        <a-input v-model:value="signInForm.username" placeholder="Username">
          <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="signInForm.password" type="password" placeholder="Password">
          <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
            type="primary"
            html-type="submit"
            :disabled="signInForm.username === '' || signInForm.password === ''"
        >
          Sign In
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import router from '../router'
import {signIn,signOut} from "../api/api.js";

export default {
  name: 'SignIn',
  data() {
    return {
      signInForm: {
        username: 'abc',
        password: '123456'
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
    handleSignIn() {
      signIn(this.signInForm).then(res => {
        if (res.code === '0000' || res.code === '0001') {
          this.$message.success("登入成功");
          router.push("/");
        }
      })
      //     .catch(error => {
      //   this.$message.error(error+'错了哦，这是一条错误消息');
      // })
    },
    handleSignOut() {
        signOut().then(res => {
          if (res.code === '0000') {
            this.$message.success("登出成功");
            router.push("/signIn");
          }
        })
    }
  }
}
</script>
