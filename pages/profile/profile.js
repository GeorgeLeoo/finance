// pages/profile/profile.js
var config = require('../../config');
const api = require('./../../http/api.js');

var app = getApp();
Page({

    data: {
        avatarurl: './../../images/avatar.png',
        nickname: 'djnbsj',
        isEdit: false
    },
    onLoad: function (options) {
        // console.log(app);
        var avatarurl = "";
        if (getApp().globalData.isUpload) {
            avatarurl = getApp().globalData.users.avatarUrl;
        } else {
            avatarurl = getApp().globalData.users.avatarUrl ? 'http://' + config.host + '/' + getApp().globalData.users.avatarUrl : "./../../images/avatar.png"
        }

        this.setData({
            nickname: getApp().globalData.users.nickname,
            avatarurl
        });
    },
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '个人信息',
        })
        // console.log('show');
        if (getApp().globalData.users.isUpload) {
            var avatarurl = "";
            if (getApp().globalData.isUpload) {
                avatarurl = getApp().globalData.users.avatarUrl;
            } else {
                avatarurl = 'http://' + config.host + '/' + getApp().globalData.users.avatarUrl
            }

            this.setData({
                nickname: getApp().globalData.users.nickname,
                avatarurl
            });
        }
    },
    handlerAvatar: function () {
        wx.showActionSheet({
            itemList: ['从相册选取'],
            success: (res) => {
                // console.log(res);

                if (res.tapIndex === 0) {
                    this.pickPhoto();
                }

            }
        })
    },
    takePhoto: function () {
        wx.navigateTo({
            url: './../camera/camera',
        })
        // wx.createCameraContext(this).takePhoto({　　　　
        //   quality: 'high',
        //   success: (res) => {
        //     console.log(res);　　　
        //   }　　
        // })
    },
    pickPhoto: function () {
        wx.chooseImage({
            count: 1,
            size: 'compressed',
            success: (res) => {
                let data = {
                    data: {tel: app.globalData.users.tel},
                    fileOptions: {
                        filePath: res.tempFilePaths[0],
                        name: 'avatar'
                    }
                };
                api.avatar(data).then((res1) => {
                    console.log(res1);
                    this.setData({
                        avatarurl: res.tempFilePaths[0]
                    });
                    getApp().globalData.isUpdateAvatar = true;
                }).catch((errMsg) => {
                    console.log(errMsg);
                });

            },
        })
    },
    handleEdit: function () {
        this.setData({
            isEdit: true
        })
    },
    watchNickname: function (e) {
        this.setData({
            nickname: e.detail.value
        });
    },
    handleSaveNickname: function () {
        this.setData({
            isEdit: false
        });
        let data = {
            tel: getApp().globalData.users.tel,
            nickname: this.data.nickname
        };
        api.updateNickname(data).then((res) => {
            wx.showToast({
                title: '昵称更新成功',
            });
            getApp().globalData.users.nickname = this.data.nickname;
            getApp().globalData.isUpdateNickName = true;
        }).catch((errMsg) => {
            console.log(errMsg);
        });
    }
});