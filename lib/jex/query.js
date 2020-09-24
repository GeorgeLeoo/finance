import { count, deleteJex, deleteManyJex, getJex, increment, postJex, statJex } from './api'
import { isObject, isString, isNumber, isArray } from './dataType'
import Error from './error'

export class Query {
  constructor (tableName) {
    // The name of the table is the same as the table name on the back end
    this._tableName = tableName
    this._queryOptions = {}
    this._orderOptions = {}
    this._selects = []
    this._unSelects = []
    this._equalOptions = {}
    this._orOptions = []
    this._andOptions = []
    this._statOptions = {}
    this._referenceOptions = []
  }
  
  statTo (operation, field) {
    const operationMap = {
      sum: 'sum',
      avg: 'avg',
      max: 'max',
      min: 'min',
      having: 'having',
      order: 'order',
      groupby: 'groupby',
      groupcount: 'groupcount',
    }
    if (!isString(operation)) {
      throw new Error(Error.Param, 'Parameter operation need a string type.')
    }
    if (!operationMap[operation]) {
      throw new Error(Error.Param, 'Parameter operation need a operationMap value.')
    }
    
    this._statOptions[operationMap[operation]] = field
  }
  
  /**
   * Associative table
   * format：
   * { '_tableName': { select:['column1', 'column2', ...], unselect: ['column3', 'column4', ...] } }
   * @param references: array
   */
  reference (...references) {
    // [{ 'Users': { select: ['username', 'email'], unselect: ['password'] } }]
    const simple = references.every(v => typeof v === 'string')
    if (simple) {
      references.map(path => {
        this._referenceOptions.push({ path })
      })
      return
    }
    references.map(v => {
      const ref = Object.keys(v)[0]
      const refValue = v[ref]
      const refObject = { path: ref }
      const options = Object.keys(refValue)
      const select = {}
      options.map(option => {
        if (option === 'select') {
          refValue[option].map(val => {
            select[val] = 1
          })
        }
        if (option === 'unselect') {
          refValue[option].map(val => {
            select[val] = 0
          })
        }
      })
      if (Object.keys(select).length !== 0) {
        refObject.select = select
      }
      this._referenceOptions.push(refObject)
    })
  }
  
  /**
   * Counts a field.
   * @param _id: number
   * @param incrementObj: object
   * @returns
   */
  increment (_id, incrementObj = {}) {
    if (!isString(_id)) {
      throw new Error(Error.Type, 'Parameter _id must be a string type.')
    }
    if (!_id) {
      throw new Error(Error.Param, 'Parameter _id can not be empty string.')
    }
    if (Object.keys(incrementObj).length === 0) {
      throw new Error(Error.Param, 'At a minimum, set the field name of the increment')
    }
    return increment(this._tableName, { _id, incrementObj })
  }
  
  /**
   *
   * @param skipNumber: number
   */
  skip (skipNumber) {
    if (!isNumber(skipNumber)) {
      throw new Error(Error.Type, 'Parameter skipNumber need a number type.')
    }
    this._skipNumber = skipNumber
  }
  
  /**
   *
   * @param limitNumber: number
   */
  limit (limitNumber) {
    if (!isNumber(limitNumber)) {
      throw new Error(Error.Type, 'Parameter limitNumber need a number type.')
    }
    this._limitNumber = limitNumber
  }
  
  /**
   * set data
   * @param field: string
   * @param value: string
   */
  set (field, value) {
    if (!field) {
      throw new Error(Error.Type, 'Parameter field must be required.')
    }
    if (!value) {
      throw new Error(Error.Type, 'Parameter value must be required.')
    }
    this._queryOptions[field] = value
  }
  
  /**
   * order list
   * key only can be desc or asc
   * @param field: string
   * @param type: string
   */
  order (field, type) {
    const orderMap = ['desc', 'asc']
    if (!field) {
      throw new Error(Error.Type, 'Parameter field must be required.')
    }
    if (!type) {
      throw new Error(Error.Type, 'Parameter type must be required.')
    }
    if (orderMap.includes(type)) {
      this._orderOptions[field] = type
    } else {
      throw new Error('type类型不正确')
    }
  }
  
  /**
   * get list count
   * If condition is empty object, you will get all count.
   * @param condition: object [query condition]
   * @returns
   */
  count (condition = { type: 'count' }) {
    return count(this._tableName, condition)
  }
  
  /**
   * Condition query of equal query.
   * @param field: string
   * @param operator: string
   * @param value: string | number | boolean
   * @returns {{}}
   */
  equalTo (field, operator, value) {
    if (!isString(field) && !isString(operator)) {
      throw new Error(Error.Type, 'Parameter field must be string type.')
    }
    if (!field || !operator || !value) {
      throw new Error(Error.Type, 'Parameter field, operator and value can not be empty string.')
    }
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '===': '$eq',
      '>=': '$gte',
      '<=': '$lte',
      '!==': '$ne',
    }
    const _equalOptionsValue = this._equalOptions[field]
    if (_equalOptionsValue) {
      _equalOptionsValue[operatorMap[operator]] = value
    } else {
      this._equalOptions[field] = { [operatorMap[operator]]: value }
    }
    return { [field]: { [operatorMap[operator]]: value } }
  }
  
  /**
   * Condition query of or query.
   * @param querys: array
   */
  or (...querys) {
    if (querys.length === 0) {
      throw new Error(Error.Param, 'Parameters can not be empty.')
    }
    this._orOptions = querys
  }
  
  /**
   * Condition query of and query.
   * @param querys: array
   */
  and (...querys) {
    if (querys.length === 0) {
      throw new Error(Error.Param, 'Parameters can not be empty.')
    }
    this._andOptions = querys
  }
  
  /**
   * Set the columns you want.
   * Select and unSelect methods can only have one, who writes on top who is useful.
   * @param fields: array
   */
  select (...fields) {
    if (fields.length === 0) {
      throw new Error(Error.Param, 'Parameters can not be empty.')
    }
    if (this._unSelects.length === 0) {
      this._selects = fields
    }
  }
  
  /**
   * Set the columns you don't need.
   * @param fields： array
   */
  unSelect (...fields) {
    if (fields.length === 0) {
      throw new Error(Error.Param, 'Parameters can not be empty.')
    }
    if (this._selects.length === 0) {
      this._unSelects = fields
    }
  }
  
  /**
   * get data
   * This method can be used in conjunction with
   * [set, order, select, unSelect, and, or, equalTo, limit, skip, reference, statTo] method.
   * @param query： string | object
   * @returns
   */
  get (query) {
    let body = {}
    if (isString(query)) {
      body.query = { _id: query }
    }
    if (isObject(query)) {
      body = {
        query
      }
    }
    
    body.query = Object.assign({}, body.query, this._queryOptions)
    
    if (this._orOptions.length === 0 && this._andOptions.length === 0) {
      if (Object.keys(this._equalOptions).length > 0) {
        body.query = Object.assign({}, body.query, this._equalOptions)
      }
    }
    
    if (this._orOptions.length > 0) {
      body.query = Object.assign({}, body.query, { $or: this._orOptions })
    }
    
    if (this._andOptions.length > 0) {
      body.query = Object.assign({}, body.query, { $and: this._andOptions })
    }
    
    if ((this._skipNumber && !this._limitNumber) || (!this._skipNumber && this._limitNumber)) {
      throw new Error(Error.Param, 'The skip method and limit method must exist at the same time.')
    }
    
    if (this._skipNumber && this._limitNumber) {
      body.page = {
        skipNumber: this._skipNumber,
        limitNumber: this._limitNumber
      }
    }
    
    if (Object.keys(this._orderOptions).length > 0) {
      body.order = this._orderOptions
    }
    if (this._selects.length > 0) {
      body.selects = this._selects
    }
    if (this._unSelects.length > 0) {
      body.unSelects = this._unSelects
    }
    if (this._referenceOptions.length > 0) {
      // if (this._referenceOptions.length === 1) {
      //   body.reference = this._referenceOptions[0]
      // } else {
      // }
      body.reference = this._referenceOptions
    }
    if (Object.keys(this._statOptions).length === 0) {
      return getJex(this._tableName, body)
    } else {
      body.stat = this._statOptions
      return statJex(this._tableName, body)
    }
  }
  
  /**
   * save data
   * When there is only one argument, the data is inserted.
   * When there are two parameters, the data is modified.
   * When you need to modify a record,
   * the set method takes precedence over the save method.
   * This method can be used in conjunction with set method.
   * @param data: required
   * @param query: not always be required
   * @returns
   */
  save (data = {}, query = {}) {
    console.log(data)
    if (!isObject(data) && !isArray(data)) {
      throw new Error(Error.Type, 'Parameter data need an object or array type.')
    }
    if (!isObject(query)) {
      throw new Error(Error.Type, 'Parameter query need an object type.')
    }
    if (this._queryOptions._id) {
      query = { _id: this._queryOptions._id }
    }
    if (isArray(data)) {
      const body = Object.assign({}, { data }, { query: {} })
      return postJex(this._tableName, body)
    } else {
      const keys = Object.keys(data)
      const _queryOptionsKeys = Object.keys(this._queryOptions)
      if (_queryOptionsKeys.length === 0 && keys.length === 0) {
        throw new Error(Error.Param, 'Need save data.')
      } else {
        data = Object.assign({}, data, this._queryOptions)
      }
      const body = Object.assign({}, { data }, { query })
      return postJex(this._tableName, body)
    }
    // const keys = Object.keys(data)
    // const _queryOptionsKeys = Object.keys(this._queryOptions)
    // if (_queryOptionsKeys.length === 0 && keys.length === 0) {
    //   throw new Error(Error.Param, 'Need save data.')
    // } else {
    //   data = Object.assign({}, data, this._queryOptions)
    // }
    // const body = Object.assign({}, { data }, { query })
    // return postJex(this._tableName, body)
  }
  
  /**
   * remove data
   * If data is a string type, we need to pass in the _id of the record.
   * If data is a object type, we need to pass in
   * the other deletion conditions of the record.
   * This method can be used in conjunction with set method.
   * @param data： string | object
   * @returns
   */
  remove (data) {
    if (!isString(data) && !isObject(data)) {
      throw new Error(Error.Type, 'Parameter data need string type or object type.')
    }
    let body = {}
    if (isString(data)) {
      if (!data) {
        throw new Error(Error.Param, 'Parameter data can not be empty string.')
      }
      body = {
        _id: data
      }
    }
    if (isObject(data)) {
      body = Object.assign({}, data, this._queryOptions)
      if (Object.keys(body).length === 0) {
        throw new Error(Error.Param, 'Parameter data can not be empty object.')
      }
    }
    return deleteJex(this._tableName, body)
  }
  removeMany (data) {
    if (!isArray(data) || data.length === 0) {
      throw new Error(Error.Param, 'The condition can must be array type and condition length must > 0.')
    }
    return deleteManyJex(this._tableName, data)
  }
}

export default function (tableName) {
  return new Query(tableName)
}
