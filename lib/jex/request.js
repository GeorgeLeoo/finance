import Config from '../../config/config'

/**
 * 对微信普通网络请求封装
 */
export class HttpRequest {
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
HttpRequest.request = ({url, method = HttpRequest.METHOD.POST , data, isUpload = false, fileOptions = {}}) => {
    const finalUrl = Config.API_HOST + url

    /**
     * 获取请求头
     * @private
     */
    const _getHeaders = () => {
        try {
            const Token = wx.getStorageSync(Config.TOKEN_STORAGE_KEY)
            return {
                Authorization: Token.token
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
        // console.log('_success')
        const { code, msg, data } = result;
        if (code === HttpRequest.RESPONSE_CODE.SUCCESS) {
            resolve(data);
        } else {
            wx.showModal({title: '警告', content: msg.msg, showCancel: false})
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
        // console.log('_fail')
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


export default HttpRequest.request
