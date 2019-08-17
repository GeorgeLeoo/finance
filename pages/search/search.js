// pages/search/search.js
const api = require('./../../http/api.js');

const globalData = getApp().globalData;
const {c_out,c_in} = globalData;
Page({
    data: {
        searchInput: ''
    },
    onLoad: function (options) {
        
        let route = this.route;
        globalData.currentPath = './..' + route.substring(5, route.length);
    },
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '搜索',
        })
    },
    watchSearchInput(e) {
        this.setData({
            searchInput: e.detail.value
        });
    },
    handleDel(e) {
        this.setData({
            searchInput: ''
        });
    },
    handleSearch(e) {
        this.loadSearchData(e.detail.value);
    },
    loadSearchData(searchVal) {
        let data = {
            tel: globalData.users.tel,
            notes: searchVal
        };
        api.search(data).then((res) => {
            res.map(item => item.type === 0 ? item.text = c_out[item.iconSelected].text : item.text = c_in[item.iconSelected].text)
            this.setData({
                lists: res
            });
        }).catch((errMsg) => {
            console.log(errMsg);
        })

    },
    handleModify(e) {
        let {_id, getWeek, date, notes, money, type, iconSelected} = e.target.dataset.item;
        wx.navigateTo({
            url: './../addition/addition?route=pages/search/search&data=' + JSON.stringify({
                _id,
                getWeek,
                date,
                notes,
                money,
                type,
                iconSelected
            })
        })
    },
    handleDelete(e) {
        const id = e.target.dataset.id;
        const index = e.target.dataset.index;
        const that = this;
        wx.showModal({
            title: '警告',
            content: '您确定要删除此条记录',
            success(res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '',
                    });
                    that.del(that, id, index);
                    console.log(1111111);
                }
            }
        })
    },
    del(that, id,index) {
        api.delBills(id).then((res) => {
            let lists = that.data.lists;
            lists.splice(index,1);
            that.setData({
                lists
            });

            getApp().globalData.isRefreshBills = true;

            wx.showToast({
                title: '删除成功',
                duration: 1000
            })
        }).catch((errMsg) => {
            console.log(errMsg);
            wx.showToast({
                title: errMsg,
                duration: 1000
            })
        });
    }
})