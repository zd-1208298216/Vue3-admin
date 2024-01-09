<template>
    <div class="layout-aside">
        <el-scrollbar height="100%">
            <!-- <div class="layout-aside-header" @click="ChangeIsCollapse">{{isCollapse ? `后台` : `通用后台管理系统`}}</div> -->
            <div class="layout-aside-header" v-if="!isCollapse" @click="ChangeIsCollapse">
                <span>通用后台管理系统</span>
            </div>
            <div class="layout-aside-header" v-else @click="ChangeIsCollapse">
                <span>后台</span>
            </div>
            <el-menu
                active-text-color="#409eff"
                text-color="#fff"
                :default-active="state.defaultActive"
                background-color="transparent"
                :collapse="isCollapse"
                :collapse-transition="true"
                router
            >
                <template v-for="val in routesList[0].children">
                    <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
                        <template #title>
                            <el-icon size="small">
                                <component :is="val.meta.icon"></component>
                            </el-icon>
                            <span>{{ val.meta.title }}</span>
                        </template>
                        <SubItem :chil="val.children" />
                    </el-sub-menu>
                    <template v-else>
                        <el-menu-item :index="val.path" :key="val.path">
                            <el-icon size="small">
                                <component :is="val.meta.icon"></component>
                            </el-icon>
                            <span>{{ val.meta.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts" name="layoutAside">
import { defineAsyncComponent, reactive, computed, ref, watch } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '@/stores/routesList';
import { useThemeConfig } from '@/stores/themeConfig';
import { tr } from 'element-plus/es/locale';

// 引入组件
const SubItem = defineAsyncComponent(() => import('@/layout/component/subItem.vue'));

//定义变量
const storesThemeConfig = useThemeConfig();
const storeRoutesList = useRoutesList();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { routesList } = storeToRefs(storeRoutesList);
const route = useRoute();
const router = useRouter();
const state = reactive({
    defaultActive:route.path,
})

// 设置显示/隐藏 logo
const isCollapse = computed(() => {
	return themeConfig.value.isCollapse;
});

//点击实现菜单栏展开/收起
const ChangeIsCollapse= ()=>{
    themeConfig.value.isCollapse = !themeConfig.value.isCollapse
}

//监听路由变化，页面切换时，左侧菜单栏高亮变化
watch(
    () => route.path,
    (val) => {
        state.defaultActive = val
    },
    {
        deep: true
    }
)

</script>

<style scoped lang="scss">
.layout-aside{
    height: 100%;
    background-color: #545c64;
    color: white !important;
    .layout-aside-header{
        text-align: center;
        margin: 20px 0 20px 0;
        font-size: 16px;
        font-weight: 400;
        box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
        animation: logoAnimation 0.5s ease-in-out;
    }
    &:hover{
        cursor: pointer;
    }
    .el-menu{
        border-right: none !important;
    }
    .el-menu--vertical:not(.el-menu--collapse){
        width: 200px;
        min-height: 400px;
    }
    .el-menu-item.is-active{
       background-color: rgba(0, 0, 0, 0.2);
    }
}

@keyframes logoAnimation {
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