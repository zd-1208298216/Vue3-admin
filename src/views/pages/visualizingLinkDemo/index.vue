<template>
    <div class="pages-visualizing-container">
        <el-card shadow="hover" class="visualizing-card">
            <div class="visualizing-main">
                <img :src="earchIcon" class="visualizing-main-icon"/>
                <div class="visualizing-main-msg">页面"{{ state.title }}"已在新窗口打开</div>
                <el-button round size="default" @click="GoToFullPage">
                    <span>立即前往体验</span>
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="visualizingLinkIndex">
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import earchIcon from '@/assets/earth-icon.svg';

// 定义变量
const route = useRoute();
const state = reactive({
    title:"",
    isLink:""
})

// 跳转至新页面
const GoToFullPage = () => {
    const { origin, pathname } = window.location;
	window.open(`${origin}${pathname}#${state.isLink}`);
}

watch(
    () => route.path,
    () => {
        state.title = <string>route.meta.title;
		state.isLink = <string>route.meta.isLink;
    },
    {
        immediate:true
    }
)

</script>

<style scoped lang="scss">
.pages-visualizing-container {
    .visualizing-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 575px;
        .visualizing-main {
            display: flex;
            flex-direction: column;
            align-items: center;
            .visualizing-main-icon {
                width: 150px;
                height: 150px;
            }
            .visualizing-main-msg {
                font-size: 12px;
                color: var(--next-bg-topBarColor);
                opacity: 0.7;
                margin-bottom: 15px;
            }
        }
    }
}
</style>