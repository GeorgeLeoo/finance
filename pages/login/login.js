// pages/login/login.js
import Utils from '../../utils/index'

const api = require('./../../http/api.js')

Page({
    data: {
        canLogin: true,
        user: {
            tel: '',
            pwd: ''
        },
        INPUT_TYPE_MAP: {
            PHONE: 'PHONE',
            PASSWORD: 'PASSWORD',
        }
    },

    onLoad() {
        Utils.setTitle('家庭记账-登录')
    },
    /**
     * 监听输入框
     * @param detail
     * @param target
     */
    handlerWatchInput({detail, target}) {
        const value = detail.value
        const inputType = target.dataset.type

        const data = this.data
        const {PHONE, PASSWORD} = data.INPUT_TYPE_MAP
        const {tel, pwd} = data.user

        let canLogin = false

        let options = {}

        // 手机号类型
        if (inputType === PHONE) {
            canLogin = !!value && !!pwd
            options.user = {tel: value, pwd}
        }

        // 密码类型
        if (inputType === PASSWORD) {
            canLogin = !!tel && !!value
            options.user = {tel, pwd: value}
        }

        // 若 canLogin 改变了，则添加 到 options
        if (canLogin !== data.canLogin) {
            options = Object.assign(options, {canLogin})
        }

        this.setData(options)
    },

    _login(data) {
        api.login(data)
            .then((res) => {
                let user = res[0]
                let avatarUrls = user.avatarUrl.split('')
                avatarUrls.splice(11, 13)
                let avatarUrl = avatarUrls.join('')
                user.avatarUrl = avatarUrl
                getApp().globalData.users.avatarUrl = avatarUrl
                getApp().globalData.users = user
                getApp().globalData.isLogin = true

                wx.switchTab({
                    url: './../bill/bill',
                })
            })
            .catch((errMsg) => {
                console.log(errMsg)
                wx.showToast({
                    title: errMsg,
                    icon: 'none',
                    duration: 2000
                })
            })
    },
    /**
     * 登录
     */
    handleLogin() {
        // 手机号验证
        if (!Utils.validateTel(this.data.users.tel)) {
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号',
                showCancel: false
            })
            return
        }
        wx.showLoading({
            title: '正在登录...',
        })
        // 获取 token
        api.getToken(this.data.users.tel)
            .then((res) => {
                // 存储 token 信息
                wx.setStorageSync('token', res)
                // 登录
                this._login(this.data.users)
            })
            .catch((errMsg) => {
                wx.showToast({
                    title: 'token失效'
                })
                console.log(errMsg)
            })
    },

    handleWXLogin() {
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
                            wx.setStorageSync('user', res.data.data)
                        }
                    })
                }
            }
        })
    }
})
