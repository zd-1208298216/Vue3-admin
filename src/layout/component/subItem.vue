<template>
    <template v-for="val in childs">
		<el-sub-menu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
			<template #title>
				<el-icon size="small">
                    <component :is="val.meta.icon"></component>
                </el-icon>
                <span>{{ val.meta.title }}</span>
			</template>
			<sub-item :chil="val.children" />
		</el-sub-menu>
		<template v-else>
			<el-menu-item :index="val.path" :key="val.path">
                <template v-if="!val.meta.isLink">
                    <el-icon size="small">
                        <component :is="val.meta.icon"></component>
                    </el-icon>
                    <span>{{ val.meta.title }}</span>
                </template>
                <template v-else>
                    <a @click.prevent="onALinkClick(val)" style="width:100%">
						<el-icon size="small">
                            <component :is="val.meta.icon"></component>
                        </el-icon>
                        <span>{{ val.meta.title }}</span>
					</a>
                </template>
            </el-menu-item>
		</template>
	</template>
</template>

<script setup lang="ts" name="navMenuSubItem">
import { computed } from 'vue';
import { RouteRecordRaw,useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps({
    chil:{
        type:Array<RouteRecordRaw>,
        default:() => [],
    }
})

/**
 * 打开外部链接
 * @param val 当前点击项菜单
 */
const onALinkClick = (val: RouteItem) => {
    const { origin, pathname } = window.location;
    router.push(val.path);
    window.open(`${origin}${pathname}#${val.meta?.isLink}`);
}

const childs = computed(() => {
    return props.chil
})
</script>

<style lang="scss" scoped>
.el-menu-item.is-active{
    background-color: rgba(0, 0, 0, 0.2);
}
</style>


