const config = require('./../config/config.js');
class Http{
    constructor({url,method,data}){
        if(url){
            requset({ url, method: config.method.get, data});
        }
    }

    requset({url,method,data}){
        new Promise((resolve,reject)=>{
            wx.request({
                url: url,
                method,
                data,
                success: (res) => {
                    if (res.data.code === 0) {
                        resolve(res.data.data);
                    }
                    if (res.data.code === 0) {
                        reject(res.data.msg);
                    }
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }

    get({url, data}){
        return request({url, method:config.method.get,data});
    }

    post({ url, data }) {
       return  request({ url, method: config.method.post, data });
    }
}


module.exports = http