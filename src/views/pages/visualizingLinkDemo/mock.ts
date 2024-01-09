import { color } from "echarts";

// sky 天气
export const skyList: Array<object> = [
	{
		v1: '时间',
		v2: '天气',
		v3: '温度',
		v4: '湿度',
		v5: '降水概率',
		v6: '风向',
		v7: '风力',
		type: 'title',
	},
	{
		v1: '今天',
		v2: 'Sunny',
		v3: '20°/26°',
		v4: '40%',
		v5: '20%',
		v6: '东南风',
		v7: '11m/s',
	},
	{
		v1: '明天',
		v2: 'Cloudy',
		v3: '18°/25°',
		v4: '50%',
		v5: '50%',
		v6: '东南风',
		v7: '10m/s',
	},
	{
		v1: '后天',
		v2: 'Lightning',
		v3: '15°/22°',
		v4: '80%',
		v5: '90%',
		v6: '东南风',
		v7: '16m/s',
	},
];

// equipment 设备
export const equipment: Array<object> = [
    {
        icon: 'Cpu',
        color: '#43bbef',
        label: '园区设备数',
        num: '99'
    },
    {
        icon: 'Warning',
        color: '#e2356d',
        label: '预警设备数',
        num: '10'
    },
    {
        icon: 'CircleCheck',
        color: '#22bc76',
        label: '运行设备数',
        num: '20'
    }
]

// 当前设置状态
export const dBtnList: Array<object> = [
	{
		v1: '地块A-灌溉',
		v2: '阳光玫瑰种植',
		v3: '126天',
		v4: '设备在线',
        v5: 'CircleCheck'
	},
	{
		v1: '地块B-收割',
		v2: '阳光玫瑰种植',
		v3: '360天',
		v4: '设备预警',
        v5: 'Warning'
	},
];

// 3DEarth 地图周围按钮组
export const earth3DBtnList: Array<object> = [
	{
		topLevelClass: 'fixed-top',
		icon: 'MagicStick',
		label: '环境监测',
		type: 0,
	},
	{
		topLevelClass: 'fixed-right',
		icon: 'MoonNight',
		label: '精准管理',
		type: 1,
	},
	{
		topLevelClass: 'fixed-bottom',
		icon: 'TrendCharts',
		label: '数据报表',
		type: 2,
	},
	{
		topLevelClass: 'fixed-left',
		icon: 'Van',
		label: '产品追溯',
		type: 3,
	},
];

// 当前设备监测
export const chartData4List: Array<object> = [
	{
		label: '温度',
	},
	{
		label: '光照',
	},
	{
		label: '湿度',
	},
	{
		label: '风力',
	},
	{
		label: '张力',
	},
	{
		label: '气压',
	},
];

// 当前任务统计
export const taskList: Array<object> = [
	{
		label: '待办任务',
		num: 25
	},
	{
		label: '施肥',
		num: 12,
		color: '#5492be'
	},
	{
		label: '施药',
		num: 3,
		color: '#43a177'
	},
	{
		label: '农事',
		num: 5,
		color: '#a76077'
	},
	{
		label: '巡园',
		num: 3,
		color: '#b4825a'
	},
	{
		label: '采集',
		num: 2,
		color: '#74568f'
	},
];

// 员工出勤率
export const peoAttendanceRate: Array<object> = [
    {
        icon: 'Avatar',
        color: '#43bbef',
        label: '人员应到',
        num: '150'
    },
    {
        icon: 'CircleCheck',
        color: '#22bc76',
        label: '人员实到',
        num: '148'
    },
    {
        icon: 'Warning',
        color: '#e2356d',
        label: '人员请假',
        num: '2'
    },
	{
        icon: 'Bell',
        color: '#22bc76',
        label: '人员出勤率',
        num: '98.7%'
    }
]
