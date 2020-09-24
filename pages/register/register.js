// pages/register/register.js
import Utils from '../../utils/index'
import {validatorForm} from '../../utils/validator'
import {forgetPwd, register} from '../../api/index'

const TITLE_MAP = {
    PWD: {
        title: '忘记密码',
        submitButtonText: '确定',
        quickTip: '想起密码，立即登录'
    },
    REG: {
        title: '新用户注册',
        submitButtonText: '注册',
        quickTip: '已有账号，立即登录'
    }
}

Page({

    data: {
        user: {
            tel: '18921483103',
            pwd: '1234'
        },
        verifyCode: '1234',
        canRegister: false,
        flg_verifybtn: true,
        isVerify: true,
        INPUT_TYPE_MAP: {
            PHONE: 'PHONE',
            PASSWORD: 'PASSWORD',
            CODE: 'CODE',
        },
        PAGE_TYPE_MAP: {
            PWD: 'PWD',
            REG: 'REG',
        },
        pageType: '',
        submitButtonText: '',
        quickTip: ''
    },

    onLoad: function (options) {
        const {pageType} = options
        this.pageType = pageType

        const {title, submitButtonText, quickTip} = TITLE_MAP[pageType]

        Utils.setTitle(title)

        this.setData({submitButtonText, quickTip})
    },

    /**
     * 监听输入框
     * @param detail
     * @param target
     */
    handlerWatchInput({detail, target}) {
        const value = detail.value
        const inputType = target.dataset.type
        const {PHONE, PASSWORD, CODE} = this.data.INPUT_TYPE_MAP

        const data = this.data
        const verifyCode = this.data.verifyCode
        const {tel, pwd} = data.user

        let canRegister = false

        let options = {}

        // 手机号类型
        if (inputType === PHONE) {
            canRegister = !!value && !!pwd && !!verifyCode
            options.user = {tel: value, pwd}
        }

        // 密码类型
        if (inputType === PASSWORD) {
            canRegister = !!tel && !!value && !!verifyCode
            options.user = {tel, pwd: value}
        }

        // 验证码类型
        if (inputType === CODE) {
            canRegister = !!tel && !!pwd && !!value
            options.verifyCode = value
        }

        if (canRegister !== data.canRegister) {
            options = Object.assign(options, {canRegister})
        }

        this.setData(options)
    },

    /**
     * 注册/确定 按钮
     */
    handlerSubmit() {
        const {pageType, PAGE_TYPE_MAP} = this.data

        const {tel, pwd} = this.data.user
        const verifyCode = this.data.verifyCode

        const rules = [
            // { value: verifyCode, validator: Utils.validateCode },
            {value: tel, validator: Utils.validateTel},
            {value: pwd, validator: Utils.validatePwd},
        ]

        const validator = validatorForm(rules)
        if (!validator) {
            return
        }

        if (pageType === PAGE_TYPE_MAP.REG) {
            this._handlerRegister()
        }
        if (pageType === PAGE_TYPE_MAP.PWD) {
            this._handlerForgetPwd()
        }
    },

    /**
     * 注册
     * @private
     */
    _handlerRegister() {
        wx.showLoading({ title: '正在注册...' })

        register(this.data.user).then(data => {
            console.log(data)
        })
    },

    /**
     * 忘记密码
     * @private
     */
    _handlerForgetPwd() {
        wx.showLoading({ title: '正在找回...' })

        forgetPwd(this.data.user).then(data => {
            console.log(data)
        })
    },

})
