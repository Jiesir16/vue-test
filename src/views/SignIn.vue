<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="signInForm">
      <el-form-item label="用户名">
        <el-input v-model="signInForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="signInForm.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button v-on:click="signIn()">Sign In</el-button>
  </div>
</template>

<script>

import {signIn} from "@/api/api";
import router from "../router";

export default {
  name: 'SignIn',
  data() {
    return {
      labelPosition: 'right',
      signInForm: {
        username: 'abc',
        password: '123456'
      }
    }
  },
  methods: {
    signIn() {
      signIn(this.signInForm).then(res => {
        console.log(res) //返回参数
        if (res.code === '0000' || res.code === '0001') {
          this.$message({
            message: '登入成功',
            type: 'success'
          });
          router.push("/");
        }
      })
    }
  }
}
</script>
