//app.js
var utils = require('./utils/util.js');
var config = require('./config/config.js');
App({
    onLaunch: function() {},

    globalData: {
        currentPath:'',
        isBackToBill: false,
        isUpdateNickName: false,
        isUpdateAvatar: false,
        isLogin: true,
        bill: {},
        users: {
            tel: '18921483103',
            pwd: '',
            nickname: '',
            avatarUrl: ''
        },
        c_out: [{
                text: '餐饮',
                icon: './../../images/main/zc_1.svg'
            },
            {
                text: '交通',
                icon: './../../images/main/zc_2.svg'
            },
            {
                text: '住房',
                icon: './../../images/main/zc_3.svg'
            },
            {
                text: '美容',
                icon: './../../images/main/zc_4.svg'
            },
            {
                text: '服饰',
                icon: './../../images/main/zc_5.svg'
            },
            {
                text: '运动',
                icon: './../../images/main/zc_6.svg'
            },
            {
                text: '旅游',
                icon: './../../images/main/zc_7.svg'
            },
            {
                text: '娱乐',
                icon: './../../images/main/zc_8.svg'
            },
            {
                text: '生活',
                icon: './../../images/main/zc_9.svg'
            },
            {
                text: '医疗',
                icon: './../../images/main/zc_10.svg'
            },
            {
                text: '通讯',
                icon: './../../images/main/zc_11.svg'
            },
            {
                text: '学习',
                icon: './../../images/main/zc_12.svg'
            },
            {
                text: '礼物',
                icon: './../../images/main/zc_13.svg'
            },
            {
                text: '母婴',
                icon: './../../images/main/zc_14.svg'
            },
            {
                text: '数码',
                icon: './../../images/main/zc_15.svg'
            },
            {
                text: '零食',
                icon: './../../images/main/zc_16.svg'
            },
            {
                text: '购物',
                icon: './../../images/main/zc_17.svg'
            },
            {
                text: '其它',
                icon: './../../images/main/zc_18.svg'
            }
        ],
        c_in: [{
                text: '工资',
                icon: './../../images/main/sr_1.svg'
            },
            {
                text: '兼职',
                icon: './../../images/main/sr_2.svg'
            },
            {
                text: '礼金',
                icon: './../../images/main/sr_3.svg'
            },
            {
                text: '奖金',
                icon: './../../images/main/sr_4.svg'
            },
            {
                text: '其它',
                icon: './../../images/main/sr_5.svg'
            }
        ]
    }
})