var config = require('./../config/config.js');
/**
 * 格式化日期
 */
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**
 * 获得年
 */
const getYear = () => new Date().getFullYear();
/**
 * 获得月
 */
const getMonth = () => {
    var m = new Date().getMonth() + 1;
    return m > 10 ? m : "0" + m;
}

/**
 * 获得当前日期
 */
const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(formatNumber).join('-')
}

/**
 * 获得礼拜几
 */
const getWeek = (d) => {
    let date;
    if (d) {
        date = new Date(d);
    } else {
        date = new Date();
    }
    var weekday = new Array(7)
    weekday[0] = "周日"
    weekday[1] = "周一"
    weekday[2] = "周二"
    weekday[3] = "周三"
    weekday[4] = "周四"
    weekday[5] = "周五"
    weekday[6] = "周六"
    return weekday[date.getDay()];
}

/**
 * 随机颜色
 */
const randomColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}

/**
 * 电话 正则
 */
function validateTel(tel) {
    // console.log(config.TEL_REGEXP.test(tel));
    return config.TEL_REGEXP.test(tel);
}

/**
 * 密码 正则
 */
function validatePwd(pwd) {
    console.log(config.PWD_REGEXP.test(pwd));
    return config.PWD_REGEXP.test(pwd);
}

/**
 * 降序函数
 * @param a
 * @param b
 * @returns {number}
 */
function desc(a, b) {
    return b - a;
}

const formatDate = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(formatNumber).join('-')
};

module.exports = {
    formatTime: formatTime,
    getDate: getDate,
    randomColor: randomColor,
    getWeek: getWeek,
    getYear,
    getMonth,
    validateTel,
    validatePwd,
    desc,
    formatDate
};