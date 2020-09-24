// pages/addition/addition.js
import Utils from '../../utils/index'
import Config from '../../config/config'

const api = require('./../../http/api.js');
let {c_out, c_in, users} = getApp().globalData;

Page({

    data: {
        current: 0,
        showtimes: 0,
        isUpdate: false,
        data_out: {
            date: Utils.getDate(),
            getWeek: Utils.getWeek(),
            iconSelected: 0,
            notes: '',
            money: 0,
        },
        data_in: {
            date: Utils.getDate(),
            getWeek: Utils.getWeek(),
            iconSelected: 0,
            notes: '',
            money: 0,
        }
    },
    onLoad: function (options) {
        console.log(options);
        if (options.data) {
            let res = JSON.parse(options.data);
            let {type} = res;
            let data = {};
            let current = 0;
            if (type === 0) {
                current = 0;
                data.data_out = res;
                this.setData({
                    current,
                    data_out: data.data_out,
                    isUpdate: true,
                    url: options.route
                })
            } else {
                current = 1;
                data.data_in = res;
                this.setData({
                    current,
                    data_in: data.data_in,
                    isUpdate: true,
                    url: options.route
                })
            }
        }else{
            this.setData({
                url: options.route
            })
        }

    },
    formatData(data) {
        let expenseIcon = [];
        let incomeIcon = [];
        Object.assign(expenseIcon, c_out);
        Object.assign(incomeIcon, c_in);
        data.map((item) => {
            item.data.id = item._id;
            item.type === 0 ? expenseIcon.push(item.data) : incomeIcon.push(item.data);
        });
        return {
            expenseIcon,
            incomeIcon
        }
    },
    loadData: function () {
        let data = {
            tel: users.tel
        };
        api.getCategories(data).then((res) => {
            let data = this.formatData(res);
            this.setData({
                categories_in: data.incomeIcon,
                categories_out: data.expenseIcon
            })
        }).catch((errMsg) => {
            console.log(errMsg);
        });
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '记一笔',
        });
        this.loadData();
    },
    outClick: function () {
        this.setData({
            current: 0
        });
    },
    inClick: function () {
        this.setData({
            current: 1
        });
    },
    changeCurrent: function (e) {
        this.setData({
            current: e.detail.current
        });
    },
    bindDateChange(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        const data_out = this.data.data_out;
        const data_in = this.data.data_in;
        if (this.data.current === 0) {
            data_out.date = e.detail.value;
            data_out.getWeek = Utils.getWeek(e.detail.value);
            this.setData({
                data_out
            })
        } else {
            data_in.date = e.detail.value;
            data_in.getWeek = Utils.getWeek(e.detail.value);
            this.setData({
                data_in
            })
        }
    },
    iconClick: function (e) {
        // console.log('current: ',this.data.current);
        let data_out = this.data.data_out;
        let data_in = this.data.data_in;
        // console.log(e.target.dataset.id)
        if (this.data.current === 0) {
            data_out.iconSelected = e.target.dataset.id;
            this.setData({
                data_out
            })
        }
        if (this.data.current === 1) {
            data_in.iconSelected = e.target.dataset.id;
            this.setData({
                data_in
            })
        }
    },
    watchNotes: function (e) {
        let data_out = this.data.data_out;
        let data_in = this.data.data_in;
        if (this.data.current === 0) {
            data_out.notes = e.detail.value;
            this.setData({
                data_out
            })
        } else {
            data_in.notes = e.detail.value;
            this.setData({
                data_in
            })
        }

    },
    watchMoney: function (e) {
        let data_out = this.data.data_out;
        let data_in = this.data.data_in;
        if (this.data.current === 0) {
            data_out.money = e.detail.value;
            this.setData({
                data_out
            })
        } else {
            data_in.money = e.detail.value;
            this.setData({
                data_in
            })
        }
    },
    handleSave: function (e) {
        wx.showLoading({
            title: '',
        });
        let data = this.data;
        let url = '../../'+data.url;
        let sendData;
        data.current === 0 ? sendData = data.data_out : sendData = data.data_in;
        sendData.tel = users.tel;
        sendData.type = data.current;
        let method = '';
        data.isUpdate ? method = 'updateBills' : method = 'saveBills';
        api[method](sendData).then((res) => {
            getApp().globalData.isRefreshBills = true;
            console.log(url);
            wx.switchTab({
                url,
            })
        }).catch((errMsg) => {
            wx.showToast({
                duration: 3000,
                title: errMsg,
                icon: 'none',
            })
        });
    }
});
