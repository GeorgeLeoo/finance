// pages/catelogsetting/catelogsetting.js
const api = require('./../../http/api.js');
let {c_out, c_in, users} = getApp().globalData;
Page({

    data: {
        current: 0,
        showtimes: 0,
        showDel: false,
        categories_in: [],
        categories_out: []
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '分类设置',
        })
        this.loadData();
    },
    onShow: function () {
        if (getApp().globalData.isRefreshCategories) {
            // let globalData = getApp().globalData;
            // c_out = globalData.c_out;
            // c_in = globalData.c_in;
            this.loadData();
            getApp().globalData.isRefreshCategories = false
        }
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
    addCatalog: function () {
        switch (this.data.current) {
            case 0:
                this.toAddCatalogPage(0);
                break;
            case 1:
                this.toAddCatalogPage(1);
                break;
        }
    },
    toAddCatalogPage: function (current) {
        wx.navigateTo({
            url: './../addcatalog/addcatalog?current=' + current,
        })
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
    handleDelBtn: function (e) {
        this.setData({
            showDel: !this.data.showDel
        });
    },
    handleDel: function (e) {
        wx.showLoading({
            title: '删除中...',
        });
        const id = e.target.dataset.id;
        api.delCategories(id).then((res) => {
            console.log(res);
            let {current, categories_in, categories_out} = this.data;
            current === 0
                ? categories_out.map((item, index) => item.id === id ? categories_out.splice(index, 1) : null)
                : categories_in.map((item, index) => item.id === id ? categories_in.splice(index, 1) : null);
            this.setData({
                categories_in,
                categories_out
            })
        }).catch((errMsg) => {
            console.log(errMsg);
        });
    }
})