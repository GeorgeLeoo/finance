// pages/catelogsetting/catelogsetting.js
var utils = require('./../../utils/util.js');
var config = require('./../../config/config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    showtimes: 0,
    showDel: false,
    catelogs_in: [],
    catelogs_out: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '分类设置',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.setData({
    //   catelogs_in: [],
    //   catelogs_out: []
    // });
    // console.log(getApp().globalData.c_out);
    this.loadData();
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
  outClick: function() {
    this.setData({
      current: 0
    });
  },
  inClick: function() {
    this.setData({
      current: 1
    });
  },
  changeCurrent: function(e) {
    this.setData({
      current: e.detail.current
    });
  },
  addCatalog: function() {
    switch (this.data.current) {
      case 0:
        this.toAddCatalogPage(0);
        break;
      case 1:
        this.toAddCatalogPage(1);
        break;
    }
  },
  toAddCatalogPage: function(current) {
    wx.navigateTo({
      url: './../addcatalog/addcatalog?current=' + current,
    })
  },
  loadData: function() {
    
    // bug:要对getApp中的数据进行拷贝
    var catelogs_out = [];
    var catelogs_in = [];
    Object.assign(catelogs_out, app.globalData.c_out);
    Object.assign(catelogs_in, app.globalData.c_in);
  
    wx.request({
      url: config.url.catalog.catalog,
      method: config.method.get,
      data: {
        tel: getApp().globalData.users.tel
      },
      success: (res) => {
        if (res.data.code === 0) {
          var data = res.data.data;
        //   console.log(data);
          for (var i = 0; i < data.length; i++) {
            data[i].data.id = data[i]._id;
            
            
            if (data[i].type === 0) {
              catelogs_out.push(data[i].data);
            }
            if (data[i].type === 1) {
              catelogs_in.push(data[i].data);
            }
          }
          this.setData({
            catelogs_in,
            catelogs_out
          });
        }
      }
    })
  },
  handleDelBtn: function(e) {
    // console.log(e);
    this.setData({
      showDel: !this.data.showDel
    });
  },
  handleDel: function(e) {
    wx.showLoading({
      title: '删除中...',
    })
    wx.request({
      url: config.url.catalog.delCatalog,
      method: config.method.post,
      data: {
        _id: e.target.dataset.id
      },
      success: (res) => {
        // console.log(res.data);
        if (res.data.code === 0) {
          this.loadData();
          wx.hideLoading();
          wx.showToast({
            title: '删除成功',
          })
        }
      }
    })
  }
})