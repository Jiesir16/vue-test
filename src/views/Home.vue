<template>
  <div class="home">
    <router-link tag="li" to="/login">
      <a>/login</a>
    </router-link>
  </div>
</template>

<script>

import {signIn} from "@/api/api";

export default {
  name: 'Home',
  data() {
    return {
      username: '123',
      password: 'qwe'
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
