// pages/search/search.js
import Utils from "../../utils/index";

Page({
    data: {
        searchValue: ''
    },
    onLoad: function () {
        Utils.setTitle('搜索')
        Utils.setTheme(true)
    },
    handleSearch({detail}) {
        wx.navigateTo({
            url: '/pages/searchMain/searchMain?searchValue=' + detail.value
        })
    },
    handleClearSearchValue() {
        this.setData({searchValue: ''});
    },
})