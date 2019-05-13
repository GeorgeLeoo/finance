// pages/addcatalog/addcatalog.js
var utils = require('./../../utils/util.js');
var config = require('./../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconSelected: 0,
    name: ''
    // icons
    // current
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '',
    })
    this.setData({
      current: parseInt(options.current)
    });
    var that = this;
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading();
    wx.setNavigationBarTitle({
      title: '新增支出类别',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  iconClick: function(e) {
    this.setData({
      iconSelected: e.target.dataset.id
    });
  },
  watchName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  saveClick: function() {
    var key = '';
    var that = this;
    // var type = 0;
    // if (this.data.current === 0) {
    //   type = 0;
    // }
    // if (this.data.current === 1) {
    //   type = 1;
    // }
    wx.request({
      url: config.url.catalog.saveCatalog,
      method: config.method.post,
      data: {
        tel: getApp().globalData.users.tel,
        type: this.data.current,
        data: {
          text: that.data.name,
          icon: that.data.icons[that.data.iconSelected].icon
        }
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.code === 0) {
          wx.navigateBack({
            delta: 1
          });
        }
      }
    })
    // wx.getStorage({
    //   key: key,
    //   success: function(res) {
    //     console.log(res.data);
    //     res.data.push({
    //       text: that.data.name,
    //       icon_normal: that.data.icons[that.data.iconSelected].icon_normal,
    //       icon_click: that.data.icons[that.data.iconSelected].icon_click,
    //     });
    //     wx.setStorage({
    //       key: key,
    //       data: res.data,
    //       success: function() {

    //       }
    //     });
    //   },
    // });
  }
})