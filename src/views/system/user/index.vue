<template>
    <div class="system-user-container">
        <el-card shadow="hover" style="width:100%;height:575px">
            <div class="system-user-form">
                <el-input
                    size="default"
                    v-model="state.tableData.searchName"
                    style="max-width:180px"
                    placeholder="请输入用户名称"
                >
                    <template #prefix>
                        <el-icon><search /></el-icon>
                    </template>
                </el-input>
                <el-button type="primary" size="default" style="marginLeft:10px" @click="getTableData">
                    <el-icon style="marginRight:5px"><search /></el-icon>
                    查询
                </el-button>
                <el-button type="success" size="default" @click="addMenuDialog">
                    <el-icon style="marginRight:5px"><folderAdd /></el-icon>
                    新增用户
                </el-button>
            </div>
            <div class="system-user-table">
                <el-table
                    :data="state.tableData.data"
                    style="width: 100%"
                    size="large"
                    row-key="userId"
                    v-loading="state.tableData.loading"
                    height="440px"
                >
                    <el-table-column type="index" width="80" label="序号"/>
                    <el-table-column prop="userId" label="用户ID" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userName" label="用户名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userNick" label="用户昵称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userToRole" label="关联角色" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userPhone" label="联系方式" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="status" label="用户状态" show-overflow-tooltip>
                        <template #default="scope">
                            <el-tag type="success" v-if="scope.row.status">启用</el-tag>
                            <el-tag type="info" v-else>禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userDes" label="用户描述" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="140">
                        <template #default="scope">
                            <el-button size="small" text type="primary" @click="editUserData(scope.row)" :disabled="scope.row.userDes == '管理员'">修改</el-button>
                            <el-button size="small" text type="primary" @click="delUserData(scope.row)" :disabled="scope.row.userDes == '管理员'">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="system-user-pagination">
                <el-pagination
                    :current-page="state.tableData.param.pageNum"
                    :page-size="state.tableData.param.pageSize"
                    :page-sizes="[10, 20, 30, 50]"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="state.tableData.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </el-card>
        <UserDialog ref="userDialogRef" @refresh="getTableData" />
    </div>
</template>


<script setup lang="ts" name="user">
import { ref, reactive, onMounted, defineAsyncComponent } from "vue"
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const UserDialog = defineAsyncComponent(() => import('@/views/system/user/dialog.vue'))

// 定义变量
const userDialogRef = ref();
const state = reactive({
    tableData:{
        searchName:"",
        data:[] as Array<UserTable>,
        loading:false,
        total: 0,
        param:{
            pageNum: 1,
			pageSize: 10,
        }
    }
})

// 修改用户
const editUserData = (row: UserTable) => {
    userDialogRef.value.openDialog(row)
}

// 新增用户
const addMenuDialog = () => {
    userDialogRef.value.openDialog()
}

// 获取表格数据
const getTableData = () => {
    state.tableData.loading = true;
    let data = [];
    for(let i=0;i<20;i++){
        data.push({
            userId: "1ef5h56"+i,
            userName: i == 0 ? "admin" : "ahhh"+i,
            userNick: i == 0 ? "俺是管理员" : "俺是普通用户",
            userToRole: i == 0 ? "admin" : "ahhh",
            userPhone: "18888888888",
            status: true,
            userDes: i == 0 ? "管理员" : "普通用户",
            createTime: new Date().toLocaleString()
        })
    }
    data = data.filter(item => item.userName.indexOf(state.tableData.searchName) != -1)
    state.tableData.total = data.length
    // 分页，真实环境获取后端数据
    state.tableData.data = data.slice(
        (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize,
        state.tableData.param.pageNum * state.tableData.param.pageSize
    )
    setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
}

// 每页数量修改
const handleSizeChange = (val: number) => {
    state.tableData.param.pageSize = val
    getTableData()
}

// 页码值修改
const handleCurrentChange = (val: number) => {
    state.tableData.param.pageNum = val
    getTableData()
}

// 删除角色
const delUserData = (row: UserTable) => {
    ElMessageBox.confirm(`此操作将永久删除用户：${row.userName}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
    .then(() => {
        ElMessage.success('删除成功');
        getTableData();
    })
    .catch(() => {});
}

// 页面加载
onMounted(() => {
    getTableData()
})

</script>

<style scoped lang="scss">
.system-user-container {
    .system-user-table {
        margin-top: 20px;
        border-bottom: 1px solid #e4e7ed;
        margin-bottom: 15px;
    }
}
</style>