<template>
    <div class="layout-navBars-breadcrumb-index">
        <div class="layout-navBars-breadcrumb-main">
            <el-icon class="header-icon" @click="ChangeIsCollapse">
                <Fold v-if="!isCollapse"/>
                <Expand v-else/>
            </el-icon>
            <el-breadcrumb class="layout-navbars-breadcrumb">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item v-for="(v, k) in state.breadcrumbList" :key="v.path">
                        <span v-if="k === state.breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
                            <div >{{ v.meta.title }}</div>
                        </span>
                        <a v-else @click.prevent="onBreadcrumbClick(v)">
                            <div >{{ v.meta.title }}</div>
                        </a>
                    </el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
        <div class="layout-navBars-breadcrumb-user">
            <div class="layout-navBars-breadcrumb-user-icon" @click="onSearchClick">
                <el-icon>
                    <Search />
                </el-icon>
            </div>
            <div class="layout-navBars-breadcrumb-user-icon" ref="userNewsBadgeRef" @click="onUserNewsClick">
                <el-badge :is-dot="true">
                    <el-icon>
                        <Bell />
                    </el-icon>
                </el-badge>
            </div>
            <el-popover
                ref="userNewsRef"
                :virtual-ref="userNewsBadgeRef"
                placement="bottom"
                trigger="click"
                transition="el-zoom-in-top"
                virtual-triggering
                :width="100"
                :persistent="false"
            >
                <span>TS 好难啊 ！！！！</span>
            </el-popover>
            <div class="layout-navBars-breadcrumb-user-icon" @click="onScreenfullClick">
                <img src="@/assets/icon-fullscreen.svg" class="layout-navBars-breadcrumb-user-icon-full" v-if="!state.isScreenfull">
                <img src="@/assets/icon-stopfullscreen.svg" class="layout-navBars-breadcrumb-user-icon-full" v-else>
            </div>
            <el-dropdown @command="onHandleCommandClick">
                <span class="layout-navBars-breadcrumb-user-link">
                    <img src="@/assets/user-photo.png" class="layout-navBars-breadcrumb-user-link-photo">
                    <span>{{userInfos.userName}}</span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="/home">首页</el-dropdown-item>
                        <el-dropdown-item command="wareHouse">代码仓库</el-dropdown-item>
                        <el-dropdown-item command="/personal">个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="logOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <NarBarSearch ref="searchRef"/>
        </div>
    </div>
</template>

<script setup lang="ts" name="layoutBreadcrumbIndex">
import { reactive, computed, onMounted, ref, unref, defineAsyncComponent } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores/themeConfig';
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes';
import { useUserInfos } from '@/stores/userInfos';
import { dynamicRoutes } from '@/router/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import screenfull from 'screenfull';

//引入组件
const NarBarSearch = defineAsyncComponent(() => import('@/layout/navBars/search.vue'));

//定义变量
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const storesTagsViewRoutes = useTagsViewRoutes();
const storesUserInfos = useUserInfos();
const { userInfos } = storeToRefs(storesUserInfos);
const userNewsBadgeRef = ref();
const userNewsRef = ref();
const searchRef = ref();
const route = useRoute();
const router = useRouter();
const state = reactive({
    breadcrumbList:[] as Array<any>,
    routeSplit:[] as Array<string>,
    isScreenfull: false
})

// 设置显示/隐藏 logo
const isCollapse = computed(() => {
	return themeConfig.value.isCollapse;
});

//点击实现菜单栏展开/收起
const ChangeIsCollapse= () => {
    themeConfig.value.isCollapse = !themeConfig.value.isCollapse
}

//处理面包屑数据
const getBreadcrumbList = (arr: any) => {
    arr.forEach((item: RouteItem) => {
        let path = item.path.split("/").pop();
        state.routeSplit.forEach((v: string, k: number) => {
            if(path == v){
                let breadcrumb = {
                    path:item.path,
                    redirect:item?.redirect,
                    meta:item.meta
                } 
                state.breadcrumbList.push(breadcrumb)
                if(item.children) getBreadcrumbList(item.children)
            }
        })
    })
}

// 当前路由字符串切割成数组，并删除第一项空内容
const initRouteSplit = (path: string) => {
    state.breadcrumbList = [dynamicRoutes[0].children![0]];
    state.routeSplit = path.split("/");
    state.routeSplit.shift()
    let routerOptions = dynamicRoutes[0].children;
    getBreadcrumbList(routerOptions)
    if(path === '/home'){
        state.breadcrumbList.shift()
    }
}

// 面包屑点击
const onBreadcrumbClick = (v: RouteItem) =>{
    if(v.redirect){
        router.push(v.redirect)
    }else{
        router.push(v.path)
    }
}

// 菜单搜索点击
const onSearchClick = () => {
    searchRef.value.openSearch();
}

// 展开消息
const onUserNewsClick = () =>{
    unref(userNewsRef).popperRef?.delayHide?.();
}

// 点击全屏
const onScreenfullClick = () =>{
    if (!screenfull.isEnabled) {
		ElMessage.warning('暂不不支持全屏');
		return false;
	}
    screenfull.toggle();
	screenfull.on('change', () => {
		if (screenfull.isFullscreen) state.isScreenfull = true;
		else state.isScreenfull = false;
	});
}

// 点击用户下拉选项
const onHandleCommandClick = (path: string) =>{
    if(path == "logOut"){
        ElMessageBox.confirm(
            '此操作将退出登录, 是否继续?',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                sessionStorage.clear();
                router.push({name:'login'});
                storesTagsViewRoutes.closeAllTabMenu()
                storesUserInfos.cleanUserInfos()
            })
            .catch(() => {})
    }else if(path == "wareHouse"){
        console.log("wareHouse")
    }else{
        router.push(path)
    }
}

// 页面加载时
onMounted(() =>{
    initRouteSplit(route.path)
})
// 路由更新时
onBeforeRouteUpdate((to) => {
	initRouteSplit(to.path);
});

</script>

<style scoped lang="scss">
.layout-navBars-breadcrumb-index{
    height: 50px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-bottom: 1px solid #f1f2f3;
    display: flex;
    align-items: center;
    .layout-navBars-breadcrumb-main{
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        .header-icon{
            font-size: 18px;
            width: 40px;
            height: 100%;
            opacity: 0.8;
            color: #606266;
            &:hover{
                cursor: pointer;
            }
        }
    }
    .layout-navBars-breadcrumb-user {
        flex: 1;
        height: 100%;
        padding-right: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        &-icon {
            padding: 0 10px;
            cursor: pointer;
            color: #606266;
            &:hover{
                background-color: rgba(0, 0, 0, 0.04);
                i {
                    display: inline-block;
                    animation: logoAnimation 0.3s ease-in-out;
                }
            }
            &-full{
                width: 14px;
                height: 14px;
                color: #606266;
            }
        }
        &-link {
            display: flex;
            cursor: pointer;
            align-items: center;
            margin-left: 10px;
            &-photo {
                height: 30px;
                width: 30px;
                border-radius: 100%;
                margin-right: 5px;
            }
        }
    }
}
.example-showcase .el-dropdown-link {
  color: var(--el-color-primary);
}
.el-menu--vertical {
	background: #545c64;
}
/* Breadcrumb 面包屑过渡动画
------------------------------- */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
	transition: all 0.5s ease;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(20px);
}
.breadcrumb-leave-active {
	position: absolute;
	z-index: -1;
}
/* 左侧icon 过渡动画
------------------------------- */
@keyframes logoAnimation{
	0% {
		transform: scale(0);
	}

	80% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}
</style>