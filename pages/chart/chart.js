// pages/chart/chart.js
var utils = require('./../../utils/util.js');
var config = require('./../../config/config.js');
var wxCharts = require('./../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    date: {
      year: utils.getYear(),
      month: utils.getMonth()
    },
    rankings: {
      all: 0,
      money: 0,
      list: [],
      linearr: []
    },
    isShowLineHidePan: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '',
    });
    this.loadData(this);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '图表'
    });
    wx.hideLoading();

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
  bindDateChange(e) {
    console.log()
    var date = e.detail.value;
    var arr = date.split('-');
    this.setData({
      date: {
        year: arr[0],
        month: arr[1]
      }
    });
    // this.loadData(this);
  },
  handleChange(e) {
    console.log(e.target.dataset)
    var current = parseInt(e.target.dataset.current);
    this.setData({
      current
    });
    this.loadData(this);
  },
  touchHandlerLineCanvas: function(e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + '日 ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function() {
    var categories = [];
    var data = [];
    for (var i = 1; i < 31; i++) {
      categories.push(i);
    }
    return {
      categories: categories,
      data: data
    }
  },
  updateData: function() {

  },
  touchHandlerPieCanvas: function(e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  drawLine:function() {
    var windowWidth = 100;
    try {
      var res = wx.getSystemInfoSync();
      console.log(res);
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var rankings = this.data.rankings;
    console.log(rankings);

    if(rankings.linearr.length !== 0){
      var simulationData = this.createSimulationData();
      // 折线图
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: simulationData.categories,
        animation: true,
        // background: 'red',
        // color:'red',
        series: [{
          name: '支出',
          data: rankings.linearr,
          format: function (val, name) {
            return val.toFixed(2) + '元';
          }
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          title: '',
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: true,

        extra: {
          lineStyle: 'curve',
        }
      });
    }
    
    wx.hideLoading();
  },
  drawFan() {
    var windowWidth = 100;
    try {
      var res = wx.getSystemInfoSync();
      console.log(res);
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var rankings = this.data.rankings;
    // console.log(rankings);

    if(rankings.list.length !== 0){
      var simulationData = this.createSimulationData();
      // 扇形图
      pieChart = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas',
        type: 'pie',
        series: rankings.list,
        width: windowWidth,
        height: 300,
        dataLabel: true,
      });
    }
    wx.hideLoading();
  },
  handleChangeChart: function() {
    // console.log(e);
    this.setData({
      isShowLineHidePan: !this.data.isShowLineHidePan
    },()=>{
      if(this.data.isShowLineHidePan){
        this.drawLine();
      }else{
        this.drawFan();
      }
    });
  },
  loadData: function(that) {
    wx.showLoading({
      title: '数据加载中...',
    })
    that.setData({
      rankings: {}
    });
    // console.log(that.data.current);
    wx.request({
      url: config.url.finance.bill,
      method: config.method.get,
      data: {
        tel: app.globalData.users.tel,
        type: that.data.current,
        date: that.data.date.year + "-" + that.data.date.month
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.code === 0) {
          var data = res.data.data;
          if (res.data.length !== 0) {
            console.log(data);
            var arr = [];
            var linearr = [];
            for (var k = 1; k < 32; k++) {
              linearr[k - 1] = 0;
            }
            var money = 0;
            for (var i = 0; i < data.length; i++) {
              var obj = {};
              obj.items = [];
              obj.data = 0;
              //2018-12-34
              var month = parseInt(data[i].date.substring(8, 10));
              // console.log(data[i].money);
              linearr[month - 1] += data[i].money;
              var flg = false;
              if (arr.length === 0) {
                money += data[i].money;
                obj.data = data[i].money;
                obj.type = data[i].type;
                obj.iconSelected = data[i].iconSelected;
                if (obj.type === 0) {
                  obj.name = app.globalData.c_out[obj.iconSelected].text;
                }
                if (obj.type === 1) {
                  obj.name = app.globalData.c_in[obj.iconSelected].text;
                }
                obj.items.push(data[i]);
                arr.push(obj);
              } else {
                for (var j = 0; j < arr.length; j++) {
                  if (arr[j].iconSelected === data[i].iconSelected) {
                    money += data[i].money;
                    arr[j].data += data[i].money;
                    arr[j].items.push(data[i]);
                    flg = true;
                    break;
                  }
                }
                if (!flg) {
                  money += data[i].money;
                  obj.data = data[i].money;
                  obj.type = data[i].type;
                  obj.iconSelected = data[i].iconSelected;
                  if (obj.type === 0) {
                    obj.name = app.globalData.c_out[obj.iconSelected].text;
                  }
                  if (obj.type === 1) {
                    obj.name = app.globalData.c_in[obj.iconSelected].text;
                  }
                  obj.items.push(data[i]);

                  arr.push(obj);
                }
              }
            }
            that.setData({
              rankings: {
                money: money,
                all: data.length,
                list: arr,
                linearr
              }
            });
            // console.log(that.data.rankings);
            // that.drawCharts();
            if(that.data.isShowLineHidePan){
              that.drawLine();
            }else{
              that.drawFan();
            }
          } else {
            wx.hideLoading();
          }

        }
      }
    })
  }
})