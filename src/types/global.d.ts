// 定义路由类型
declare interface RouteItem{
    path: string
    name?: string
    redirect?: string
    component?:string
    meta?:{
        title?:string
        icon?:string
        roles?:Array
        isLink?:string
    }
    children?:any
    title?:string
  }

  declare type RouteItems<T extends RouteItem = any> = T[];

// 角色表格类型
declare interface RoleTable{
    menuLists: any[]
    roleId: string
    roleName: string
    status: number
    roleDes?: string
    createTime: string
    menuLists: Array
}

// 角色弹窗菜单类型
declare type TreeType = {
	id: string;
	label: string;
	children?: TreeType[];
};

// 用户表格类型
declare interface UserTable{
    userId: string
    userName: string
    userNick: string
    userToRole: string
    userPhone: string
    status: boolean
    userDes: string
    createTime: string
}

// 侧边栏,头部tag导航栏菜单类型
declare interface TagsViewRoutesState {
    path?:string
    name?: string | symbol | null | undefined
    active?: boolean
    meta?:any
}
