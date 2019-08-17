// pages/addcatalog/addcatalog.js
const api = require('./../../http/api.js');

let {c_out, c_in} = getApp().globalData;
Page({
    data: {
        iconSelected: 0,
        name: ''
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '',
        })
        this.setData({
            current: parseInt(options.current)
        });
        if (options.current == 0) {
            this.setData({
                icons: getApp().globalData.c_out
            });
        }
        if (options.current == 1) {
            this.setData({
                icons: getApp().globalData.c_in
            });
        }
    },
    onReady: function () {
        wx.hideLoading();
        wx.setNavigationBarTitle({
            title: '新增支出类别',
        })
    },
    iconClick: function (e) {
        this.setData({
            iconSelected: e.target.dataset.id
        });
    },
    watchName: function (e) {
        this.setData({
            name: e.detail.value
        });
    },
    saveClick: function () {
        var key = '';
        var that = this;
        const data = {
            tel: getApp().globalData.users.tel,
            type: this.data.current,
            data: {
                text: that.data.name,
                icon: that.data.icons[that.data.iconSelected].icon
            }
        };
        api.saveCategories(data).then((res) => {
            wx.navigateBack({
                delta: 1
            });
            getApp().globalData.isRefreshCategories = true;
        }).catch((errMsg) => {
            console.log(errMsg);
        });
    }
});