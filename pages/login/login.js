// pages/login/login.js
var config = require('./../../config/config.js');
var utils = require('./../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flg_loginbtn: true,
    users: {
      tel: '',
      pwd: ''
    }
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
      title: '家庭记账系统-登录',
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
  /**
   * 监听手机号输入框
   */
  watchTel: function(e) {
    var users = this.data.users;
    var tel = e.detail.value;
    var flg_loginbtn = true;

    users.tel = tel;

    if (tel !== '' && this.data.users.pwd !== '') {
      flg_loginbtn = false;
    } else {
      flg_loginbtn = true;
    }

    this.setData({
      users,
      flg_loginbtn,
    });
  },
  /**
   * 监听密码输入框
   */
  watchPwd: function(e) {
    var users = this.data.users;
    var pwd = e.detail.value;
    var flg_loginbtn = true;

    users.pwd = pwd;

    if (this.data.users.tel !== '' && pwd !== '') {
      flg_loginbtn = false
    } else {
      flg_loginbtn = true
    }

    this.setData({
      users,
      flg_loginbtn
    });
  },
  /**
   * 登录
   */
  handleLogin: function(e) {
    var that = this;
    if(!utils.validateTel(this.data.users.tel)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel:false
      })
      return;
    }
    wx.showLoading({
      title: '正在登录...',
    });
    wx.request({
      url: config.url.users.login,
      method: config.method.post,
      data: this.data.users,
      success:function(res){
        console.log(res.data)
        
        var title = '';
        var duration= 1000;
        if (res.data.code === 0){
          var users = res.data.data;
          console.log(users);
          // users.pwd = '';
          getApp().globalData.users = users;
          getApp().globalData.isLogin = true;
          
          wx.switchTab({
            url: './../bill/bill',
          })
          
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete:function(){
        wx.hideLoading();
      }
    });
    
  },
  handleWXLogin:function(){
    wx.login({
      success:(res)=>{
        console.log(res);
        if(res.code){
          // wx.request({
          //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.appid + '&secret=' + config.secret+'&js_code='+res.code+'&grant_type=authorization_code',
          //   // url: config.url.codeSession,
          //   method: config.method.get,
          //   success: (res) => {
          //     console.log(res.data);
          //   }
          // })
          wx.request({
            url: config.url.codeSession,
            method:config.method.post,
            data:{
              code: res.code,
            },
            success:(res)=>{
              console.log(res.data);
              wx.setStorageSync('user', res.data.data);
            }
          })
        }
      }
    })
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })
  }
})