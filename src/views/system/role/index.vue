<template>
    <div class="system-role-container">
        <el-card shadow="hover" style="width:100%;height:575px">
            <div class="system-role-form">
                <el-input
                    size="default"
                    v-model="state.tableData.searchName"
                    style="max-width:180px"
                    placeholder="请输入角色名称"
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
                    新增角色
                </el-button>
            </div>
            <div class="system-role-table">
                <el-table
                    :data="state.tableData.data"
                    style="width: 100%"
                    size="large"
                    row-key="roleId"
                    v-loading="state.tableData.loading"
                    height="440px"
                >
                    <el-table-column type="index" width="80" label="序号"/>
                    <el-table-column prop="roleId" label="角色ID" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="status" label="角色状态" show-overflow-tooltip>
                        <template #default="scope">
                            <el-tag type="success" v-if="scope.row.status">启用</el-tag>
                            <el-tag type="info" v-else>禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="roleDes" label="角色描述" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="140">
                        <template #default="scope">
                            <el-button size="small" text type="primary" @click="editRoleData(scope.row)" :disabled="scope.row.roleDes == '超级管理员'">修改</el-button>
                            <el-button size="small" text type="primary" @click="delRoleData(scope.row)" :disabled="scope.row.roleDes == '超级管理员'">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="system-role-pagination">
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
        <RoleDialog ref="roleDialogRef" @refresh="getTableData" />
    </div>
</template>


<script setup lang="ts" name="role">
import { ref, reactive, onMounted, defineAsyncComponent } from "vue"
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const RoleDialog = defineAsyncComponent(() => import('@/views/system/role/dialog.vue'))

// 定义变量
const roleDialogRef = ref();
const state = reactive({
    tableData:{
        searchName:"",
        data:[] as Array<RoleTable>,
        loading:false,
        total: 0,
        param:{
            pageNum: 1,
			pageSize: 10,
        }
    }
})

// 修改用户
const editRoleData = (row: RoleTable) => {
    roleDialogRef.value.openDialog(row)
}

// 新增用户
const addMenuDialog = () => {
    roleDialogRef.value.openDialog()
}

// 获取表格数据
const getTableData = () => {
    state.tableData.loading = true;
    let data = [
        {
            roleId: "1c2d3rafg",
            roleName: "admin",
            status: 1,
            roleDes: "超级管理员",
            createTime: new Date().toLocaleString(),
            menuLists:["home","system","systemMenu","systemMenu","systemUser","systemDept","feature","FeatureIcon","pages","PagesImgLazy"]
        },
        {
            roleId: "5k9h0oplg",
            roleName: "ahhh",
            status: 1,
            roleDes: "普通用户",
            createTime: new Date().toLocaleString(),
            menuLists:["home","feature","FeatureIcon","pages","PagesImgLazy"]
        }
    ]
    data = data.filter(item => item.roleName.indexOf(state.tableData.searchName) != -1)
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
const delRoleData = (row: RoleTable) => {
    ElMessageBox.confirm(`此操作将永久删除角色：${row.roleName}, 是否继续?`, '提示', {
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
.system-role-container {
    .system-role-table {
        margin-top: 20px;
        border-bottom: 1px solid #e4e7ed;
        margin-bottom: 15px;
    }
}
</style>