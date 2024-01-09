<template>
    <div class="pages-imgLazy-container">
        <el-card shadow="hover">
            <div class="pages-imgLazy-header">
                图片懒加载演示(F12 切换到 Network Img下进行图片加载查看)
                <el-button type="primary" style="margin-left:10px" v-click-outside="onClickOutside" v-popover="popoverRef">提示</el-button>
                <el-popover
                    ref="popoverRef"
                    trigger="click"
                    title="Tips"
                    virtual-triggering
                    persistent
                >
                    <h4>vue实现图片懒加载的五种方式</h4>
                    <div class="pages-imgLazy-header-title"><span style="font-weight:600">方法一</span> lazyload插件（IntersectionObserve原理）</div>
                    <div class="pages-imgLazy-header-title"><span style="font-weight:600">方法二</span> IntersectionObserve()</div>
                    <div class="pages-imgLazy-header-title"><span style="font-weight:600">方法三</span> loading=“lazy”</div>
                    <div class="pages-imgLazy-header-title"><span style="font-weight:600">方法四</span> 滚动监听+scrollTop+offsetTop+innerHeight</div>
                    <div class="pages-imgLazy-header-title"><span style="font-weight:600">方法五</span> 滚动监听+getBoundingClientRect()</div>
                    <div class="pages-imgLazy-header-title">本系统采用方法二实现图片懒加载</div>
                    <div>具体链接:
                        <a href="https://blog.csdn.net/weixin_43913643/article/details/132975686" target="_blank" style="color:#ff9191">https://blog.csdn.net/weixin_43913643/article/details/132975686</a>
                    </div>
                </el-popover>
            </div>
            <div class="pages-imgLazy-main">
                <el-row :gutter="15">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(v, k) in state.tableData.data" :key="k">
                        <div class="pages-imgLazy-main-box">
                            <div class="pages-imgLazy-main-box-item">
                                <div class="item-image" v-loading="v.loading">
                                    <img :data-src="v.img"/>
                                </div>
                                <div class="item-txt">
                                    <div class="item-txt-title">{{v.title}}</div>
                                    <div class="item-txt-other">
                                        <span class="item-txt-other-price"><span style="font-size:14px">￥</span>{{v.price}}</span>
                                        <span class="item-txt-other-place">{{v.place}}</span>
                                    </div>
                                    <div class="item-txt-msg">
                                        <span >评价 {{v.evaluate}}</span>
                                        <span style="margin-left:10px">收藏 {{v.collection}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="imgLazy">
import { ref, reactive, unref, onMounted, nextTick } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { filterList } from './mock';

// 定义变量
const dialogVisible = ref(false)
const buttonRef = ref()
const popoverRef = ref()
const state = reactive({
    tableData:{
        data: filterList,
        loading: false
    }
})

// 打开提示框
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

// 图片懒加载
const ImgLazy = () => {
    let io = new IntersectionObserver((res) => {
        res.forEach((v: any) => {
            if(v.isIntersecting){
                let src = v.target.getAttribute("data-src")
                if(src) v.target.setAttribute("src",src)
                io.unobserve(v.target)
            }
        })
    })
    nextTick(() => {
        document.querySelectorAll('img').forEach((img) => io.observe(img))
    })
}

// 页面加载时
onMounted(() => {
    ImgLazy()
})

</script>

<style scoped lang="scss">
.pages-imgLazy-container {
    .pages-imgLazy-header {
        border-bottom: 1px solid var(--el-card-border-color);
        width: 100%;
        height: 56px;
        line-height: 56px;
        padding-left: 20px;
    }
    .pages-imgLazy-main {
        display: flex;
        flex-wrap: wrap;
        width: 96%;
        margin: auto;
        &-box {
            width: 100%;
            height: 400px;
            padding: 10px;
            &-item {
                width: 95%;
                height: 100%;
                border: 1px solid transparent;
                border-radius: 20px;
                &:hover {
                    cursor: pointer;
                    border: 1px solid rgb(238, 115, 94);
                }
                .item-image {
                    img {
                        width: 100%;
                        border-radius: 20px;
                    }
                }
                .item-txt {
                    padding: 0 10px;
                    &-title {
                        margin-top: 8px;
                        font-size: 15px;
                        font-weight: 700;
                        line-height: 21px;
                        word-break: break-all;
                        word-wrap: break-word;
                    }
                    &-other {
                        &-price {
                            color: #ff5000;
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 20px;
                        }
                        &-place {
                            color: #7a7a7a;
                            font-size: 14px;
                            margin-left: 15px;
                            line-height: 18px;
                        }
                    }
                    &-msg {
                        margin-top: 10px;
                        font-size: 12px;
                        color: #7a7a7a;
                    }
                }
            }
        }
    }
}
:deep(.el-card__body) {
    padding: 0;
}
.pages-imgLazy-header-title {
    padding-top: 10px;
}
</style>

<style>
.el-popover{
    min-width: 350px !important;
}
</style>