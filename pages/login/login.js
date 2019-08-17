// pages/login/login.js
const config = require('./../../config/config.js');
const utils = require('./../../utils/util.js');
const api = require('./../../http/api.js');

Page({
    data: {
        flg_loginbtn: true,
        users: {
            tel: '',
            pwd: ''
        }
    },

    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '家庭记账系统-登录',
        })
    },

    /**
     * 监听手机号输入框
     */
    watchTel: function (e) {
        this.handleWatch({
            e,
            type: 'tel'
        });
    },
    /**
     * 监听密码输入框
     */
    watchPwd: function (e) {
        this.handleWatch({
            e,
            type: 'pwd'
        });
    },
    /**
     * 公共监听处理input
     */
    handleWatch: function ({e, type}) {
        const data = this.data;
        const users = data.users;
        const val = e.detail.value;
        let flg_loginbtn = true;
        let key = '';

        if (type === 'pwd') {
            key = 'tel';
        }
        if (type === 'tel') {
            key = 'pwd';
        }

        users[type] = val;

        (data.users[key] !== '' && val !== '') ? (flg_loginbtn = false) : (flg_loginbtn = true);

        this.setData({
            users,
            flg_loginbtn
        });
    },
    _login: function (data) {
        api.login(data)
            .then((res) => {
                let user = res[0];
                let avatarUrls = user.avatarUrl.split("");
                avatarUrls.splice(11, 13);
                let avatarUrl = avatarUrls.join("");
                user.avatarUrl = avatarUrl;
                getApp().globalData.users.avatarUrl = avatarUrl;
                getApp().globalData.users = user;
                getApp().globalData.isLogin = true;

                wx.switchTab({
                    url: './../bill/bill',
                })
            })
            .catch((errMsg) => {
                console.log(errMsg);
                wx.showToast({
                    title: errMsg,
                    icon: 'none',
                    duration: 2000
                })
            });
    },
    /**
     * 登录
     */
    handleLogin: function (e) {
        // 手机号验证
        if (!utils.validateTel(this.data.users.tel)) {
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号',
                showCancel: false
            });
            return;
        }
        wx.showLoading({
            title: '正在登录...',
        });
        // 获取 token
        api.getToken(this.data.users.tel)
            .then((res) => {
                // 存储 token 信息
                wx.setStorageSync('token', res);
                // 登录
                this._login(this.data.users)
            })
            .catch((errMsg) => {
                wx.showToast({
                    title: 'token失效'
                });
                console.log(errMsg);
            });
    },

    handleWXLogin: function () {
        wx.login({
            success: (res) => {
                // console.log(res);
                if (res.code) {
                    wx.request({
                        url: config.url.codeSession,
                        method: config.method.post,
                        data: {
                            code: res.code,
                        },
                        success: (res) => {
                            // console.log(res.data);
                            wx.setStorageSync('user', res.data.data);
                        }
                    })
                }
            }
        })
    }
});