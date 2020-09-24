// pages/mine/mine.js
import Utils from '../../utils/index'
import Config from '../../config/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: '',
        avatar: '',
        mines: Config.MINE_MENUS
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        Utils.setTitle('我的')
        Utils.setTheme(true)
        var route = this.route;
        // console.log(getApp().globalData.users);
        // getApp().globalData.currentPath = './..' + route.substring(5, route.length);
        // this.setData({
        //     nickname: getApp().globalData.users.nickname,
        //     avatar: getApp().globalData.users.avatarUrl ? "http://" + config.host + "/" + getApp().globalData.users.avatarUrl + "?" + new Date().getTime() : "./../../images/avatar.png",
        //     host: config.host
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.hideLoading();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // if (getApp().globalData.isUpdateNickName) {
        //     this.setData({
        //         nickname: getApp().globalData.users.nickname
        //     });
        //     getApp().globalData.isUpdateNickName = false;
        // }
        // if (getApp().globalData.isUpdateAvatar) {
        //     this.setData({
        //         avatar: getApp().globalData.users.avatarUrl ? "http://" + config.host + "/" + getApp().globalData.users.avatarUrl + "?" + new Date().getTime() : "./../../images/avatar.png",
        //     });
        //     getApp().globalData.isUpdateAvatar = false;
        // }
    },

    /**
     * 菜单点击
     * @param target
     */
    handlerMineMenuClick: function ({target}) {
        const {type, url} = target.dataset
        const MINE_MENUS = Config.MINE_MENUS

        if (type === MINE_MENUS[MINE_MENUS.length - 1].type) {
            this._handlerLogout(url)
        } else {
            wx.navigateTo({url})
        }
    },

    /**
     * 退出登陆
     * @private
     */
    _handlerLogout(url) {
        wx.showModal({
            title: '提示',
            content: '您确定要退出当前账号？',
            success: ({confirm}) => {
                confirm && wx.redirectTo({url})
            }
        })
    }

})
