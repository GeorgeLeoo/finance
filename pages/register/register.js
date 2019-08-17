// pages/register/register.js
const utils = require('./../../utils/util.js');
const api = require('./../../http/api.js');

Page({

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

    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '新用户注册',
        })
    },

    watchTel: function (e) {
        this.handleWatch({
            e,
            type: 'tel'
        });
    },
    watchVerifyCode: function (e) {
        this.handleWatch({
            e,
            type: 'code'
        });
    },
    watchPwd: function (e) {
        this.handleWatch({
            e,
            type: 'pwd'
        });
    },
    handleWatch: function ({
                               e,
                               type
                           }) {
        // console.log(type)
        let data = this.data;
        const users = data.users;
        const val = e.detail.value;
        let flg_regbtn = true;
        let flg_verifybtn;
        let key = '';

        if (type === 'tel') {
            key = 'pwd';
            //如果手机号正确，则将“获取验证码”按钮设可以点击
            if (utils.validateTel(val)) {
                flg_verifybtn = false;
                flg_regbtn = !(data.verifyCode !== '' && users.pwd !== '');
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
            flg_regbtn = (val === '');
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
                flg_regbtn = !(users.tel !== '' && users.pwd !== '');
            }

            data = {
                verifyCode: val,
                flg_regbtn
            }
        }

        this.setData(data);
    },
    handleRegister: function (e) {
        if (!utils.validateTel(this.data.users.tel)) {
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号',
                showCancel: false
            });
            return;
        }
        // if (!utils.validatePwd(this.data.users.pwd)) {
        //     wx.showModal({
        //         title: '提示',
        //         content: '1.密码必须由字母、数字、特殊符号组成，区分大小\n2.特殊符号包含（,._ ~ ! @ # $ ^ & *）\n3.密码长度为8 - 20位',
        //         showCancel: false
        //     })
        //     return;
        // }
        wx.showLoading({
            title: '正在注册...',
        });
        api.register(this.data.users)
            .then((res) => {
                wx.showToast({
                    title: '注册成功',
                    icon: 'none',
                    duration: 2000
                });
                wx.navigateBack({
                    delta: 1
                });
            })
            .catch((errMsg) => {
                wx.showToast({
                    title: errMsg,
                    icon: 'none',
                    duration: 2000
                })
            })
    },

})