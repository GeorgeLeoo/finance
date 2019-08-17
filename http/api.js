const {http, uploadFile} = require('./http.js');
const tokenStorage = wx.getStorageSync('token');

const method = {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
};
const host = "192.168.1.7"; // 服务器地址
// const host = "192.168.3.4";
// const host = "192.168.43.32";
const port = "3000";    // 服务器端口
const baseURL = `http://${ host }:${ port }/`;

exports.getToken = function (tel) {
    return http({
        url: baseURL + 'oauth2/token',
        method: method.get,
        data: {
            tel
        }
    });
};

exports.login = function (data) {
    return http({
        url: baseURL + 'users',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    });
};

exports.register = function (users) {
    return http({
        url: baseURL + 'users/sign_up',
        method: method.post,
        data: users,
    });
};

exports.forgetPwd = function (users) {
    return http({
        url: baseURL + 'users/update_pwd',
        method: method.post,
        data: users,
    });
};

exports.getBills = function (data) {
    return http({
        url: baseURL + 'bills',
        method: method.get,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    })
};

exports.delBills = function (id) {
    return http({
        url: baseURL + 'bills/del_bill',
        method: method.post,
        data: {
            _id: id
        },
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    })
};

exports.search = function (data) {
    return http({
        url: baseURL + 'bills/search',
        method: method.get,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    })
};

exports.getCategories = function (data) {
    return http({
        url: baseURL + 'categories',
        method: method.get,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.delCategories = function (_id) {
    return http({
        url: baseURL + 'categories/del',
        method: method.post,
        data: {_id},
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.saveCategories = function (data) {
    return http({
        url: baseURL + 'categories',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.saveBills = function (data) {
    return http({
        url: baseURL + 'bills',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.updateBills = function (data) {
    return http({
        url: baseURL + 'bills/update_bill',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.updateNickname = function (data) {
    return http({
        url: baseURL + 'users/nickname',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.avatar = function ({data, fileOptions}) {
    return uploadFile({
        url: baseURL + 'users/avatar',
        fileOptions,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    });
};