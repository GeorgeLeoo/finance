// pages/profile/profile.js
var config = require('./../../config/config.js');
var utils = require('./../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarurl: './../../images/avatar.png',
        nickname: 'djnbsj',
        isEdit: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(app);
        var avatarurl = "";
        if (getApp().globalData.isUpload) {
            avatarurl = getApp().globalData.users.avatarUrl ;
        } else {
            avatarurl = 'http://' + config.host + '/' + getApp().globalData.users.avatarUrl
        }
        
        this.setData({
            nickname: getApp().globalData.users.nickname,
            avatarurl
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.setNavigationBarTitle({
            title: '个人信息',
        })
        // console.log('show');
        if(getApp().globalData.users.isUpload){
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        // console.log('hide');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    handlerAvatar: function() {
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
    takePhoto: function() {
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
    pickPhoto: function() {
        wx.chooseImage({
            count: 1,
            size: 'compressed',
            success: (res) => {
                // console.log(res);
                wx.uploadFile({
                    url: config.url.users.uploadAvatar,
                    filePath: res.tempFilePaths[0],
                    name: "avatar",
                    formData: {
                        tel: app.globalData.users.tel
                    },
                    success: (res) => {
                        // console.log(res.data);
                        if (JSON.parse(res.data).code === 0) {
                            wx.showToast({
                                title: '头像上传成功',
                            })
                            getApp().globalData.isUpload = true;
                        }
                    }
                })
                this.setData({
                    avatarurl: res.tempFilePaths[0]
                });
                getApp().globalData.users.avatarUrl = this.data.avatarurl;
                getApp().globalData.isUpdateAvatar = true;
            },
        })
    },
    handleEdit: function() {
        this.setData({
            isEdit: true
        })
    },
    watchNickname: function(e) {
        this.setData({
            nickname: e.detail.value
        });
    },
    handleSaveNickname: function() {
        this.setData({
            isEdit: false
        })
        // console.log('save');
        wx.request({
            url: config.url.users.updateNickname,
            method: config.method.post,
            data: {
                tel: getApp().globalData.users.tel,
                nickname: this.data.nickname
            },
            success: (res) => {
                // console.log(res);
                if (res.data.code === 0) {
                    wx.showToast({
                        title: '昵称更新成功',
                    })
                    getApp().globalData.users.nickname = this.data.nickname;
                    getApp().globalData.isUpdateNickName = true;
                } else {
                    wx.showToast({
                        title: '昵称更新失败',
                    })
                }
            }
        })
    }
})