var config = function() {
  var host = '212.64.28.244';  //服务器ip
//   var host = '100.100.219.40';
  var port = '3000';//服务器端口
  var uploadPort = '8080';//图片服务器端口
  var baseUrl = 'http://' + host + ":" + port;//基础url
  return {
    url: {
      users: {
        login: baseUrl + '/users/login',
        register: baseUrl + '/users/register',
        forgetpwd: baseUrl + '/users/forgetpwd',
        updateNickname: baseUrl + '/users/updatenickname',
        nickname: baseUrl + '/users/nickname',
        uploadAvatar: baseUrl + '/users/uploadavatar',
        avatar: baseUrl + '/users/avatar'
      },
      finance: {
        saveBill: baseUrl + '/bill/savebill',
        bill: baseUrl + '/bill/bill',
        del: baseUrl + '/bill/del',
        getDataById: baseUrl + '/bill/getdatabyid',
        modifyBill: baseUrl + '/bill/modifybill',
        rankings: baseUrl + '/bill/rankings',
        search: baseUrl + '/bill/search'
      },
      catalog: {
        delCatalog: baseUrl + '/catalog/delcatalog',
        saveCatalog: baseUrl + '/catalog/saveCatalog',
        catalog: baseUrl + '/catalog/catalog'
      },
      codeSession: baseUrl + '/finance/codesession'

    },
    method: {
      post: 'post',
      get: 'get'
    },
    appid: 'wx6eb3b827a5e4c084',
    secret: '389ca73ce363500cd97bcff684e367cb',
    TEL_REGEXP: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
    host: host + ":" + uploadPort
  };
}

module.exports = config();