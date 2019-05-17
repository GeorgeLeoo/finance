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
    },
    datall:{
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
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '数据拼命加载中',
    // })
    var catelogs_out = [];
    var catelogs_in = [];
    Object.assign(catelogs_out, app.globalData.c_out);
    Object.assign(catelogs_in, app.globalData.c_in);
    
    wx.request({
      url: config.url.catalog.catalog,
      method: config.method.get,
      data: {
        tel: app.globalData.users.tel,
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
          this.setData({
            catelogs_in,
            catelogs_out
          });
          // setTimeout(()=>{
          //   wx.hideLoading();
          // },2000);
        }
      }
    });
    wx.request({
      url: config.url.finance.getDataById,
      data: {
        _id: options.id
      },
      success: (res) => {
        if (res.data.code === 0) {
          var d = res.data.data;
        //   console.log(d);
          var catelogs = [];
          if(res.data.data.type===0){
            catelogs = this.data.catelogs_out
          }
          if (res.data.data.type === 1) {
            catelogs = this.data.catelogs_in
          }
          this.setData({
            datall: {
              date: d.date,
              getWeek: d.getWeek,
              iconSelected: d.iconSelected,
              notes: d.notes,
              money: d.money,
              _id: options.id
            },
            current: d.type,
            catelogs
          });
          
         
        }
      }
    })
    // wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '修改账单',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  
    var datall = this.data.datall;
    datall.date = e.detail.value;
    datall.getWeek = utils.getWeek(e.detail.value);
    this.setData({
      datall
    })
  },
  iconClick: function (e) {
   
    var datall = this.data.datall;
      datall.iconSelected = e.target.dataset.id;
      this.setData({
        datall
      })
  },
  watchNotes: function (e) {
  
    var datall = this.data.datall;
    datall.notes = e.detail.value;
    this.setData({
      datall
    })

  },
  watchMoney: function (e) {
    
    var datall = this.data.datall;
    datall.money = e.detail.value;
    this.setData({
      datall
    })
  },
  handleSave: function (e) {
    wx.showLoading({
      title: '',
    })
    // console.log(this.data)
    var data = this.data;
    // console.log(data);
    var sendData;
    
    sendData = data.datall;
    sendData.tel = getApp().globalData.users.tel;
    sendData.type = data.current;
    // sendData._id = data
    // console.log(sendData);
    wx.request({
      url: config.url.finance.modifyBill,
      method: config.method.post,
      data: sendData,
      success: function (res) {
        // console.log(res.data)
        if (res.data.code === 0) {
         
          getApp().globalData.isBackToBill = true;
          wx.navigateBack({
            delta:1
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})