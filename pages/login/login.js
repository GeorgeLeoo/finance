// pages/login/login.js
import Utils from '../../utils/index'
import {validatorForm} from "../../utils/validator";
import Jex from "../../lib/jex/index";
import Config from "../../config/config";
import {logo, wechat} from '../../icon/icon'

const api = require('./../../http/api.js')

Page({
    data: {
        canLogin: true,
        user: {
            tel: '18921483103',
            pwd: '1234'
        },
        INPUT_TYPE_MAP: {
            PHONE: 'PHONE',
            PASSWORD: 'PASSWORD',
        },
        logo,
        wechat
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
        const {tel, pwd} = this.data.user

        const rules = [
            {value: tel, validator: Utils.validateTel},
            {value: pwd, validator: Utils.validatePwd},
        ]

        const validator = validatorForm(rules)
        if (!validator) {
            return
        }

        wx.showLoading({title: '正在登录...',})

        Jex.User().login(tel, pwd).then((data) => {
            wx.showToast({ title: '登陆成功', duration: 1000 })

            wx.setStorageSync(Config.TOKEN_STORAGE_KEY, data)

            setTimeout(() => {
                wx.switchTab({
                    url: './../bill/bill',
                })
            }, 500)
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
