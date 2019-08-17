/**
 * 对微信普通网络请求封装
 * @param url   请求地址
 * @param data  请求的参数
 * @param method   请求的方法类型
 * @param headers   头部信息，在这里主要是 token 认证功能
 * @returns {Promise<unknown>} 返回请求的 Promise 对象
 */
function http({url, data, method, headers = {}}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method,
            data,
            header: {
                Authorization: headers.token,
                expiresIn: headers.expiresIn
            },
            success: (result) => {
                const res = result.data;
                if (res.code === 0) {
                    resolve(res.data);
                } else if (res.code === 1) {
                    reject(res.msg);
                }
                // 隐藏 
                wx.hideLoading();
            },
            fail: (err) => {
                console.error('server error', err);
            }
        });
    })
}

/**
 * 对文件上传接口封装
 * @param url   请求地址
 * @param fileOptions   文件配置项
 * @param data  请求发送的数据
 * @param headers   头部信息，在这里主要是 token 认证功能
 * @returns {Promise<unknown>}  返回请求的 Promise 对象
 */
function uploadFile({url, fileOptions, data, headers = {}}) {
    return new Promise(((resolve, reject) => {
        wx.uploadFile({
            url: url,
            filePath: fileOptions.filePath,
            name: fileOptions.name || 'file',
            header: {
                Authorization: headers.token,
                expiresIn: headers.expiresIn
            },
            formData: data,
            success: (res) => {
                if (JSON.parse(res.data).code === 0) {
                    resolve(res.data);
                } else if (res.code === 1) {
                    reject(res.msg);
                }
            },
            fail: (err) => {
                console.error('server error', err);
            }
        })
    }))
}

module.exports = {
    http,
    uploadFile
};