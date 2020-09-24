// pages/bill/bill.js
import Utils from '../../utils/index'
import Config from '../../config/config'
import Jex from '../../lib/jex/index'
const api = require('./../../http/api.js');
let {currentPath, isRefreshBills} = getApp().globalData;

Page({
    data: {
        currentPage: 0,
        money: {
            getMoney: 0,
            useMoney: 0,
            restMoney: 0,
        },
        list: [],
        date: {
            year: Utils.getYear(),
            month: Utils.getMonth()
        }
    },
    onLoad: function (options) {
        Utils.setTitle('账单')
        Utils.setTheme(true)
        // wx.showLoading({
        //     title: '数据努力加载中',
        // });
        // this.loadData(this);
        const route = this.route;
        // getApp().globalData.currentPath = './..' + route.substring(5, route.length);
        currentPath = './..' + route.substring(5, route.length);
    },
    onShow: function () {
        this.getBills()
        // if (getApp().globalData.isRefreshBills) {
        //     this.loadData(this);
        //     getApp().globalData.isRefreshBills = false;
        // }

    },
    onPullDownRefresh: function () {
        const that = this;
        wx.startPullDownRefresh({
            success: function () {
                this.setData({
                    currentPage: 0
                });
                that.loadData(that);
            },
            complete: function () {
                wx.stopPullDownRefresh();
            }
        });
    },
    getBills() {
        const query = Jex.Query('bill')
    
        query.get().then(list => {
            this.setData({ list })
        })
    },
    refreshData() {
        console.log('refreshData');
        this.setData({
            currentPage: this.data.currentPage + 1
        });
        this.loadData(this);
    },
    bindDateChange(e) {
        const date = e.detail.value;
        let arr = date.split('-');
        this.setData({
            date: {
                year: arr[0],
                month: arr[1]
            }
        });
        this.loadData(this);
    },
    formatData(data) {
        // 最终的格式化后数据
        let finalData = {},
            finalList = [],
            getMoney = 0,
            useMoney = 0,
            restMoney = 0,
            {c_in, c_out} = getApp().globalData;

        // 保存不重复的日期
        let uniqueDate = new Set();
        data.map(item => uniqueDate.add(new Date(item.date).getTime()));

        // 对uniqueDate降序排序, 并保存到 uniqueDates 中
        let uniqueDates = Array.from(uniqueDate).sort(Utils.desc);
        uniqueDates.map((item, index) => uniqueDates[index] = Utils.formatDate(item));

        // 初始化 finalList
        uniqueDates.map(item => finalList.push({date: item, expense: 0, income: 0, list: []}));

        data.map((item) => {
            // 查询当前日期在uniqueDates的下标
            const index = uniqueDates.indexOf(item.date);
            // 计算总支出,总收入
            item.type === 0 ? useMoney += item.money : getMoney += item.money;
            // 计算某天的总支出,总收入
            item.type === 0 ? finalList[index].expense += item.money : finalList[index].income += item.money;
            finalList[index].week = item.getWeek;
            // 根据 type 判断当前是支出还是收入,并将 text 设置到 finalList
            let types = item.type === 1 ? c_in : c_out;
            item.text = types[item.iconSelected].text;
            // 根据index将数据添加对应date的list中
            finalList[index].list.push(item);
        });

        finalData = {
            list: finalList,
            money: {
                getMoney,
                useMoney,
                restMoney: getMoney - useMoney
            }
        };

        return finalData;
    },
    loadData: function (that) {
        let currentPage = that.data.currentPage;
        let {year, month} = that.data.date;
        api.getBills({
            tel: getApp().globalData.users.tel,
            date: year + "-" + month,
            currentPage
        }).then((res) => {
            let {list, money} = that.formatData(res);
            this.setData({
                list,
                money
            })
        }).catch((errMsg) => {
            console.log(errMsg);
        })
    },
    refresh() {
        this.loadData(this);
    }
});
