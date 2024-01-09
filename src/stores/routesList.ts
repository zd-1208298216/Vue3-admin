import { defineStore } from 'pinia';
import { setFilterHasRolesMenu } from '@/router/index';
import { dynamicRoutes } from '@/router/index';

/**
 * userInfos 用户信息
 */
export const useRoutesList = defineStore('routesList', {
	state: () => ({
		routesList: JSON.parse(sessionStorage.getItem('routesList')) || [] as Array<any>
	}),
	actions: {
        // 存储并动态添加路由信息
		addRoutesList(router: any) {
            let routeListFilter = setFilterHasRolesMenu(dynamicRoutes)
            this.routesList = routeListFilter
            sessionStorage.setItem('routesList',JSON.stringify(this.routesList))
            if(this.routesList.length){
                router.addRoute(this.routesList[0])
            }
        },
	},
});