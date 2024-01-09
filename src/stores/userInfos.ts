import { defineStore } from 'pinia';

/**
 * userInfos 用户信息
 */
export const useUserInfos = defineStore('userInfos', {
	state: () => ({
		userInfos: {
			userName: JSON.parse(sessionStorage.getItem("userInfos")!)?.userName || "",
            photo: "",
            userTorole: "",
		},
	}),
	actions: {
        // 存储用户信息
		setUserInfos() {
            if(sessionStorage.getItem("userInfos")){
                this.userInfos = JSON.parse(sessionStorage.getItem("userInfos")!)
            }
        },
        // 清空用户信息
        cleanUserInfos() {
            this.userInfos = {
                userName: "",
                photo: "",
                userTorole: "",
            }
        }
	},
});