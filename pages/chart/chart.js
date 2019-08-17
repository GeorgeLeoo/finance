// pages/chart/chart.js
const utils = require('./../../utils/util.js');
const config = require('./../../config/config.js');
const api = require('./../../http/api.js');

const wxCharts = require('./../../utils/wxcharts.js');
const {users, c_out, c_in} = getApp().globalData;
let lineChart = null;
let pieChart = null;
Page({
    data: {
        current: 0,
        date: {
            year: utils.getYear(),
            month: utils.getMonth()
        },
        rankings: [],
        lines: []
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '',
        });
        let route = this.route;
        getApp().globalData.currentPath = './..' + route.substring(5, route.length);
        this.loadData(this);

    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '图表'
        });
        wx.hideLoading();
    },
    bindDateChange(e) {
        console.log()
        let date = e.detail.value;
        let arr = date.split('-');
        this.setData({
            date: {
                year: arr[0],
                month: arr[1]
            }
        });
        this.loadData(this);
    },
    handleChange(e) {
        console.log(e.target.dataset)
        let current = parseInt(e.target.dataset.current);
        this.setData({
            current
        });
        this.loadData(this);
    },
    touchHandlerLineCanvas: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            format: function (item, category) {
                return category + '日 ' + item.name + ':' + item.data
            }
        });
    },
    createSimulationData: function () {
        let categories = [];
        let data = [];
        for (let i = 1; i < 31; i++) {
            categories.push(i);
        }
        return {
            categories: categories,
            data: data
        }
    },
    drawLine: function () {
        let windowWidth = 100;
        try {
            let res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
        }
        let lines = this.data.lines;

        if (lines.length !== 0) {
            let simulationData = this.createSimulationData();
            // 折线图
            lineChart = new wxCharts({
                canvasId: 'lineCanvas',
                type: 'line',
                categories: simulationData.categories,
                animation: true,
                series: [{
                    name: '支出',
                    data: lines,
                    format: function (val, name) {
                        return val.toFixed(2) + '元';
                    }
                }],
                xAxis: {
                    disableGrid: true
                },
                yAxis: {
                    title: '',
                    format: function (val) {
                        return val.toFixed(2);
                    },
                    min: 0
                },
                width: windowWidth,
                height: 200,
                dataLabel: false,
                dataPointShape: true,

                extra: {
                    lineStyle: 'curve',
                }
            });
        }
        wx.hideLoading();
    },
    formatData(data) {
        let lines = [], // 保存折线图的横纵坐标,一共 31 个元素, 下标表示日,值表示消费或支出
            rankings = [],  // 排行列表
            uniqueSelection = new Set(), // 存储唯一的iconSelected
            uniqueSelections = [],   // 存储唯一的iconSelected
            total = 0;    // 总金额
        // 初始化每一天的值为 0
        for (let i = 0; i < 31; i++) {
            lines[i] = 0;
        }

        data.map((item) => uniqueSelection.add(item.iconSelected));
        uniqueSelections = Array.from(uniqueSelection);

        // 初始化 rankings
        uniqueSelections.map((item) => rankings.push({iconSelected: item, len: 0, name: '', money: 0}));

        data.map((item) => {
            let day = new Date(item.date).getDate(),   // 将每一天的消费或支出添加到对应下标的数组中
                iconSelected = item.iconSelected,
                type = item.type;

            total += item.money;    // 总金额计算
            lines[day - 1] += item.money;   // 将日期和每天的支出收入如匹配

            // 查找 iconSelected 在 uniqueSelections 的下标
            let index = uniqueSelections.indexOf(item.iconSelected);

            if (index > -1) {
                rankings[index].len += 1;
            } else {
                rankings[index].len = 1;
            }

            if (type === 0) {
                rankings[index].name = c_out[iconSelected].text;
            }
            if (type === 1) {
                rankings[index].name = c_in[iconSelected].text;
            }

            rankings[index].money += item.money;

        });
        return {
            lines,
            rankings,
            total
        };

    },
    loadData: function (that) {
        wx.showLoading({
            title: '数据加载中...',
        });
        that.setData({
            rankings: {}
        });
        let {year, month} = that.data.date;
        let data = {
            tel: users.tel,
            type: that.data.current,
            date: year + "-" + month
        };
        api.getBills(data).then((res) => {
            let data = that.formatData(res);
            that.setData({
                lines: data.lines,
                rankings: data.rankings,
                total:data.total
            });
            that.drawLine();
        }).catch((errMsg) => {
            console.log(errMsg);
        });
    }
});