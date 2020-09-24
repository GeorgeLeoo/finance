// pages/addition/addition.js
import Utils from '../../utils/index'
import Config from '../../config/config'
import Jex from '../../lib/jex/index'

const api = require('./../../http/api.js')
let { c_out, c_in, users } = getApp().globalData

const CATEGORY_TYPE_MAP = {
    INCOME: 'INCOME',
    EXPEND: 'EXPEND'
}

Page({
    
    data: {
        currentIndex: 0,
        showtimes: 0,
        isUpdate: false,
        date: Utils.getDate(),
        week: Utils.getWeek(),
        iconSelectedId: '',
        note: '',
        money: 0,
        category_list: [
            {
                type: CATEGORY_TYPE_MAP.EXPEND,
                list: []
            },
            {
                type: CATEGORY_TYPE_MAP.INCOME,
                list: []
            },
        ],
        INPUT_TYPE_MAP: {
            MONEY: 'money',
            NOTE: 'note',
        }
    },
    onLoad: function () {
        
        Utils.setTitle('记一笔')
        Utils.setTheme(true)
        
        this.getCategories(CATEGORY_TYPE_MAP.EXPEND)
        this.getCategories(CATEGORY_TYPE_MAP.INCOME)
        
        // console.log(options);
        // if (options.data) {
        //     let res = JSON.parse(options.data);
        //     let {type} = res;
        //     let data = {};
        //     let current = 0;
        //     if (type === 0) {
        //         current = 0;
        //         data.DATA_EXPEND = res;
        //         this.setData({
        //             current,
        //             DATA_EXPEND: data.DATA_EXPEND,
        //             isUpdate: true,
        //             url: options.route
        //         })
        //     } else {
        //         current = 1;
        //         data.DATA_INCOME = res;
        //         this.setData({
        //             current,
        //             DATA_INCOME: data.DATA_INCOME,
        //             isUpdate: true,
        //             url: options.route
        //         })
        //     }
        // }else{
        //     this.setData({
        //         url: options.route
        //     })
        // }
        
    },
    /**
     * 获取分类信息
     */
    getCategories (type) {
        const query = Jex.Query('category')
        
        query.get({ type }).then(data => {
            
            let expendIconList = []
            let incomeIconList = []
            
            const category_list = this.data.category_list
            
            let options = {}
            
            if (type === CATEGORY_TYPE_MAP.EXPEND && data.length > 0) {
                expendIconList = data
                category_list[0].list = expendIconList
                options = { category_list, iconSelectedId: data[0]._id }
            }
            
            if (type === CATEGORY_TYPE_MAP.INCOME && data.length > 0) {
                incomeIconList = data
                category_list[1].list = incomeIconList
            }
            
            this.setData(options)
        })
    },
    
    /**
     * 选中类型事件 icon
     */
    handlerIconSelect: function ({ target }) {
        const { id } = target.dataset
        let iconSelectedId = this.data.iconSelectedId
        
        if (id !== iconSelectedId) {
            this.setData({ iconSelectedId: id })
        }
    },
    /**
     * 日期选择器
     * @param detail
     */
    handlerDateChange ({ detail }) {
        const dateValue = detail.value
        let date = this.data.date
        
        if (dateValue !== date) {
            this.setData({ date: dateValue, week: Utils.getWeek(dateValue) })
        }
    },
    /**
     * 监听 备注/金额
     * @param target
     * @param detail
     */
    handlerWatchInput ({ target, detail }) {
        const { type } = target.dataset
        const detailValue = detail.value
        
        let dataValue = this.data[type]
        
        if (detailValue !== dataValue) {
            this.setData({ [type]: detailValue })
        }
    },
    /***
     * swiper change 事件
     * @param e
     */
    handlerChangeSwiper ({ detail }) {
        this.setData({ currentIndex: detail.current })
    },
    /**
     * Tab 切换事件
     * @param target
     */
    handlerTabChange ({ target }) {
        this.setData({ currentIndex: target.dataset.current_index })
    },
    formatData (data) {
        let expenseIcon = []
        let incomeIcon = []
        Object.assign(expenseIcon, c_out)
        Object.assign(incomeIcon, c_in)
        data.map((item) => {
            item.data.id = item._id
            item.type === 0 ? expenseIcon.push(item.data) : incomeIcon.push(item.data)
        })
        return {
            expenseIcon,
            incomeIcon
        }
    },
    handlerSave: function (e) {
        const { iconSelectedId, date, week, money, note, currentIndex } = this.data
        
        const data = { iconSelectedId, date, week, money, note }
        
        if (currentIndex === 0) {
            data.type = CATEGORY_TYPE_MAP.EXPEND
        }
        
        if (currentIndex === 1) {
            data.type = CATEGORY_TYPE_MAP.INCOME
        }
        
        Utils.showLoading()
        
        const query = Jex.Query('bill')
        
        query.save(data).then(data => {
            Utils.showToast('保存成功')
            setTimeout(() => {
                wx.navigateBack()
            }, 500)
        })
    }
})
