<template>
    <el-container>
        <!--侧栏-->
        <el-aside width="200px" style="height:1940px;overflow:hidden;"  >
            <el-col :span="24">
                <div class="logo">admin</div>
            </el-col>
            <el-row class="tac h100" >
                <el-col :span="24" class="h100">
                    <el-menu default-active="2"  class="el-menu-vertical-demo h100" @open="handleOpen" @close="handleClose" background-color="#312f2f" text-color="#fff" active-text-color="#ffd04b">
                        <!-- <el-submenu index="1" style="display:none;">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>订单申报</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu> -->
                        <router-link to="/goods">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">商品采购</span>
                        </el-menu-item>
                        </router-link>
                        <router-link to="/order">
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                            <span slot="title">订单申报</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/home">
                        <el-menu-item index="3" >
                            <i class="el-icon-document"></i>
                            <span slot="title">商品备案</span>
                        </el-menu-item>
                        </router-link>
                       
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-container>
            <!--头部模块-->
            <el-header class="header">
                <el-col :span="1">
                    <el-button type="text" class="userInfo">您好</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="text" class="userInfo">登出</el-button>
                </el-col>
            </el-header>
                <router-view />
        </el-container>
    </el-container>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>


<style scoped>
.h100{
    height: 100%;
}
.header {
    height: 60px;
    line-height: 60px;
    background: #312f2f;
    color: #fff;
}
.logo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    text-align: center;
    background: #312f2f;
    color: #fff;
}
.userInfo {
    color: #fff;
}
</style>
