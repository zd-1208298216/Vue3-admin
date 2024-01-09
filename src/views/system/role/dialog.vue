<template>
    <div class="system-role-dialog-container">
        <el-dialog v-model="state.dialog.isShowDialog" :title="state.dialog.title">
            <el-form :model="state.ruleForm" size="default" label-width="80px" ref="formRef">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="角色名称" prop="roleName">
                            <el-input v-model="state.ruleForm.roleName" clearable placeholder="请输入角色名称" :disabled="state.disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="角色状态" prop="roleStatus">
                            <el-switch
                                v-model="state.ruleForm.roleStatus"
                                inline-prompt
                                active-text="启"
                                inactive-text="禁"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                         <el-form-item label="角色描述" prop="describe">
                            <el-input v-model="state.ruleForm.describe" clearable placeholder="请输入角色描述" type="textarea" maxlength="150"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="菜单权限" prop="menuProps">
							<el-tree :data="state.menuData" :props="state.ruleForm.menuProps" show-checkbox @check="handleCheckChange"  node-key="id" :default-checked-keys="state.ruleForm.menuProps"/>
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

<script setup lang="ts" name="roleDialog">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { dynamicRoutes } from '@/router/index';
import { ElMessage } from 'element-plus'
import { status } from 'nprogress';

const emit = defineEmits(['refresh'])

// 定义变量
const formRef = ref()
const state = reactive({
    dialog:{
        isShowDialog:false,
        title:"新增角色",
        subTitle:"新增"
    },
    disabled:false,
    ruleForm:{
        roleName:"",
        roleStatus:true,
        describe:"",
        menuProps: [] as Array<any>,
    },
    menuData:[] as TreeType[]
})

// 菜单权限修改时
const handleCheckChange = (
  data: any,
  checked: any,
) => {
  state.ruleForm.menuProps = [];
  checked.checkedNodes.forEach((item: TreeType) => {
      let obj  = {
          id: item.id,
          label: item.label
      }
      state.ruleForm.menuProps.push(obj);
  })
  checked.halfCheckedNodes.forEach((item: TreeType) => {
      let obj  = {
          id: item.id,
          label: item.label
      }
      state.ruleForm.menuProps.push(obj);
  })
}

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};

// 打开弹窗
const openDialog = (row?: RoleTable) => {
    state.dialog.isShowDialog = true
    nextTick(() => {
        if(row){
            state.dialog.title = "修改角色"
            state.dialog.subTitle = "修改"
            state.disabled = true
            state.ruleForm.roleName = row.roleName
            state.ruleForm.menuProps = row.menuLists
            state.ruleForm.describe = row.roleDes as string
            state.ruleForm.roleStatus = row.status == 1
        }else{
            state.dialog.title = "新增角色"
            state.dialog.subTitle = "新增"
            state.disabled = false
            formRef.value?.resetFields()
        }
        // 重置菜单树形列表
        state.menuData =  getMenuData(dynamicRoutes[0].children,0)
    })
}

// 获取上级菜单列表数据
const getMenuData = (routeData:any,id: number) => {
    let arr = [] as Array<any>
    let obj = {} as TreeType
    routeData.forEach((item: RouteItem) => {
        obj["id"] = item.name!
        obj["label"] = item.meta?.title as string
        if(item.children){
            obj["children"] = getMenuData(item.children,id)
        }
        arr.push({...obj})
    });
    return arr;
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
        message: `角色${state.dialog.subTitle}成功`,
        type: 'success',
    })
    emit("refresh")
}

// 页面加载
onMounted(() => {
    state.menuData =  getMenuData(dynamicRoutes[0].children,0)
})

//暴露变量
defineExpose({
    openDialog,
})

</script>

<style scoped lang="scss">

</style>