<template>
  <el-container class="layout-container">
      <el-aside width="auto">
        <LayoutAside/>
      </el-aside>
      <el-container>
        <el-scrollbar ref="layoutScrollbarRef" class="layout-backtop">
          <el-header height="auto">
            <LayoutHeader/>
          </el-header>
          <el-main>
            <router-view v-slot="{ Component }">
              <transition name="slide-right" mode="out-in">
                <!-- <keep-alive v-if="route.meta.keepAlive"> -->
                  <component :is="Component"/>
                <!-- </keep-alive> -->
              </transition>
            </router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch, onMounted, nextTick, ref } from 'vue';
import { NextLoading } from '@/utils/loading';

// 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'));
const LayoutHeader = defineAsyncComponent(() => import('@/layout/component/header.vue'));

onMounted(() => {
  NextLoading.done(600);
})

</script>

<style scoped lang="scss">
.layout-container{
    height: 100%;
    width: 100%;
    .el-header {
      padding: 0 !important;
      // height: auto !important;
    }
    .layout-backtop {
      width: 100%;
    }
}

/* 页面切换动画
------------------------------- */
.slide-right-enter-active,
.slide-right-leave-active{
	will-change: transform;
	transition: all 0.6s ease;
}
// slide-right
.slide-right-enter-from {
	opacity: 0;
	transform: translateX(-20px);
}
.slide-right-leave-to {
	opacity: 0;
	transform: translateX(20px);
}
</style>
