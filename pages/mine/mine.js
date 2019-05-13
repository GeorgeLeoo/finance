// pages/mine/mine.js
var config = require('./../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    avatar:'',
    mines: [{
        class: '',
        icon: './../../images/mine/setting_category.svg',
        text: '类别设置',
        url: './../catelogsetting/catelogsetting'
      },
      {
        class: 'bottom10',
        icon: './../../images/mine/setting_password.svg',
        text: '密码设置',
        url: './../forget/forget'
      },
      {
        class: '',
        icon: './../../images/mine/setting_help.svg',
        text: '常见问题',
        url: ''
      },
      {
        class: '',
        icon: './../../images/mine/setting_advice.svg',
        text: '意见反馈',
        url: ''
      },
      {
        class: 'bottom10',
        icon: './../../images/mine/setting_about.svg',
        text: '关于家庭记账系统',
        url: './../about/about'
      },
      // {
      //   class: 'bottom10',
      //   icon: './../../images/mine/setting_logout.svg',
      //   text: '退出账号',
      //   url: './../login/login'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '',
    })
    console.log(getApp().globalData);
    this.setData({
      nickname: getApp().globalData.users.nickname,
      avatar: "http://"+config.host+"/"+getApp().globalData.users.avatarUrl,
      host:config.host
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (getApp().globalData.isUpdateNickName){
      this.setData({
        nickname: getApp().globalData.users.nickname
      })
      getApp().globalData.isUpdateNickName = false;
    }
    if (getApp().globalData.isUpdateAvatar){
      this.setData({
        avatar: getApp().globalData.users.avatarUrl
      })
      getApp().globalData.isUpdateAvatar = false;
    }
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
  handleLogout:function(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出当前账号？',
      success:(res)=>{
        if(res.confirm){
          wx.redirectTo({
            url: './../login/login',
          })
        }
      }
    })
  }
})