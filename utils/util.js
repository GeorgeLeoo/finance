var config = require('./../config/config.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getYear = () => new Date().getFullYear();
const getMonth = () => {
  var m = new Date().getMonth() + 1;
  return m > 10 ? m : "0" + m;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}

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

const randomColor = () => {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

// var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;

function validateTel(tel) {
  console.log(config.TEL_REGEXP.test(tel));
  return config.TEL_REGEXP.test(tel);
}

module.exports = {
  formatTime: formatTime,
  getDate: getDate,
  randomColor: randomColor,
  getWeek: getWeek,
  getYear,
  getMonth,
  validateTel
}