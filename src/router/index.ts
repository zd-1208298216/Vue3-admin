import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const dynamicRoutes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        meta:{
            roles:["admin","ahhh"]
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'House',
                    roles:["admin","ahhh"]
                },
            },
            {
                path: '/system',
                name: 'system',
                redirect: '/system/menu',
                meta: {
                    title: '系统设置',
                    icon: 'Tools',
                    roles:["admin"]
                },
                children: [
                    {
                        path: '/system/menu',
                        name: 'systemMenu',
                        component: () => import('@/views/system/menu/index.vue'),
                        meta: {
                            title: '菜单管理',
                            icon: 'Menu',
                            roles:["admin"]
                        },
                    },
                    {
                        path: '/system/role',
                        name: 'systemRole',
                        component: () => import('@/views/system/role/index.vue'),
                        meta: {
                            title: '角色管理',
                            icon: 'UserFilled',
                            roles:["admin"]
                        },
                    },
                    {
                        path: '/system/user',
                        name: 'systemUser',
                        component: () => import('@/views/system/user/index.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'User',
                            roles:["admin"]
                        },
                    },
                    {
                        path: '/system/dept',
                        name: 'systemDept',
                        meta: {
                            title: '部门管理',
                            icon: 'Tools',
                            roles:["admin"]
                        },
                        redirect: '/system/dept/dic',
                        children:[
                            {
                                path: '/system/dept/dic',
                                name: 'systemDic',
                                component: () => import('@/views/home/index.vue'),
                                meta: {
                                    title: '字典管理',
                                    icon: 'Tools',
                                    roles:["admin"]
                                },
                            },
                        ]
                    },
                ],
            },
            {
                path: '/feature',
                name: 'feature',
                redirect: '/feature/icon',
                meta: {
                    title: '功能组件',
                    icon: 'Star',
                    roles:["admin","ahhh"]
                },
                children:[
                    {
                        path: '/feature/icon',
                        name: 'FeatureIcon',
                        component: () => import('@/views/feature/icon/index.vue'),
                        meta: {
                            title: '图标选择器',
                            icon: 'coin',
                            roles:["admin","ahhh"]
                        },
                    },
                ]
            },
            {
                path: '/pages',
                name: 'pages',
                redirect: '/pages/imgLazy',
                meta: {
                    title: '页面',
                    icon: 'Star',
                    roles:["admin","ahhh"]
                },
                children:[
                    {
                        path: '/pages/imgLazy',
                        name: 'PagesImgLazy',
                        component: () => import('@/views/pages/imgLazy/index.vue'),
                        meta: {
                            title: '图片懒加载',
                            icon: 'coin',
                            roles:["admin","ahhh"]
                        },
                    },
                    {
                        path: '/pages/visualizingLinkDemo',
                        name: 'visualizingLinkDemo',
                        component: () => import('@/views/pages/visualizingLinkDemo/index.vue'),
                        meta: {
                            title: '数据可视化',
                            icon: 'coin',
                            roles:["admin","ahhh"],
                            isLink:'/visualizingDemo'
                        },
                    },
                ]
            }       
        ],
    }
    // {
    //     path:'/login',
    //     name:'login',
    //     component: () => import('../views/login/login.vue'),
    // },
    // {
    //     path:'/:path(.*)*',
    //     name:'notFound',
    //     component: () => import('../views/error/404.vue'),
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    // routes:[...dynamicRoutes]
    routes:[
        {
            path:'/login',
            name:'login',
            component: () => import('../views/login/login.vue'),
        },
        {
            path:'/:path(.*)*',
            name:'notFound',
            component: () => import('../views/error/404.vue'),
        },
        {
            path: '/visualizingDemo',
            name: 'visualizingDemo',
            component: () => import('../views/pages/visualizingLinkDemo/demo.vue'),
        },
    ]
})

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @param hierarchy 需要处理的层级(fa-父级,ch-子级)
 * @returns 返回处理后的一维路由菜单数组
 */
function formatFlatteningRoutes(arr:any, hierarchy: string){
    if(!arr) return []
    if(arr.length <= 0) return false
    for(let i=0;i<arr.length;i++){
        if(arr[i].children){
            if(hierarchy == "ch"){
                // 只要子级结构路由
                arr = arr.slice(0,i).concat(formatFlatteningRoutes(arr[i].children,"ch"),arr.slice(i+1))
            }else{
                // 包含父级结构路由
                arr = arr.slice(0,i+1).concat(arr[i].children, arr.slice(i + 1));
            }
        }
    }
    return arr
}
// 一维数组路由(子级结构路由)
export const routerOneDimen = formatFlatteningRoutes(dynamicRoutes[0].children,"ch")

/**
 * 获取当前用户权限标识去比对路由表，设置递归过滤有权限的路由
 * @returns 返回有权限的路由数组 `meta.roles` 中控制
 */
export function setFilterHasRolesMenu(routeList: any) {
    let routeListFilter = [];
    // 深拷贝对象
    let routeLists = deepClone(routeList)
    for(let i=0;i<routeLists.length;i++){
        if(routeLists[i].meta.roles){
            let roles = routeLists[i].meta.roles;
            let userInfos = JSON.parse(sessionStorage.getItem("userInfos")!) || "";
            if(roles.indexOf(userInfos.userTorole) != -1){
                if(routeLists[i].children){
                    routeLists[i].children = setFilterHasRolesMenu(routeLists[i].children);
                    routeListFilter.push(routeLists[i])
                }else{
                    routeListFilter.push(routeLists[i])
                }
            }
        }
    }
    return routeListFilter;
}

// 对象深拷贝
function deepClone(obj: any){
    let objClone = Array.isArray(obj) ? [] as any : {} as any
    if(obj && typeof obj == "object"){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(obj[key] && typeof obj[key] == "object"){
                    objClone[key] = deepClone(obj[key])
                }else{
                    objClone[key] = obj[key]
                }
            }
        }
    }
    return objClone;
}

//路由加载前
router.beforeEach((to,_from,next) => {
    NProgress.start();
    const token = sessionStorage.getItem("token");
    if(to.path == '/login' && !token){
        next()
        NProgress.done();
    }else{
        if(!token){
            next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
            sessionStorage.clear();
            NProgress.done();
        }else if(token && to.path == '/login'){
            next('/home');
            NProgress.done();
        }else{
            let index = routerOneDimen.findIndex((item:any) => item.path == to.path);
            if(index != -1){
                const storesTagsViewRoutes = useTagsViewRoutes();
                let tagRoute = {
                    path: to.path,
                    name: to.name,
                    active: true,
                    meta: to.meta
                }
                storesTagsViewRoutes.changeTabMenu(tagRoute);
            }
            next()
            NProgress.done();
        }
    }
})

export default router