import { defineStore } from 'pinia';

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 */
export const useTagsViewRoutes = defineStore('tagsViewRoutes', {
	state: () => ({
		tagsViewRoutes: [{
            path:"/home",
            name:"home",
            active: true,
            meta: {
                title: '首页',
                icon: 'House',
            },
        }] as Array<any>,
	}),
	actions: {
		async setTagsViewRoutes(data: Array<string>) {
			this.tagsViewRoutes = data;
		},
        //修改标签页
        changeTabMenu(date: TagsViewRoutesState){
            let index = this.tagsViewRoutes.findIndex(item => item.name == date.name)
            if(index == -1){
                this.tagsViewRoutes.map(item => item.active = false)
                this.tagsViewRoutes.push(date)
            }else{
                this.tagsViewRoutes.forEach((v,i) => {
                    v.active = i == index ? true : false
                })
            }
            this.saveSession()
        },
        //删除标签页
        closeTabMenu(date: TagsViewRoutesState){
            let index = this.tagsViewRoutes.findIndex(item => item.name == date.name)
            this.tagsViewRoutes.splice(index,1);
            this.saveSession()
        },
        //删除所有标签页
        closeAllTabMenu(){
            this.tagsViewRoutes = [{
                path:"/home",
                name:"home",
                active: true,
                meta: {
                    title: '首页',
                    icon: 'House',
                },
            }]
        },
        //缓存到sessionStorage中
        saveSession(){
            sessionStorage.setItem('tabMenu',JSON.stringify(this.tagsViewRoutes))
        }
	},
});