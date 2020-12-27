<template>
  <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="pageData"
  >
    <template #name="{ text }"> {{text}} </template>
  </a-table>
</template>

<script>
import {getUserList} from "@/api/api";
import {message} from "ant-design-vue";

export default {
  name: "list",
  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: "id"
        },
        {
          title: '用户名',
          dataIndex: "userName"
        },
        {
          title: 'EMAIL',
          dataIndex: "userEmail"
        },
        {
          title: '状态',
          dataIndex: "userStatus",
          customRender:function ({text, record, index}) {
            console.log(text,record,index)
            if(text === true){
              return "正常";
            }else if(text === false){
              return "禁用";
            }else{
              return text;
            }}
        },
        {
          title: '备注',
          dataIndex: "remark"
        }
      ],
      pageData: [],
      pageNum: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.handleSignIn()
  },
  methods: {
    async handleSignIn() {
      await setTimeout(() => {
        const param = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        getUserList(param).then((data) => {
          message.success("获取成功")
          this.pageData = data.data.pageData;
        }).catch(() => {
          this.submitting = false;
        });
      },1000)
    },
  }
}
</script>

<style scoped>

</style>