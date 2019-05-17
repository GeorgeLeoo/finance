// pages/search/search.js
var utils = require('./../../utils/util.js');
var config = require('./../../config/config.js');
var globalData =  getApp().globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchInput: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            c_out:  globalData.c_out,
            c_in:  globalData.c_in
        });
        var route = this.route;
         globalData.currentPath = './..'+route.substring(5, route.length );
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.setNavigationBarTitle({
            title: '搜索',
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    watchSearchInput(e) {
        this.setData({
            searchInput: e.detail.value
        });
    },
    handleDel(e) {
        this.setData({
            searchInput: ''
        });
    },
    handleSearch(e) {
        // console.log(e.detail.value);
        this.loadSearchData(e.detail.value);
    },
    loadSearchData(searchVal) {
        wx.request({
            url: config.url.finance.search,
            method: config.method.get,
            data: {
                tel:  globalData.users.tel,
                notes: searchVal
            },
            success: (res) => {
                // console.log(res.data);
                if (res.data.code === 0) {
                    this.setData({
                        lists: res.data.data
                    });
                }
            }
        })
    },
    handleModify(e) {
        // console.log(e.target.dataset);
        wx.navigateTo({
            url: './../modify/modify?id=' + e.target.dataset.id,
        })
    },
    handleDelete(e) {

        var id = e.target.dataset.id;
        // console.log(id);
        var that = this;
        wx.showModal({
            title: '警告',
            content: '您确定要删除此条记录',
            success(res) {
                if (res.confirm) {
                    // console.log('用户点击确定')
                    wx.showLoading({
                        title: '',
                    })
                    that.del(that, id);
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })
    },
    del(that, id) {
        wx.request({
            url: config.url.finance.del,
            method: config.method.get,
            data: {
                _id: id
            },
            success: function(res) {
                // console.log(res.data);
                if (res.data.code === 0) {
                    that.loadData(that);
                    wx.showToast({
                        title: '删除成功',
                        duration: 1000
                    })
                }
            },
            complete: function() {
                wx.hideLoading();
            }
        })
    },

})