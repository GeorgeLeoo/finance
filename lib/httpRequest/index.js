import Config from '../../config/index'

/**
 * 对微信普通网络请求封装
 */
class HttpRequest {
}

/**
 * 请求方法
 * @type {{DELETE: string, POST: string, GET: string, PUT: string, PATCH: string}}
 */
HttpRequest.METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
}

/**
 * 响应码
 * @type {{SUCCESS: number, ERROR: number, UN_AUTHORIZATION: number}}
 */
HttpRequest.RESPONSE_CODE = {
    SUCCESS: 200,   //  请求成功
    UN_AUTHORIZATION: 401,  // 客户端未授权、未登录
    CLIENT_ERROR: 406,  //  客户端错误，未传递正确的参数
    SERVICE_ERROR: 500, //服务器内部错误
}

/**
 * 请求
 * @param {String} url 请求地址
 * @param {String} method 请求的方法类型
 * @param {Object} data 请求的参数
 * @param {Boolean} isUpload 是否上传
 * @param {Object} fileOptions 文件配置项
 * @returns {Promise<any>} 返回请求的 Promise 对象
 */
HttpRequest.request = ({url, method, data, isUpload = false, fileOptions = {}}) => {
    const finalUrl = Config.API_HOST + url

    /**
     * 获取请求头
     * @private
     */
    const _getHeaders = () => {
        try {
            const Token = wx.getStorageSync(Config.TOKEN_STORAGE_KEY)
            return {
                Authorization: Token.token,
                expiresIn: Token.expiresIn
            }
        }catch (e) {
            return {}
        }
    }

    /**
     * 成功时的回调
     * @param result
     * @param resolve
     * @param reject
     * @private
     */
    const _success = (result, resolve, reject) => {
        const { code, msg, data } = result;
        if (code === HttpRequest.RESPONSE_CODE.UN_AUTHORIZATION) {
            resolve(data);
        } else if (code === HttpRequest.RESPONSE_CODE.SERVICE_ERROR) {
            reject(msg);
        }
        // 隐藏
        wx.hideLoading();
    }

    /**
     * 失败时的回调
     * @param error
     * @param resolve
     * @param reject
     * @private
     */
    const _fail = (error, resolve, reject) => {
        reject(error);
    }

    /**
     * 文件上传处理
     * @param resolve
     * @param reject
     * @private
     */
    const _uploadFileHandler = (resolve, reject) => {
        wx.uploadFile({
            url: finalUrl,
            filePath: fileOptions.filePath,
            name: fileOptions.name || 'file',
            formData: data,
            header: _getHeaders(),
            success: (result) => _success(result.data, resolve, reject),
            fail: (error) => _fail(error, resolve, reject)
        })
    }

    /**
     * 一般请求处理
     * @param resolve
     * @param reject
     * @private
     */
    const _requestHandler = (resolve, reject) => {
        wx.request({
            url: finalUrl,
            method,
            data,
            header: _getHeaders(),
            success: (result) => _success(result.data, resolve, reject),
            fail: (error) => _fail(error, resolve, reject)
        });
    }

    return new Promise((resolve, reject) => {
        if (isUpload) {
            _uploadFileHandler(resolve, reject)
        } else {
            _requestHandler(resolve, reject)
        }
    })
}


export default HttpRequest

// /**
//  * 对微信普通网络请求封装
//  * @param url   请求地址
//  * @param data  请求的参数
//  * @param method   请求的方法类型
//  * @param headers   头部信息，在这里主要是 token 认证功能
//  * @returns {Promise<unknown>} 返回请求的 Promise 对象
//  */
// function http({url, data, method, headers = {}}) {
//     return new Promise((resolve, reject) => {
//         wx.request({
//             url,
//             method,
//             data,
//             header: {
//                 Authorization: headers.token,
//                 expiresIn: headers.expiresIn
//             },
//             success: (result) => {
//                 const res = result.data;
//                 if (res.code === 0) {
//                     resolve(res.data);
//                 } else if (res.code === 1) {
//                     reject(res.msg);
//                 }
//                 // 隐藏
//                 wx.hideLoading();
//             },
//             fail: (err) => {
//                 console.error('server error', err);
//             }
//         });
//     })
// }
//
// /**
//  * 对文件上传接口封装
//  * @param url   请求地址
//  * @param fileOptions   文件配置项
//  * @param data  请求发送的数据
//  * @param headers   头部信息，在这里主要是 token 认证功能
//  * @returns {Promise<unknown>}  返回请求的 Promise 对象
//  */
// function uploadFile({url, fileOptions, data, headers = {}}) {
//     return new Promise(((resolve, reject) => {
//         wx.uploadFile({
//             url: url,
//             filePath: fileOptions.filePath,
//             name: fileOptions.name || 'file',
//             header: {
//                 Authorization: headers.token,
//                 expiresIn: headers.expiresIn
//             },
//             formData: data,
//             success: (res) => {
//                 if (JSON.parse(res.data).code === 0) {
//                     resolve(res.data);
//                 } else if (res.code === 1) {
//                     reject(res.msg);
//                 }
//             },
//             fail: (err) => {
//                 console.error('server error', err);
//             }
//         })
//     }))
// }

// module.exports = {
//     http,
//     uploadFile
// };
