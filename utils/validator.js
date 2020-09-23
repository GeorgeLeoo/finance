// utils/validator.js
import {isArray, isFunction} from "dataType";

const validatorEmpty = function (value) {
    return !!value;
}

const validatorMinLength = function (value, ruleValue) {
    return value.length >= ruleValue
}

const validatorMaxLength = function (value, ruleValue) {
    return value.length <= ruleValue
}

const validatorLength = function (value, ruleValue) {
    return value.length <= ruleValue
}

const validatorEqual = function (value, ruleValue) {
    return value !== ruleValue
}

const Validator = function (value, ruleValue) {
    this.value = value
    this.ruleValue = ruleValue
}

const systemMethodMap = {
    'empty': validatorEmpty,
    'minLength': validatorMinLength,
    'maxLength': validatorMaxLength,
    'length': validatorLength,
    'equal': validatorEqual
}

const systemMethodMapKeys = Object.keys(systemMethodMap)
for (let systemMethodMapKey of systemMethodMapKeys) {
    Validator.prototype[systemMethodMapKey] = function() {
        return systemMethodMap[systemMethodMapKey](this.value, this.ruleValue)
    }
}

export const validatorForm = function (rules) {
    let _validate = false
    if (isArray(rules)) {
        for (let i = 0; i < rules.length; i++) {
            let item = rules[i]
            let {value, rule, errorMsg, validator} = item
            let validate = false
            if (rule) {
                if (rule.includes(':')) {
                    const ruleArray = rule.split(':')
                    const ruleValue = ruleArray[1]
                    rule = ruleArray[0]
                    validate = new Validator(value, ruleValue)[rule]()
                } else {
                    validate = new Validator(value)[rule]()
                }
                if (!validate) {
                    _validate = validate
                    wx.showModal({
                        title: '提示',
                        content: errorMsg,
                        showCancel: false
                    });
                    break
                }
                _validate = validate
            } else if(isFunction(validator)) {
                const errMsg = validator(value)
                if (errMsg) {
                    _validate = false
                    wx.showModal({
                        title: '提示',
                        content: errMsg,
                        showCancel: false
                    });
                    break
                } else {
                    _validate = true
                }
            }
        }
    }
    return _validate
}

