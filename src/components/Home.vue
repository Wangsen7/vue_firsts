<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt />
        <span>电商管理后台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 页面左边栏 这里实现了菜单栏 宽度的可变 根据isCollapase 变化-->
      <el-aside :width ="isCollapase ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 左侧导航菜单 -->
        <!-- unique-opend 保持一个菜单打开 collapse 实现左边栏的折叠 collapse-transition折叠动画-->
        <!-- router 开启路由模式 -->
        <el-menu background-color="#333744" text-color="#fff"
        active-text-color="#409EFF" :unique-opened='true' :collapse="isCollapase"
        :collapse-transition="false" :router="true" :default-active="activePath">
          <!-- 一级菜单 -->
          <!-- 这里需要给一级菜单一个可变的index 保证每个一级菜单的独立性，同时index值必须是字符串-->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index=" '/'+ subitem.path" v-for="subitem in item.children"
            :key="subitem.id" @click ="saveNavState('/'+subitem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- min区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapase: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    // 创建生命周期函数，调用MenuList获取所有左菜单
    this.grtMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      // 清除token
      window.sessionStorage.clear()
      // 重定向到 login 页面
      this.$router.push('/login')
    },
    // 获取所有左菜单
    async grtMenuList() {
      const { data: res } = await this.$http.get('menus')
      // 给menulist赋值
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮，切换菜单的折叠展开
    toggleCollapse() {
      this.isCollapase = !this.isCollapase
    },
    // 保存连接的激活状态 左边菜单栏选中
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex; //flex布局
  justify-content: space-between; //左右贴边对齐
  padding-left: 0;
  align-items: center; //居中
  color: #fff; //文本设置颜色
  font-size: 20px;
  > div {
    //嵌套
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right:10px;
}
.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  color: white;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;// 文本的间距
  cursor: pointer;// 鼠标放上去小手
}
</style>
