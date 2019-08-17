// pages/forget/forget.js
const config = require('./../../config/config.js');
const utils = require('./../../utils/util.js');
const api = require('./../../http/api.js');

Page({
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

    onReady: function() {
        wx.setNavigationBarTitle({
            title: '修改密码',
        })
    },

    /**
     * 监听手机号
     */
    watchTel: function(e) {
        this.handleWatch({
            e,
            type: 'tel'
        });
    },
    // 监听验证码
    watchVerifyCode: function(e) {
        // this.setData({
        //     verifyCode: e.detail.value
        // });
        this.handleWatch({e,type:'code'})
    },
    // 监听密码
    watchPwd: function(e) {
        this.handleWatch({
            e,
            type: 'pwd'
        });
    },
    /**
     * 公共监听处理
     */
    handleWatch: function({
        e,
        type
    }) {
        // console.log(type)
        let data = this.data;
        const users = data.users;
        const val = e.detail.value;
        let flg_forgetbtn = true;
        let flg_verifybtn;
        let key = '';

        if (type === 'tel') {
            key = 'pwd';
            //如果手机号正确，则将“获取验证码”按钮设可以点击
            if (utils.validateTel(val)) {
                flg_verifybtn = false;
                flg_forgetbtn = !(data.verifyCode !== '' && users.pwd !== '');
            } else {
                flg_verifybtn = true;
                flg_forgetbtn = true;
            }
            users[type] = val;
            data = {
                users,  
                flg_verifybtn,
                flg_forgetbtn
            };
        }
        if (type === 'pwd') {
            key = 'tel';
            flg_forgetbtn = (val === '');
            users[type] = val;
            data = {
                users,
                flg_forgetbtn
            };
        }

        if(type === 'code'){
            if(val === ''){
                flg_forgetbtn = true;
            }else{
                flg_forgetbtn = !(users.tel !== '' && users.pwd != '');
            }
            
            data={
                verifyCode:val,
                flg_forgetbtn
            }
        }

        this.setData(data);
    },
    // 忘记密码按钮处理
    handleForgetpwd: function() {
        if (!utils.validateTel(this.data.users.tel)) {
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号',
                showCancel: false
            })
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
            title: '正在修改...',
        });
        api.forgetPwd(this.data.users)
            .then((res)=>{
                wx.showToast({
                    title: "修改密码成功",
                    icon: 'none',
                    duration: 2000
                });
                wx.navigateBack({
                    delta: 1
                })
            })
            .catch((errMsg)=>{
                wx.showToast({
                    title: errMsg,
                    icon: 'none',
                    duration: 2000
                })
            })
    }
})