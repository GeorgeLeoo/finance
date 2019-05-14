// pages/register/register.js
var config = require('./../../config/config.js');
var utils = require('./../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        users: {
            tel: '',
            pwd: ''
        },
        verifyCode: '',
        flg_regbtn: true,
        flg_verifybtn: true,
        isVerify: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(this.data)
        wx.setNavigationBarTitle({
            title: '新用户注册',
        })
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
    watchTel: function(e) {
        this.handleWatch({
            e,
            type: 'tel'
        });
    },
    watchVerifyCode: function(e) {
        this.handleWatch({
            e,
            type: 'code'
        });
    },
    watchPwd: function(e) {
        this.handleWatch({
            e,
            type: 'pwd'
        });   
    },
    handleWatch: function({
        e,
        type
    }) {
        console.log(type)
        var data = this.data;
        var users = data.users;
        var val = e.detail.value;
        var flg_regbtn = true;
        var flg_verifybtn;
        var key = '';

        if (type === 'tel') {
            key = 'pwd';
            //如果手机号正确，则将“获取验证码”按钮设可以点击
            if (utils.validateTel(val)) {
                flg_verifybtn = false;
                if (data.verifyCode !== '' && users.pwd !== '') {
                    flg_regbtn = false;
                } else {
                    flg_regbtn = true;
                }
            } else {
                flg_verifybtn = true;
                flg_regbtn = true;
            }
            users[type] = val;
            data = {
                users,
                flg_verifybtn,
                flg_regbtn
            };
        }
        if (type === 'pwd') {
            key = 'tel';
            if (val !== '') {
                flg_regbtn = false;
            } else {
                flg_regbtn = true;
            }
            users[type] = val;
            data = {
                users,
                flg_regbtn
            };
        }

        if (type === 'code') {
            if (val === '') {
                flg_regbtn = true;
            } else {
                if (users.tel !== '' && users.pwd != '') {
                    flg_regbtn = false;
                } else {
                    flg_regbtn = true;
                }
            }

            data = {
                verifyCode: val,
                flg_regbtn
            }
        }

        this.setData(data);
    },
    handleRegister: function(e) {
        if (!utils.validateTel(this.data.users.tel)) {
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号',
                showCancel: false
            })
            return;
        }
        wx.showLoading({
            title: '正在注册...',
        });
        wx.request({
            url: config.url.users.register,
            method: config.method.post,
            data: this.data.users,
            success: function(res) {
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
                    });
                }
            },
            fail: function(e) {
                wx.showToast({
                    title: '注册失败',
                    icon: 'none',
                    duration: 2000
                })
            },
            complete: function() {
                wx.hideLoading();
            }
        })
    },

})