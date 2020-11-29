<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-form>
      <el-input v-model="username" placeholder="请输2入内容"/>
      <el-input v-model="password" placeholder="请输入内容"/>
      <el-button v-on:click="login()">login</el-button>
    </el-form>

  </div>
</template>

<script>

import {signIn} from "@/api/api";

export default {
  name: 'Home',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      signIn({
        username:this.username,
        password:this.password//请求参数
      }).then(res => {
        console.log(res,res.data) //返回参数
      })
    }
  }
}
</script>
