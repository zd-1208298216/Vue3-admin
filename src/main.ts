import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn';
import pinia from '@/stores/index';
import { createPinia } from 'pinia'
import { useRoutesList } from '@/stores/routesList';
import DataVVue3 from '@kjgl77/datav-vue3'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const store = createPinia()
app.use(store)

/*
    动态添加路由，每次页面刷新时都会报错404，解决方法：每次页面刷新时，执行main.ts时，
    先手动调用store里的addRoute去添加路由，再执行user(router),确保当前路由能获取到新增的路由信息
*/ 
const storeRoutesList = useRoutesList();
const addRouter = () => {
    storeRoutesList.addRoutesList(router)
}
addRouter()

app.use(router).use(ElementPlus, { locale }).use(DataVVue3).use(pinia).mount('#app')

// 注册element plus中所有的icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

export const getData = () => {
    let icons = []
    for (const name in ElementPlusIconsVue) {
        icons.push(name)
    }
    return icons
}
