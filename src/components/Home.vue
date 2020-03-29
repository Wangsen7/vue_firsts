<template>
    <el-button type="info" @click="logout">退出</el-button>
</template>

<script>
export default {
  methods: {
    logout () {
    // 清除token
      window.sessionStorage.clear()
      // 重定向到 login 页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="lesss" scoped>

</style>
