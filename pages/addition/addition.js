// pages/addition/addition.js
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
    data_out: {
      date: utils.getDate(),
      getWeek: utils.getWeek(),
      iconSelected: 0,
      notes: '',
      money: 0,
    },
    data_in: {
      date: utils.getDate(),
      getWeek: utils.getWeek(),
      iconSelected: 0,
      notes: '',
      money: 0,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '记一笔',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.setData({
    //   catelogs_in: getApp().globalData.c_out,
    //   catelogs_out: getApp().globalData.c_in
    // });

    var catelogs_out = [];
    var catelogs_in = [];
    Object.assign(catelogs_out, app.globalData.c_out);
    Object.assign(catelogs_in, app.globalData.c_in);
    console.log(catelogs_out);
    wx.request({
      url: config.url.catalog.catalog,
      method: config.method.get,
      data: {
        tel: app.globalData.users.tel
      },
      success: (res) => {
        if (res.data.code === 0) {
          var data = res.data.data;
          // console.log(data);
          for (var i = 0; i < data.length; i++) {
            data[i].data.id = data[i]._id;


            if (data[i].type === 0) {
              catelogs_out.push(data[i].data);
            }
            if (data[i].type === 1) {
              catelogs_in.push(data[i].data);
            }
          }
          console.log(this.data);
          console.log(app);
          this.setData({
            catelogs_in,
            catelogs_out
          });
        }
      }
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
  bindDateChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var data_out = this.data.data_out;
    var data_in = this.data.data_in;
    if (this.data.current === 0) {
      data_out.date = e.detail.value;
      data_out.getWeek = utils.getWeek(e.detail.value);
      this.setData({
        data_out
      })
    } else {
      data_in.date = e.detail.value;
      data_in.getWeek = utils.getWeek(e.detail.value);
      this.setData({
        data_in
      })
    }
  },
  iconClick: function(e) {
    // console.log('current: ',this.data.current);
    var data_out = this.data.data_out;
    var data_in = this.data.data_in;
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
  watchNotes: function(e) {
    var data_out = this.data.data_out;
    var data_in = this.data.data_in;
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
  watchMoney: function(e) {
    var data_out = this.data.data_out;
    var data_in = this.data.data_in;
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
  handleSave: function(e) {
    wx.showLoading({
      title: '',
    })
    console.log(this.data)
    var data = this.data;
    console.log(data);
    var sendData;
    if (data.current === 0) {
      sendData = data.data_out;
    } else {
      sendData = data.data_in;
    }
    sendData.tel = getApp().globalData.users.tel;
    sendData.type = data.current;
    console.log(sendData);
    wx.request({
      url: config.url.finance.saveBill,
      method: config.method.post,
      data: sendData,
      success: function(res) {
        console.log(res.data)
        if (res.data.code === 0) {
          getApp().globalData.isBackToBill = true;
          wx.switchTab({
            url: './../bill/bill',
          })
        }
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  }
})