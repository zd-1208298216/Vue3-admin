/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @returns 返回拼接后的时间字符串
 */
export function formatDate(date: Date){
    let y = date.getFullYear();
    // 中文数字 (星期)
	const week: { [key: string]: string } = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六',
	};
    let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);//获取当前月份的日期，不足10补0
    let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //获取当前几号，不足10补0
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();   //时
    let n = date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes();  // 分
    let s = date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds();  // 秒
    let z = week[date.getDay()]; // 周
    let qut =  week[Math.floor((date.getMonth() + 3) / 3).toString()]; // 季度
    return y + '-' + m + '-' + d + ' ' + h + ':' + n + ':' + s + ' 星期' + z + ' 第' + qut + '季度';
}