<template>
    <div class="feature-icon-container">
        <el-card header="图标选择器" shadow="hover" style="height:150px">
            <span style="margin-right:10px">图标</span>
            <el-input v-model="state.icon" placeholder="请选中菜单图标" clearable @focus="openPopover" ref="inputRef" @input="inputIcon" style="width:300px">
                <template #prepend>
                    <el-icon>
                        <component :is="state.icon"></component>
                    </el-icon>
                </template>
            </el-input>
            <el-popover ref="popoverRef" :virtual-ref="inputRef" trigger="click" virtual-triggering>
                <template #default>
                    <div class="icon-popover">
                        <div class="icon-popover-title">请选择图标</div>
                        <div class="icon-popover-lists">
                            <el-scrollbar ref="selectorScrollbarRef">
                                <el-row :gutter="10" v-if="state.iconList.length > 0">
                                    <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" v-for="(v, k) in state.iconList" :key="k" @click="onColClick(v)">
                                        <div class="icon-popover-lists-item">
                                            <el-icon>
                                                <component :is="v"></component>
                                            </el-icon>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-empty :image-size="100" v-if="state.iconList.length <= 0" :description="empty"></el-empty>
                            </el-scrollbar>
                        </div>
                    </div>
                </template>
            </el-popover>
            <el-button style="margin-left:20px" type="primary" @click="subimt">提交</el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="icon">
import { ref, reactive, unref, onMounted } from 'vue'
import { getData } from '@/main'
import { ElMessage } from 'element-plus'

// 定义变量
const inputRef = ref()
const popoverRef = ref()
const state = reactive({
    icon: "Search",
    iconList: [] as Array<string>,
})

// 提交
const subimt = () => {
    ElMessage({
        showClose: true,
        message: `您选择的图标为 ${state.icon}`,
        type: 'success',
    })
}

// 打开icon弹出框
const openPopover = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}

//手动输入icon时
const inputIcon = () => {
    state.iconList = getData();
    state.iconList = state.iconList.filter((item) => {
        return item.indexOf(state.icon) != -1
    })
}

// 选择icon
const onColClick = (v:string) => {
    state.icon = v;
}

// 页面加载时
onMounted(() => {
    state.iconList = getData();
})


</script>

<style scoped lang="scss">
.icon-popover{
    height: 200px;
    overflow: hidden;
    position: relative;
    &-title {
        height: 28px;
        line-height: 28px;
        padding-left: 10px;
        font-size: 14px;
        width: 100%;
        border-bottom: 1px solid rgb(175, 175, 175);
    }
    &-lists {
        .el-row {
            padding: 15px;
            margin: 0px !important;
        }
        margin-top: 10px;
        height: 150px;
        overflow: auto;
        &-item {
            height: 25px;
            width: 25px;
            border: 1px solid var(--el-border-color);
		    border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            &:hover{
                cursor: pointer;
                background-color: var(--el-color-primary-light-9);
			border: 1px solid var(--el-color-primary-light-5);
            }
        }
    }
}
</style>