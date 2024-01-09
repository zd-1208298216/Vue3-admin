<template>
    <div class="system-menu-container">
        <el-card shadow="hover" style="width:100%;height:575px">
            <div class="system-menu-form">
                <el-input
                    size="default"
                    v-model="state.menuName"
                    style="max-width:180px"
                    placeholder="请输入菜单名称"
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
                    新增菜单
                </el-button>
            </div>
            <div class="system-menu-table">
                <el-table
                    :data="state.tableData"
                    style="width: 100%"
                    size="large"
                    row-key="path"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                    v-loading="state.loading"
                >
                    <el-table-column label="菜单名称" show-overflow-tooltip>
                        <template #default="scope">
                            <el-icon>
                                <component :is="scope.row.meta.icon"></component>
                            </el-icon>
                            <span style="marginLeft:10px">{{ scope.row.meta.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="path" label="路由路径" show-overflow-tooltip></el-table-column>
                    <el-table-column label="组件路径" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.component }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="权限标识" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.meta.roles }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="排序" show-overflow-tooltip width="80">
                        <template #default="scope">
                            {{ scope.$index }}
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" show-overflow-tooltip width="80">
                        <template #default="scope">
                            <el-tag type="success" size="small">{{ scope.row.xx }}菜单</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip width="140">
                        <template #default="scope">
                            <el-button size="small" text type="primary" @click="editMenuData(scope.row)">修改</el-button>
                            <el-button size="small" text type="primary" @click="delMenuData(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <MenuDialog ref="menuDialogRef" @refresh="getTableData" />
    </div>
</template>


<script setup lang="ts" name="menu">
import { ref, reactive, onMounted, defineAsyncComponent } from "vue"
import { useRouter,RouteRecordRaw } from 'vue-router';
import { dynamicRoutes } from '@/router/index';
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const MenuDialog = defineAsyncComponent(() => import('@/views/system/menu/dialog.vue'))

// 定义变量名称
const menuDialogRef = ref();
const state = reactive({
    menuName:"",
    loading:false,
    tableData:[] as Array<RouteRecordRaw>
})
const router = useRouter()

// 处理路由数据，给父级路由添加component属性
const dealTableData = (routeData:any) => {
    const arr = [] as Array<any>;
    if(state.menuName == ""){
         routeData.forEach((item:RouteItem) => {
            if(item.children) {
                item.component = item.children![0].component;
                dealTableData(item.children)
            }
            arr.push({...item})
        })
    }else{
        routeData.forEach((item:RouteItem) => {
            if((item.meta as any).title.indexOf(state.menuName) != -1){
                arr.push({...item})
            }else if(item.children){
                dealTableData(item.children)
            }
        })
    }
    return arr
}

// 获取路由数据
const getTableData = () => {
    state.loading = true
    state.tableData = dealTableData(dynamicRoutes[0].children)
    setTimeout(() => {
		state.loading = false;
	}, 500);
}

// 新增菜单
const addMenuDialog = () => {
    menuDialogRef.value.openDialog()
}

// 删除菜单
const delMenuData = (row: RouteItem) => {
    ElMessageBox.confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
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

// 修改菜单
const editMenuData = (row: RouteItem) => {
    menuDialogRef.value.openDialog(row)
}

onMounted(() => {
    getTableData()
})


</script>

<style scoped lang="scss">
.system-menu-form{
    margin-bottom: 10px;
}
</style>