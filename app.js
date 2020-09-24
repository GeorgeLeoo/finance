//app.js
App({
    onLaunch: function() {},

    globalData: {
        currentPath:'',
        isRefreshBills: false,
        isRefreshCategories: false,
        isUpdateNickName: false,
        isUpdateAvatar: false,
        isUpload:false,
        bill: {},
        users: {
            tel: '18921483103',
            pwd: '',
            nickname: '',
            avatarUrl: ''
        },
    }
});
