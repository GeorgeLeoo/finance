// pages/forget/forget.js
var config = require('./../../config/config.js');
var utils = require('./../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    users: {
      tel: '',
      pwd: ''
    },
    // 验证码
    verifyCode: '',
    // 忘记密码按钮的状态
    flg_forgetbtn: true,
    // 获得验证码按钮的状态
    flg_verifybtn: true,
    // 验证码是否验证成功
    isVerify: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '修改密码',
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
  /**
   * 监听手机号
   */
  watchTel: function (e) {
    // 用户信息
    var users = this.data.users;
    
    // 发送验证码和确定密码按钮的初始值为false
    var flg_forgetbtn = true;
    var flg_verifybtn = true;

    // 监听输入的手机号
    var tel = e.detail.value;
    // 把监听到的手机号赋给users
    users.tel = tel;

    // 判断监听到的手机号，data中的pwd，verifyCode是否为空，验证码是否验证
    if (tel !== '' && this.data.users.pwd !== '' && this.data.users.verifyCode !== '' && this.data.isVerify === true) {
      flg_forgetbtn = false;
    } else {
      flg_forgetbtn = true;
    }

    // 电话收否为空
    if (tel !== '') {
      flg_verifybtn = false;
    } else {
      flg_verifybtn = true;
    }

    // 将状态保存到data
    this.setData({
      users,
      flg_forgetbtn,
      flg_verifybtn
    });
  },
  // 监听验证码
  watchVerifyCode: function (e) {
    this.setData({
      verifyCode: e.detail.value
    });
  },
  // 监听密码
  watchPwd: function (e) {
    var users = this.data.users;
    var pwd = e.detail.value;
    var flg_forgetbtn = true;

    users.pwd = pwd;

    if (this.data.users.tel !== '' && pwd !== '' && this.data.users.verifyCode !== '' && this.data.isVerify === true) {
      flg_forgetbtn = false
    } else {
      flg_forgetbtn = true
    }

    this.setData({
      users,
      flg_forgetbtn
    });
  },
  // 忘记密码按钮处理
  handleForgetpwd:function(){
    if (!utils.validateTel(this.data.users.tel)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
      return;
    }
    wx.showLoading({
      title: '正在修改...',
    });
    wx.request({
      url: config.url.users.forgetpwd,
      method: config.method.post,
      data: this.data.users,
      success: function (res) {
        console.log(res.data);
        
        if (res.data.code === 0) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        
      },
      complete: function () {
        wx.hideLoading();
      },
      fail:function(e){
        wx.showToast({
          title: '密码修改失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})