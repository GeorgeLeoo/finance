import Error from './error'
import { isString } from './dataType'
import { uploadFileJex } from './api'
let list = []

class File {
  constructor (fileName, file) {
    if (fileName && file) {
      if (!isString(fileName)) {
        throw new Error(Error.Type)
      }
      list.push({ fileName: fileName, file })
    }
  }
  
  save () {
    if (!list.length) {
      throw new Error(Error.Type)
    }
    const formData = new FormData()
    console.log(list)
    list.map(v => {
      formData.append('files', v.file)
    })
    return uploadFileJex(formData)
  }
}

export default function (fileName, file) {
  return new File(fileName, file)
}
