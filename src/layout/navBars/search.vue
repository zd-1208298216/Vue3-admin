<template>
	<div class="layout-search-dialog">
		<el-dialog v-model="state.isShowSearch" destroy-on-close :show-close="false">
			<template #footer>
				<el-autocomplete
					v-model="state.menuQuery"
					:fetch-suggestions="menuSearch"
					placeholder="菜单搜索：支持中文、路由路径"
					ref="layoutMenuAutocompleteRef"
					@select="onHandleSelect"
					:fit-input-width="true"
				>
					<template #prefix>
                        <el-icon><Search /></el-icon>
					</template>
					<template #default="{ item }">
                        <div>
                            <el-icon size="small">
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            {{ item.meta.title }}
                        </div>
					</template>
				</el-autocomplete>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="layoutBreadcrumbSearch">
import { reactive, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { routerOneDimen } from '@/router/index';

// 定义变量内容
const layoutMenuAutocompleteRef = ref();
const router = useRouter();
const state = reactive({
	isShowSearch: false,
	menuQuery: '',
	tagsViewList: [] as Array<any>,
});

// 搜索弹窗打开
const openSearch = () => {
	state.menuQuery = '';
	state.isShowSearch = true;
	initTageView();
	nextTick(() => {
		setTimeout(() => {
			layoutMenuAutocompleteRef.value.focus();
		});
	});
};
// 搜索弹窗关闭
const closeSearch = () => {
	state.isShowSearch = false;
};
// 菜单搜索数据过滤
const menuSearch = (queryString: string, cb: Function) => {
	let results = queryString ? state.tagsViewList.filter(createFilter(queryString)) : state.tagsViewList;
	cb(results);
};
// 菜单搜索过滤
const createFilter = (queryString: string) => {
	return (restaurant: any) => {
		return (
			restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
			restaurant.meta!.title!.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
			(restaurant.meta!.title!).indexOf(queryString.toLowerCase()) > -1
		);
	};
};
// 初始化菜单数据
const initTageView = () => {
	if (state.tagsViewList.length > 0) return false;
	routerOneDimen.forEach((v: any) => {
		// 根据不同用户的路由权限，展示不同的下拉数据
		let userInfos = JSON.parse(sessionStorage.getItem("userInfos")!) || "";
		if(v.meta.roles.includes(userInfos.userTorole)){
			state.tagsViewList.push(v)
		}
	});
};
// 当前菜单选中时
const onHandleSelect = (item: any) => {
	let { path, redirect } = item;
	if (redirect) router.push(redirect);
	else router.push(path);
	closeSearch();
};

// 暴露变量
defineExpose({
	openSearch,
});
</script>

<style scoped lang="scss">
.layout-search-dialog {
	position: relative;
	:deep(.el-dialog) {
		.el-dialog__header {
            display: none !important;
        }
		.el-dialog__body {
			display: none !important;
		}
		.el-dialog__footer {
			width: 100%;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: -10vh;
		}
	}
	:deep(.el-autocomplete) {
		width: 560px;
		position: absolute;
		top: 150px;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
