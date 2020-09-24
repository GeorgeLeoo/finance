// pages/search/search.js
import Utils from "../../utils/index";

const api = require('./../../http/api.js');

const globalData = getApp().globalData;
const {c_out,c_in} = globalData;

Page({
    data: {
        searchValue: ''
    },
    onLoad: function ({searchValue}) {
        Utils.setTitle('搜索')
        Utils.setTheme(true)

        this.setData({ searchValue })

        this.getBillBySearch()
    },
    /**
     * 搜索账单
     */
    getBillBySearch() {

    },
    /**
     * 返回上页
     */
    handleToBack() {
        wx.navigateBack()
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
    /**
     * 删除账单
     * @param target
     */
    handleDeleteBill({target}) {
        const {id, index} = target.dataset

        wx.showModal({
            title: '警告',
            content: '您确定要删除此条记录',
            success: ({confirm}) => {
                if (confirm) {
                    this._deleteBill(id, index);
                }
            }
        })
    },
    _deleteBill(id,index) {
        wx.showLoading({ title: '正则删除' });

        // api.delBills(id).then((res) => {
        //     let lists = .data.lists;
        //     lists.splice(index,1);
        //     that.setData({
        //         lists
        //     });
        //
        //     getApp().globalData.isRefreshBills = true;
        //
        //     wx.showToast({
        //         title: '删除成功',
        //         duration: 1000
        //     })
        // }).catch((errMsg) => {
        //     console.log(errMsg);
        //     wx.showToast({
        //         title: errMsg,
        //         duration: 1000
        //     })
        // });
    }
})