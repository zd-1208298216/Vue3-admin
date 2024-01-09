<template>
    <div class="system-menu-dialog-container">
        <el-dialog v-model="state.dialog.isShowDialog" :title="state.dialog.title">
            <el-form :model="state.ruleForm" size="default" label-width="80px" ref="formRef">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="上级菜单" prop="menuSuperior">
                            <el-cascader
                                :options="state.menuData"
                                placeholder="请选择上级菜单"
								clearable
                                style="width:100%"
                                :props="{ checkStrictly: true, value: 'path', label: 'title' }"
                                v-model="state.ruleForm.menuSuperior"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="菜单名称" prop="title">
                            <el-input v-model="state.ruleForm.title" clearable placeholder="请输入菜单名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="路由名称" prop="name">
                            <el-input v-model="state.ruleForm.name" clearable placeholder="请输入路由名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="路由路径" prop="path">
                            <el-input v-model="state.ruleForm.path" clearable placeholder="请输入路由路径"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="组件路径" prop="component">
                            <el-input v-model="state.ruleForm.component" placeholder="请输入组件路径" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="重定向" prop="redirect">
                            <el-input v-model="state.ruleForm.redirect" placeholder="请输入路由重定向" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="菜单图标" prop="icon">
                            <el-input v-model="state.ruleForm.icon" placeholder="请选择菜单图标" clearable @focus="openPopover" ref="inputRef" @input="inputIcon">
                                <template #prepend>
                                    <el-icon v-if="state.ruleForm.icon">
                                        <component :is="state.ruleForm.icon"></component>
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
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
                    </el-col>
                     <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="权限标识" prop="roles">
                            <el-select
                                v-model="state.ruleForm.roles"
                                multiple
                                placeholder="请选择用户权限"
                                style="width:100%"
                            >
                                <el-option label="admin" value="admin"></el-option>
								<el-option label="common" value="common"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">
                    {{state.dialog.subTitle}}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="menu">
import { ref, reactive, onMounted, unref, nextTick  } from 'vue';
import { dynamicRoutes } from '@/router/index';
import { getData } from '@/main'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['refresh'])

// 定义变量
const formRef = ref()
const inputRef = ref()
const popoverRef = ref()
const state = reactive({
    dialog:{
        isShowDialog:false,
        title:"新增菜单",
        subTitle:"新增"
    },
    ruleForm:{
        menuSuperior:[] as Array<string>,
        title:"",
        name:"",
        path:"",
        component:"",
        redirect:"",
        icon:"",
        roles:[]
    },
    menuData:[] as RouteItems,//上级菜单数据
    iconAllList :[] as Array<string>,
    iconList :[] as Array<string>
})

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};

// 打开icon弹出框
const openPopover = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}

// 打开弹窗
const openDialog = (row?: RouteItem) => {
    state.dialog.isShowDialog = true
    nextTick(() => {
        if(row){
            state.dialog.title = "修改菜单"
            state.dialog.subTitle = "修改"
            state.ruleForm.menuSuperior = getSupMenu(row);
            state.ruleForm.title  = row.meta?.title as string
            state.ruleForm.name = row.name as string
            state.ruleForm.path = row.path as string
            state.ruleForm.component = row.component as string || ""
            state.ruleForm.redirect = row.redirect as string || ""
            state.ruleForm.icon = row.meta?.icon as string
            state.ruleForm.roles = row.meta?.roles
        }else{
            state.dialog.title = "新增菜单"
            state.dialog.subTitle = "新增"
            formRef.value?.resetFields()
        }
    })
}

// 上级菜单赋值
const getSupMenu = (row: RouteItem) =>{
    let supMenu = [] as Array<any>
    let pathArr = row.path.split("/")
    pathArr.shift()
    for(let i=0;i<pathArr.length;i++){
        if(i !== pathArr.length-1){
            // 判断supMenu是否有值，有值取最后一个值与path相加，具体配置如['/system', '/system/role']
            supMenu.push(supMenu.length ? supMenu[supMenu.length-1]+"/"+pathArr[i] : "/"+pathArr[i])
        }
    }
    return supMenu as Array<string>
}

// 选择icon
const onColClick = (v:string) => {
    state.ruleForm.icon = v;
}

// 获取上级菜单列表数据
const getMenuData = (routeData:any) => {
    const arr = [] as Array<any>;
    routeData?.forEach((val: RouteItem) => {
		val['title'] = (val.meta?.title as string);
        arr.push({...val})
		if (val.children) getMenuData(val.children);
	});
    return arr;
}

//手动输入icon时
const inputIcon = () => {
    state.iconList = state.iconAllList;
    state.iconList = state.iconList.filter((item) => {
        return item.indexOf(state.ruleForm.icon) != -1
    })
}

// 取消
const onCancel = () => {
    closeDialog()
}

// 提交
const onSubmit = () =>{
    closeDialog()
    // 真实环境，此处应该接入后端
    ElMessage({
        message: `菜单${state.dialog.subTitle}成功`,
        type: 'success',
    })
    emit("refresh")
}

onMounted(() => {
    state.menuData = getMenuData(dynamicRoutes[0].children)
    state.iconList = getData();
    state.iconAllList = getData();
})

//暴露变量
defineExpose({
    openDialog,
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