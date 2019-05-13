// pages/bill/bill.js
var utils = require('./../../utils/util.js');
var config = require('./../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: {
      getMoney: 0,
      useMoney: 0,
      restMoney: 0,
    },
    list: [],
    date:{
      year: utils.getYear(),
      month: utils.getMonth()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showLoading({
      title: '数据努力加载中',
      // duration: 1000
    })
    // setTimeout(()=>{
      // this.loadData(this);
      // wx.hideLoading();
    // },1000);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.hideLoading();
    wx.setNavigationBarTitle({
      title: '账单'
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (getApp().globalData.isBackToBill) {
      this.loadData(this);
      getApp().globalData.isBackToBill = false;
    }
    if (getApp().globalData.isLogin){
      this.loadData(this);
      getApp().globalData.isLogin = false;
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
    var that = this;
    wx.startPullDownRefresh({
      success: function () {
        that.loadData(that);
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    });
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
  bindDateChange(e) {
    console.log()
    var date = e.detail.value;
    var arr = date.split('-');
    this.setData({
      date:{
        year:arr[0],
        month:arr[1]
      }
    });
    this.loadData(this);
  },
  loadData:function(that){
    that.setData({
      money: {
        getMoney: 0,
        useMoney: 0,
        restMoney: 0,
      },
      list: []
    })
    wx.request({
      url: config.url.finance.bill,
      data: {
        tel: getApp().globalData.users.tel,
        date: that.data.date.year + "-" + that.data.date.month
      },
      success: function (res) {
        var data = res.data.data;
        console.log(data);

        var getMoney = 0;
        var useMoney = 0;
        var restMoney = 0;
        var arr = [];

        for (var i = 0; i < data.length; i++) {
          var obj = {};
          obj.items = [];
          obj.getMoney = 0;
          obj.useMoney = 0;

          // data[i].bgcolor = utils.randomColor();

          if (data[i].type === 0) {
            useMoney += data[i].money;
            // console.log(data[i]);
            // console.log(getApp().globalData.c_out[data[i].iconSelected].text)
            data[i].text = getApp().globalData.c_out[data[i].iconSelected].text
          }
          if (data[i].type === 1) {
            getMoney += data[i].money;
            data[i].text = getApp().globalData.c_in[data[i].iconSelected].text
          }


          var flg = false;
          if (arr.length === 0) {
            obj.createAt = data[i].createAt;
            obj.date = data[i].date;
            obj.week = data[i].getWeek;
            if (data[i].type === 0) {
              obj.useMoney = data[i].money;
            }
            if (data[i].type === 1) {
              obj.getMoney = data[i].money;
            }
            obj.items.push(data[i]);
            arr.push(obj);
          } else {
            for (var j = 0; j < arr.length; j++) {
              if (arr[j].date === data[i].date) {
                if (data[i].type === 0) {
                  arr[j].useMoney += data[i].money;
                }
                if (data[i].type === 1) {
                  arr[j].getMoney += data[i].money;
                }
                // var array = [];
                // var items = arr[j].items;
                // console.log(items);
                // for (var i = 0; i < items.length; i++) {
                //   array[i].dateTime = (new Date(items[i].date)).getTime();
                // }
                // array.sort(function (a, b) {
                //   return b.dateTime - a.dateTime > 0;
                // });
                arr[j].items.push(data[i]);
                flg = true;
                break;
              }
            }
            if (!flg) {
              obj.createAt = data[i].createAt;
              obj.date = data[i].date;
              obj.week = data[i].getWeek;
              if (data[i].type === 0) {
                obj.useMoney = data[i].money;
              }
              if (data[i].type === 1) {
                obj.getMoney = data[i].money;
              }
              
              obj.items.push(data[i]);
              arr.push(obj);
            }
          }
        }
        restMoney = getMoney - useMoney;
        for (var i = 0; i < arr.length; i++) {
          arr[i].dateTime = (new Date(arr[i].date)).getTime();
        }
        arr.sort(function (a, b) {
          return b.dateTime - a.dateTime >0;
        });
        
        that.setData({
          money: {
            getMoney,
            useMoney,
            restMoney
          },
          list: arr
        });
        console.log(that.data);
        wx.hideLoading();
      }
    })
  },
  handleDelete(e){
    var id = e.target.dataset.id;
    console.log(id);

    var that = this;
    wx.showModal({
      title: '警告',
      content: '您确定要删除此条记录',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '',
          })
          that.del(that,id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  del(that,id){
    wx.request({
      url: config.url.finance.del,
      method:config.method.get,
      data:{
        _id:id
      },
      success:function(res){
        console.log(res.data);
        if(res.data.code === 0){
          that.loadData(that);
          wx.showToast({
            title: '删除成功',
            duration:1000
          })
        }
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  handleModify(e){
    console.log(e.target.dataset);
    wx.navigateTo({
      url: './../modify/modify?id='+e.target.dataset.id,
    })
  }
})