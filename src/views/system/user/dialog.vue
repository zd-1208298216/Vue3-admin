<template>
    <div class="system-user-dialog-container">
        <el-dialog v-model="state.dialog.isShowDialog" :title="state.dialog.title">
            <el-form :model="state.ruleForm" size="default" label-width="80px" ref="formRef">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="用户名称" prop="userName">
                            <el-input v-model="state.ruleForm.userName" clearable placeholder="请输入用户名称" :disabled="state.disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="用户昵称" prop="userNick">
                            <el-input v-model="state.ruleForm.userNick" clearable placeholder="请输入用户昵称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="关联角色" prop="userToRole">
                            <el-select v-model="state.ruleForm.userToRole" style="width:100%" placeholder="请选择关联角色">
                                <el-option
                                    v-for="item in state.userOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="联系方式" prop="userPhone">
                            <el-input v-model="state.ruleForm.userPhone" clearable placeholder="请输入用户联系方式"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="用户状态" prop="userStatus">
                            <el-switch
                                v-model="state.ruleForm.userStatus"
                                inline-prompt
                                active-text="启"
                                inactive-text="禁"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                         <el-form-item label="用户描述" prop="describe">
                            <el-input v-model="state.ruleForm.describe" clearable placeholder="请输入用户描述" type="textarea" maxlength="150"></el-input>
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

<script setup lang="ts" name="userDialog">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['refresh'])

// 定义变量
const formRef = ref()
const state = reactive({
    dialog:{
        isShowDialog:false,
        title:"新增用户",
        subTitle:"新增"
    },
    disabled:false,
    ruleForm:{
        userName:"",
        userNick:"",
        userToRole:"",
        userPhone:"",
        userStatus:true,
        describe:"",
    },
    userOptions:[
        {
            value: "admin",
            label: "admin"
        },
        {
            value: "ahhh",
            label: "ahhh"
        }
    ]
})

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};

// 打开弹窗
const openDialog = (row?: UserTable) => {
    state.dialog.isShowDialog = true
    nextTick(() => {
        if(row){
            state.dialog.title = "修改用户"
            state.dialog.subTitle = "修改"
            state.disabled = true
            state.ruleForm.userName = row.userName
            state.ruleForm.userNick = row.userNick
            state.ruleForm.userPhone = row.userPhone
            state.ruleForm.describe = row.userDes
            state.ruleForm.userToRole = row.userToRole
            state.ruleForm.userStatus = row.status
        }else{
            state.dialog.title = "新增用户"
            state.dialog.subTitle = "新增"
            formRef.value?.resetFields()
        }
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
        message: `用户${state.dialog.subTitle}成功`,
        type: 'success',
    })
    emit("refresh")
}

// 页面加载
onMounted(() => {
    
})

//暴露变量
defineExpose({
    openDialog,
})

</script>

<style scoped lang="scss">

</style>