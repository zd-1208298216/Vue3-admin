<template>
    <div class="pages-visualizing-demo">
        <div class="demo-header">
            <div class="demo-header-left">
                <dv-decoration-10 style="width:100%;height:5px" :color="decorationColors"/>
                <div class="demo-header-left-time">
                    <el-icon><Clock /></el-icon>
                    <span style="margin-left:5px">{{ state.time.txt }}</span>
                </div>
            </div>
            <div class="demo-header-center">
                <span>大数据可视化平台</span>
            </div>
            <div class="demo-header-right">
                <dv-decoration-10 style="width:100%;height:5px;transform: rotateY(180deg)" :color="decorationColors"/>
                <div class="demo-header-right-button">
                    <div class="demo-header-right-msg ml10">
                        <el-icon><Bell /></el-icon>
                        <span style="margin-left:5px">消息</span>
                    </div>
                    <div class="demo-header-right-per ml10">
                        <el-icon><User /></el-icon>
                        <span style="margin-left:5px">个人</span>
                    </div>
                    <div class="demo-header-right-qut ml10">
                        <el-icon><SwitchButton /></el-icon>
                        <span style="margin-left:5px">退出</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="demo-main">
            <!-- 左边 -->
            <div class="demo-main-left">
                <div class="demo-main-item">
                    <dv-border-box12 class="demo-main-item-box" :backgroundColor="borderColors">
                        <div class="item-title">
                            <el-icon><Guide /></el-icon>
                            天气预报
                        </div>
                        <div class="item-content">
                            <div class="sky">
                                <el-icon style="font-size:15px"><Sunny /></el-icon>
                                <div class="sky-center">
                                    <div class="sky-center-top">
                                        <span>多云转晴</span>
                                        <span class="ml15">东南风</span>
                                        <span class="ml15 font">良</span>
                                    </div>
                                    <div class="sky-center-tip">温馨提示：多云转晴，南风转北风风力3级</div>
                                </div>
                                <div class="sky-right">
                                    <span>25°C</span>
                                </div>
                            </div>
                            <div class="sky-table">
                                <div class="sky-dl" v-for="(v,k) in skyList" :key="k" :class="{ 'sky-dl-first': k === 1 }">
                                    <div>{{ v.v1 }}</div>
                                    <div v-if="v.type">{{ v.v2 }}</div>
                                    <div v-else>
                                        <el-icon>
                                            <component :is="v.v2"></component>
                                        </el-icon>
                                    </div>
                                    <div>{{ v.v3 }}</div>
                                    <div>{{ v.v4 }}</div>
                                    <div>{{ v.v5 }}</div>
                                    <div>{{ v.v6 }}</div>
                                    <div>{{ v.v7 }}</div>
                                </div>
                            </div>
                        </div>
                    </dv-border-box12>
                </div>
                <div class="demo-main-item">
                    <dv-border-box12 class="demo-main-item-box" :backgroundColor="borderColors">
                        <div class="item-title">
                            <el-icon><Odometer /></el-icon>
                            设备状态
                        </div>
                        <div class="item-content">
                            <div class="equipment-status">
                                <div class="equipment-status-item" v-for="(v,k) in equipment" :key="k">
                                    <div class="equipment-status-item-icon" :style={backgroundColor:v.color}>
                                        <el-icon>
                                            <component :is="v.icon"></component>
                                        </el-icon>
                                    </div>
                                    <div class="equipment-status-item-msg">
                                        <div class="item-msg-label">{{ v.label }}</div>
                                        <div class="item-msg-num">{{ v.num }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="equipment-button">
                                <div class="equipment-button-item" v-for="(v,k) in dBtnList" :key="k" :class="{ 'd-btn-active': state.dBtnActive === k }" @click="EquipCilck(k)">
                                    <el-icon class="equipment-button-item-icon">
                                        <component :is="v.v5"></component>
                                    </el-icon>
                                    <div class="equipment-button-item-msg">
                                        <div>{{ v.v1 }}</div>
										<div>{{ v.v2 }}|{{ v.v3 }}</div>
                                    </div>
                                    <div class="equipment-button-item-status">{{ v.v4}}</div>
                                </div>
                            </div>
                        </div>
                    </dv-border-box12>
                </div>
                <div class="demo-main-item">
                    <dv-border-box12 class="demo-main-item-box" :backgroundColor="borderColors">
                        <div class="item-title">
                            <el-icon><Warning /></el-icon>
                            近30天预警总数
                        </div>
                        <div class="item-content">
                            <div class="leftChartData1" ref="leftChartData1"></div>
                        </div>
                    </dv-border-box12>
                </div>
            </div>
            <!-- 中间 -->
            <div class="demo-main-center">
                <div class="demo-main-center-one">
                    <div class="demo-main-center-one-content">
                        <div ref="Earth" id="3DEarth" style="height:100%;width:100%"></div>
                        <div v-for="(v,k) in state.earth3DBtnList" :key="k" :class="v.topLevelClass">
                            <div class="circle" v-for="i in 4" :key="i"></div>
                            <div class="text-content">
                                <el-icon>
                                    <component :is="v.icon"></component>
                                </el-icon>
                                <div class="text">{{ v.label }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-main-center-two demo-main-item">
                    <dv-border-box12 class="demo-main-item-box" :backgroundColor="borderColors">
                        <div class="item-title">
                            <el-icon><Odometer /></el-icon>
                            当前设备监测
                        </div>
                        <div class="item-content">
                            <div class="demo-main-center-two-select">
                                <div class="select-lists-item" v-for="(v,k) in state.chartData4List" :key="k" @click="state.chartData4Index = k">
                                    <div class="monitor-wave" :class="{ 'monitor-active': k === state.chartData4Index }">
										<div class="monitor-z-index">
											<div class="monitor-item-label">{{ v.label }}</div>
										</div>
									</div>
                                </div>
                            </div>
                            <div class="select-echart-box" ref="cenChartData1" style="height:100%;width:100%"></div>
                        </div>
                    </dv-border-box12>
                </div>
            </div>
            <!-- 右边 -->
            <div class="demo-main-right">
                <div class="demo-main-item">
                    <dv-border-box12 class="demo-main-item-box" :backgroundColor="borderColors">
                        <div class="item-title">
                            <el-icon><User /></el-icon>
                            当天员工出勤率     
                        </div>
                        <div class="item-content">
                            <div class="person-attendance-rate">
                                <div class="person-attendance-rate-item" v-for="(v,k) in peoAttendanceRate" :key="k">
                                    <div class="person-attendance-rate-item-icon" :style={backgroundColor:v.color}>
                                        <el-icon>
                                            <component :is="v.icon"></component>
                                        </el-icon>
                                    </div>
                                    <div class="person-attendance-rate-item-msg">
                                        <div class="item-msg-label">{{ v.label }}</div>
                                        <div class="item-msg-num">{{ v.num }}</div>
                                    </div>
                                </div>
                            </div>
                            <dv-scroll-board ref="scrollBoard" :config="state.personList" :key="scrollBoardKey"/>
                        </div>
                    </dv-border-box12>
                </div>
                <div class="demo-main-item">
                    <dv-border-box12 class="demo-main-item-box" :backgroundColor="borderColors">
                        <div class="item-title">
                            <el-icon><Memo /></el-icon>
                            当前任务统计
                        </div>
                        <div class="item-content">
                            <div class="task-list">
                                <div class="task-list-item" v-for="(v,k) in state.taskList" :key="k" :style="{ background: v.color,width: k !=0 ? '45px' : '60px'}">
                                    <span>{{ v.num }}</span>
                                    <span>{{ v.label }}</span>
                                </div>
                            </div>
                            <div class="progress">
                                <div ref="rightChartData2" style="height:100%;width:100%"></div>
                            </div>
                        </div>
                    </dv-border-box12>
                </div>
                <div class="demo-main-item">
                    <dv-border-box12 class="demo-main-item-box" :backgroundColor="borderColors">
                        <div class="item-title demo-right-item">
                            <div class="item-title-left">
                                <el-icon><Money /></el-icon>
                                近7天产品销售记录
                            </div>      
                            <span>单位: 吨</span>
                        </div>
                        <div class="item-content">
                            <div ref="rightChartData3" style="height:100%"></div>
                        </div>
                    </dv-border-box12>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="visualizingLinkDemo">
import { ref, reactive, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts';
import 'echarts-gl';
import { formatDate } from  '@/utils/formatTime'
import { skyList, equipment, dBtnList, earth3DBtnList, chartData4List, taskList, peoAttendanceRate } from './mock'
import { status } from 'nprogress';

// 定义变量
const scrollBoardKey = ref(0)
const leftChartData1 = ref()
const cenChartData1 = ref()
const rightChartData2 = ref()
const rightChartData3 = ref()
const Earth = ref()
const decorationColors = ['#43bdf0']
const borderColors = ['rgba(22, 34, 58, 0.4)']
const state = reactive({
    time:{
        txt: '',
        fun: 0
    },
    personList:{
        data: [
            ['李磊','施肥员','<span style="color:#32c5e9;">签到</span>'],
            ['王五','播种员','<span style="color:#32c5e9;">签到</span>'],
            ['张三','施肥员','<span style="color:#32c5e9;">签到</span>'],
            ['李四','清洁员','<span style="color:rgb(226, 53, 109);">请假</span>'],
            ['郑大','园区经理','<span style="color:#32c5e9;">签到</span>'],
            ['吕六','销售顾问','<span style="color:#32c5e9;">签到</span>'],
            ['何七','保安','<span style="color:#32c5e9;">签到</span>'],
            ['钱八','采集员','<span style="color:#32c5e9;">签到</span>'],
        ]
    },
    dBtnActive: 0,
    chartData4Index: 0,
    skyList,
    equipment,
    dBtnList,
    earth3DBtnList,
    chartData4List,
    taskList,
    peoAttendanceRate,
    myCharts:[] as Array<any>
})

// 初始化时间
const initTime = () => {
	state.time.txt = formatDate(new Date());
	state.time.fun = window.setInterval(() => {
		state.time.txt = formatDate(new Date());
	}, 1000);
};

// 设备点击
const EquipCilck = (k:number) => {
    state.dBtnActive = k
}

// 近三十天预警总数
const LeftChartData1 = () => {
    const myChart = echarts.init(leftChartData1.value);
	const option = {
		tooltip: {
			trigger: 'item',
		},
		series: [
			{
				name: '面积模式',
				type: 'pie',
				radius: [10, 60],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 5,
				},
				data: [
					{ name: '天气预警', value: 100 },
					{ name: '病虫害预警', value: 50 },
					{ name: '任务预警', value: 130 },
					{ name: '监测设备预警', value: 62 },
				],
				label: {
					color: '#c0d1f2',
				},
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
}

// 3DEarth 地图
const init3DEarth = () => {
	const myChart = echarts.init(Earth.value);
	const option = {
		globe: {
			baseTexture: 'https://i.hd-r.cn/4d572a171eb475da0c2e731d15b63aea.jpg',
			heightTexture: 'https://i.hd-r.cn/52356e8d906c84c5e23390f829dec7a3.jpg',
			shading: 'realistic',
			light: {
				ambient: {
					intensity: 0.4,
				},
				main: {
					intensity: 0.4,
				},
			},
			viewControl: {
				autoRotate: true,
			},
			postEffect: {
				enable: true,
				bloom: {
					enable: true,
				},
			},
			globeRadius:80
		},
		series: {
			type: 'lines3D',
			coordinateSystem: 'globe',
			blendMode: 'lighter',
			lineStyle: {
				width: 1,
				color: 'rgb(50, 50, 150)',
				opacity: 0.1,
			},
			data: [],
		},
	};
	// 随机模拟攻击线
	let rodamData: any = function () {
		let longitude = 105.18;
		let longitude2 = Math.random() * 360 - 180;
		let latitude = 37.51;
		let latitude2 = Math.random() * 180 - 90;
		return {
			coords: [
				[longitude2, latitude2],
				[longitude, latitude],
			],
			value: (Math.random() * 3000).toFixed(2),
		};
	};
	for (let i = 0; i < 150; i++) {
		option.series.data = option.series.data.concat(rodamData());
	}
	myChart.setOption(option);
};

// 当前设备监测
const initRightChartData4 = () => {
	const myChart = echarts.init(cenChartData1.value);
	const option = {
		grid: {
			top: 10,
			right: 10,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1月', '2月', '3月', '4月', '5月', '6月'],
			axisLine: {
				lineStyle: {
					color: 'rgba(22, 207, 208, 0.1)',
					width: 1,
				},
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				interval: 0,
				color: '#c0d1f2',
				textStyle: {
					fontSize: 10,
				},
			},
		},
		yAxis: [
			{
				type: 'value',
				axisLabel: {
					color: '#c0d1f2',
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.3)',
					},
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
		],
		series: [
			{
				name: '温度',
				type: 'line',
				smooth: true,
				lineStyle: {
					width: 0,
				},
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(128, 255, 165)',
						},
						{
							offset: 1,
							color: 'rgba(1, 191, 236)',
						},
					]),
				},
				emphasis: {
					focus: 'series',
				},
				data: [140, 232, 101, 264, 90, 70],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};

// 当前任务统计
const initRightChartData2 = () => {
	const myChart = echarts.init(rightChartData2.value);
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		grid: {
			top: 20,
			right: 50,
			bottom: 0,
			left: 80,
		},
		xAxis: [
			{
				splitLine: {
					show: false,
				},
				type: 'value',
				show: false,
			},
		],
		yAxis: [
			{
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				type: 'category',
				axisTick: {
					show: false,
				},
				inverse: true,
				data: ['施肥完成率', '施药完成率', '农事完成率','寻园完成率','采集完成率'],
				axisLabel: {
					color: '#A7D6F4',
					fontSize: 12,
				},
			},
		],
		series: [
			{
				name: '标准化',
				type: 'bar',
				barWidth: 10, // 柱子宽度
				label: {
					show: true,
					position: 'right', // 位置
					color: '#A7D6F4',
					fontSize: 12,
					distance: 15, // 距离
					formatter: '{c}%', // 这里是数据展示的时候显示的数据
				}, // 柱子上方的数值
				itemStyle: {
					barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
					color: new echarts.graphic.LinearGradient(
						1,0,0,0,
						[
							{
								offset: 0,
								color: '#51C5FD',
							},
							{
								offset: 1,
								color: '#005BB1',
							},
						],
						false
					), // 渐变
				},
				data: [75, 100, 80, 60, 50],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};

// 近7天投入品记录
const initRightChartData3 = () => {
	const myChart = echarts.init(rightChartData3.value);
	const option = {
		grid: {
			top: 10,
			right: 0,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		xAxis: {
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			axisLine: {
				lineStyle: {
					color: 'rgba(22, 207, 208, 0.5)',
					width: 1,
				},
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				color: '#c0d1f2',
			},
		},
		yAxis: [
			{
				type: 'value',
                position: 'right',
                min: 0,
                max: 18,
                interval: 1,
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#c0d1f2',
                    }
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.3)',
					},
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
			{
				type: 'value',
                min: 0,
                max: 18,
                interval: 3,
				axisLine: {
					show: false,
				},
				axisLabel: {
					textStyle: {
						color: '#16cfd0',
					},
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
		],
		series: [
			{
				name: '生产总量',
				type: 'line',
				yAxisIndex: 1,
				smooth: true,
				showAllSymbol: true,
				symbol: 'circle',
				itemStyle: {
					color: '#058cff',
				},
				lineStyle: {
					color: '#058cff',
				},
				areaStyle: {
					color: 'rgba(5,140,255, 0.2)',
				},
				data: [10, 13, 12, 11, 15, 12, 9],
			},
			{
				name: '销售总量',
				type: 'bar',
				barWidth: 15,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: '#00FFE3',
							},
							{
								offset: 1,
								color: '#4693EC',
							},
						]),
					},
				},
				data: [8.8, 10.2, 11.3, 10.5, 12.9, 10.8, 8.3],
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};

// 批量设置 echarts resize
const initEchartsResize = () => {
	window.addEventListener('resize', () => {
		for (let i = 0; i < state.myCharts.length; i++) {
			state.myCharts[i].resize();
		}
		init3DEarth();
        nextTick(() => {
            scrollBoardKey.value++
        })
	});
};

onMounted(async () => {
    initTime()
    await LeftChartData1()
    await init3DEarth()
    await initRightChartData4()
    await initRightChartData2()
    await initRightChartData3()
    await initEchartsResize()
    
})

</script>

<style scoped lang="scss">
.pages-visualizing-demo {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // background: url(https://i.hd-r.cn/b1040178e4a2265fe87ffbb9bda839a4.jpg);
    background: url(@/assets/bg.png);
    background-size: 100% 100%;
    font-size: 14px;
    .demo-header {
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        color: #43bdf0;
        overflow: hidden;
        &-left {
            width: 30%;
            font-style: italic;
            padding-left: 15px;
            &-time {
                margin-top: 10px;
            }
        }
        &-center {
            width: 40%;
            display: flex;
            justify-content: center;
            font-size: 20px;
            letter-spacing: 5px;
            background-image: -webkit-linear-gradient(left, #43bdf0, #c0d1f2 25%, #43bdf0 50%, #c0d1f2 75%, #43bdf0);
            -webkit-text-fill-color: transparent;
			background-clip: text;
			-webkit-background-clip: text;
            background-size: 200% 100%;
            animation: masked-animation 4s infinite linear;
            -webkit-box-reflect: below -2px -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(255, 255, 255, 0.1)));
            @keyframes masked-animation {
				0% {
					background-position: 0 0;
				}
				100% {
					background-position: -100% 0;
				}
			}
            position: relative;
			&::after {
				content: '';
				width: 50%;
				position: absolute;
				bottom: -15px;
				left: 50%;
				transform: translateX(-50%);
				border: 1px transparent solid;
				border-image: linear-gradient(to right, rgba(0, 0, 0, 0.1), #43bdf0) 1 10;
			}
            span {
                 cursor: pointer;
            }
        }
        &-right  {
            width: 30%;
            padding-right: 15px;
            &-button {
                margin-top: 10px;
                display: flex;
                justify-content: right;
                .ml10 {
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
    }
    .demo-main {
        flex: 1;
        overflow: hidden;
        display: flex;
        .demo-main-left,
        .demo-main-center,
        .demo-main-right {
            width: 30%;
            display: flex;
            flex-direction: column;
            .demo-main-item {
                padding: 0 7.5px 15px 15px;
                width: 100%;
                height: 33.33%;
                box-sizing: border-box;
                .demo-main-item-box {
                    width: 100%;
                    box-sizing: border-box;
                    border-radius: 20px;
                    background: rgba(22, 34, 58, 0.4);
                    height: 100%;
                    padding: 15px;            
                    :deep(.border-box-content) {
                        display: flex;
                        flex-direction: column;
                    }   
                    .item-title {
                        margin-bottom: 15px;
                        font-size: 13px;
                        margin-left: 5px;
                        color: #c0d1f2;
                    }
                    .item-content {
						flex: 1;
						font-size: 12px;
					}
                }
            }
        }
        .demo-main-left {
            color: #c0d1f2;
            .item-content {
                display: flex;
                flex-direction: column;
                overflow: hidden;
                .sky {
                    display: flex;
                    align-items: center;
                    .sky-center {
                        margin-left: 10px;
                        flex: 1;
                        &-top {
                            margin-bottom: 2px;
                            .ml15 {
                                margin-left: 15px;
                            }
                            .font{
                                background: #22bc76;
                                border-radius: 2px;
                                padding: 0 5px;
                            }
                        }
                    }
                    .sky-right {
                        font-size: 30px;
                    }
                }
                .sky-table {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    margin-top: 5px;
                    .sky-dl {
                        display: flex;
                        width: 100%;
                        align-items: center;
                        overflow: hidden;
                        cursor: pointer;
                        div {
                            flex: 1;
                            margin-top: 8px;
                        }
                    }
                    .sky-dl-first {
                        color: #43bdf0;
                    }
                }
                .equipment-status {
                    display: flex;
                    &-item {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        &-icon {
                            height: 32px;
                            width: 32px;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 18px;
                            margin-right: 10px;
                        }
                        &-msg {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .item-msg-label {
                                color: #43bdf0;
                                white-space: nowrap;
							    text-overflow: ellipsis;
                            }
                            .item-msg-num {
                                font-size: 20px;
							    text-align: center;
                            }
                        }
                    }
                }
                .equipment-button {
                    margin-top: 15px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    &-item {
                        height: 35px;
                        border-radius: 35px;
                        border: 1px solid #c0d1f2;
                        padding: 0 4px;
                        margin-top: 5px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        &-icon {
                            font-size: 24px;
                            margin-right: 10px;
                        }
                        &-msg {
                            flex: 1;
                        }
                        &-status {
                            padding-right: 10px;
                        }
                    }
                    .d-btn-active {
                        transition: all ease 0.3s;
                        border: 1px solid #43bdf0;
                        color: #43bdf0;
                        .d-btn-item-left {
                            border: 1px solid #43bdf0;
                        }
                    }
                }
                .leftChartData1 {
                    flex: 1;
                }
            }
        }
        .demo-main-center {
            width: 40%;
            display: flex;
            flex-direction: column;
            &-one {
                height: 66.66%;
                padding: 0 7.5px 15px;
                box-sizing: border-box;
                &-content {
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .fixed-top,
                    .fixed-right,
                    .fixed-bottom,
                    .fixed-left {
                        position: absolute;
                        height: 100px;
                        width: 100px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        .circle {
                            position: absolute;
                            background: rgba(0, 0, 0, 0);
                            border-radius: 50%;
                            z-index: 10;
                        }
                        .text-content {
                            margin: auto;
                            z-index: 11;
                            color: #c0d1f2;
                            text-align: center;
                            font-size: 22px;
                            .text {
                                margin-top: 5px;
                                font-size: 12px;
                            }
                        }
                    }
                    .fixed-top {
                        top: 20px;
                        left: 20px;
                    }
                    .fixed-right {
                        top: 20px;
                        right: 20px;
                    }
                    .fixed-bottom {
                        bottom: 20px;
                        right: 20px;
                    }
                    .fixed-left {
                        bottom: 20px;
                        left: 20px;
                    }
                    .circle:nth-of-type(1) {
						width: 100px;
						height: 95px;
						animation: turnAround 6s infinite linear;
						box-shadow: 0 0 1px 0 #869fe4, inset 0 0 10px 0 #869fe4;
					}
					.circle:nth-of-type(2) {
						width: 95px;
						height: 100px;
						animation: turnAround 10s infinite linear;
						box-shadow: 0 0 1px 0 #3397f2, inset 0 0 10px 0 #3397f2;
					}
					.circle:nth-of-type(3) {
						width: 110px;
						height: 100px;
						animation: turnAround 5s infinite linear;
						box-shadow: 0 0 1px 0 #3eaadc, inset 0 0 10px 0 #3eaadc;
					}
					.circle:nth-of-type(4) {
						width: 100px;
						height: 110px;
						animation: turnAround 15s infinite linear;
						box-shadow: 0 0 1px 0 #09f, inset 0 0 10px 0 #09f;
					}
					@keyframes turnAround {
						100% {
							transform: rotate(360deg);
						}
					}
                }
            }
            &-two {
                .item-content {
                    display: flex;
                    .demo-main-center-two-select {
                        width: 120px;
                        height: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        .select-lists-item {
                            width: 50%;
                            display: flex;
                            align-items: center;
                            .monitor-wave {
                                cursor: pointer;
                                width: 40px;
                                height: 40px;
                                position: relative;
                                background-color: #43bdf0;
                                border-radius: 50%;
                                overflow: hidden;
                                &::before,
                                &::after {
                                    content: '';
                                    position: absolute;
                                    left: 50%;
                                    width: 40px;
                                    height: 40px;
                                    background: #f4f4f4;
                                    animation: roateOne 10s linear infinite;
                                    transform: translateX(-50%);
                                    z-index: 1;
                                }
                                &::before {
                                    bottom: 10px;
                                    border-radius: 60%;
                                }
                                &::after {
                                    bottom: 8px;
                                    opacity: 0.7;
                                    border-radius: 37%;
                                }
                                .monitor-z-index {
                                    position: relative;
                                    z-index: 2;
                                    color: #4eb8ff;
                                    display: flex;
                                    align-items: center;
                                    height: 100%;
                                    justify-content: center;
                                    font-weight: bold;
                                }
                            }
                            @keyframes roateOne {
									0% {
										transform: translate(-50%, 0) rotateZ(0deg);
									}
									50% {
										transform: translate(-50%, -2%) rotateZ(180deg);
									}
									100% {
										transform: translate(-50%, 0%) rotateZ(360deg);
									}
							}
                            .monitor-active {
                                background-color: #22bc76;
                                .monitor-z-index {
                                    color: #22bc76;
                                }
                            }
                        }
                    }
                    .select-echart-box {
                        flex: 1;
                    }
                }
            }
        }
        .demo-main-right {
            .item-content {
                display: flex;
                flex-direction: column;
                .task-list {
                    height: 45px;
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: -10px;
                    &-item {
                        height: 100%;
                        border-radius: 50%;
                        font-size: 14px;
                        color: #c0d1f2;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                }
                .progress {
                    flex: 1;
                }
                .person-attendance-rate {
                    display: flex;
                    color: #c0d1f2;
                    &-item {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        &-icon {
                            height: 30px;
                            width: 30px;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 18px;
                            margin-right: 10px;
                        }
                        &-msg {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .item-msg-label {
                                color: #43bdf0;
                                white-space: nowrap;
							    text-overflow: ellipsis;
                            }
                            .item-msg-num {
                                font-size: 20px;
							    text-align: center;
                            }
                        }
                    }
                }
            }
            .demo-right-item {
                display: flex;
                justify-content: space-between;
            }
        }
    }
}

</style>