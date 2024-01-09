<template>
    <div class="layout-header">
		<BreadcrumbIndex />
		<TagsView/>
	</div>
</template>

<script setup lang="ts" name="layoutHeader">
import { defineAsyncComponent } from 'vue';
// 引入组件
const BreadcrumbIndex = defineAsyncComponent(() => import('@/layout/navBars/breadCrumbIndex.vue'));
const TagsView = defineAsyncComponent(() => import('@/layout/navBars/tagsView.vue'));

</script>

<style scoped lang="scss">
.layout-header{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
</style>