import { defineStore } from 'pinia';

/**
 * 布局配置
*/
export const useThemeConfig = defineStore('themeConfig', {
	state: () => ({
		themeConfig: {
			// 是否开启菜单水平折叠效果
			isCollapse: false
		},
	}),
	actions: {
		setThemeConfig(data: any) {
			this.themeConfig = data.themeConfig;
		},
	},
});
