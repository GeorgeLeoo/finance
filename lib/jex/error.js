const ErrorCode = {
  Type: 441,
  Param: 442
}

class Error {
  constructor (code, message) {
    const E = window.Error || global.Error
    const error = new E()
    error.code = code
    error.message = `Jex Error: { code: ${code}, message: ${message || this.errorMessage(code)} }`
    return error
  }
  
  errorMessage (code) {
    switch (code) {
      case ErrorCode.Type:
        // 参数类型不正确
        return 'Incorrect parameter type.'
      case ErrorCode.Param:
        // 参数为空
        return 'Parameters error.'
      default:
        return 'Unknown error'
    }
  }
}

Error.Type = ErrorCode.Type
Error.Param = ErrorCode.Param

export default Error
