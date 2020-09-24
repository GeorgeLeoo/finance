// import Config from "./config";
// const Config = require('./config')

const BASE_URL = 'http://139.159.201.22:9878/finance/images'

export default [
    {
        id: 1,
        class: '',
        icon: BASE_URL + '/mine/setting_category.svg',
        text: '类别设置',
        url: './../catelogsetting/catelogsetting'
    },
    {
        id: 2,
        class: 'bottom10',
        icon: BASE_URL + '/mine/setting_password.svg',
        text: '密码设置',
        url: './../forget/forget'
    },
    {
        id: 3,
        class: '',
        icon: BASE_URL + '/mine/setting_help.svg',
        text: '常见问题',
        url: ''
    },
    {
        id: 4,
        class: '',
        icon: BASE_URL + '/mine/setting_advice.svg',
        text: '意见反馈',
        url: ''
    },
    {
        id: 5,
        class: 'bottom10',
        icon: BASE_URL + '/mine/setting_about.svg',
        text: '关于家庭记账系统',
        url: './../about/about'
    },
    {
        class: 'bottom10',
        icon: BASE_URL + '/mine/setting_logout.svg',
        text: '退出账号',
        url: './../login/login',
        type: 'CONFIRM'
    }
]