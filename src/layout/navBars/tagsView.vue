<template>
    <div class="layout-navBars-tagsview">
        <el-scrollbar ref="scrollbarRef" style="height:auto">
            <el-tag
                v-for="tag in tagsViewRoutes"
                :key="tag.name"
                :closable="tag.name != 'home'"
                @click="changetagMenu(tag)"
                @close="handleClose(tag)"
                :color="tag.active ?  '#ebf5ff' : '#ffffff'"
            >
                {{ tag.meta.title }}
            </el-tag>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes';

const route = useRoute();
const router = useRouter();
const storesTagsViewRoutes = useTagsViewRoutes();
const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes);

//点击标签页
const changetagMenu = (tag: TagsViewRoutesState) => {
    if(tag.name !== route.name){
        storesTagsViewRoutes.changeTabMenu(tag);
        router.push(tag.path!)
    }
}
//删除标签页
const handleClose = (tag: TagsViewRoutesState) => {
    let tabMenu = JSON.parse(sessionStorage.getItem("tabMenu")!)
    storesTagsViewRoutes.closeTabMenu(tag);
    if(tag.name == route.name){
        let index = tabMenu.findIndex((item :TagsViewRoutesState)=> {
            return item.name == tag.name
        })
        let tagMenu = index == tabMenu.length-1 ? tagsViewRoutes.value[tagsViewRoutes.value.length-1] : tagsViewRoutes.value[index]
        storesTagsViewRoutes.changeTabMenu(tagMenu);
        router.push(tagMenu.path!)
    }
}

</script>

<style scoped lang="scss">
.layout-navBars-tagsview{
    background-color: #ffffff;
    border-bottom: 1px solid #f1f2f3;
    position: relative;
    height: 34px;
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
    .el-tag{
        margin-left: 5px;
        height: 28px;
        background-color: #ffffff;
        &:hover{
            background-color: #ebf5ff;
            cursor: pointer;
        }
    }
}
</style>