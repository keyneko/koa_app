import axios from 'axios'
import * as API from '@/api/app'

/**
 * 文件上传
 * @param  {Object} file file对象
 */
export function upload(file) {
  const formData = new FormData()
  formData.append('file', file)
  return API.upload(formData)
}

export function base64ToFile(data, filename = 'untitled') {
  try {
    const arr = data.split(',')
    const mimeMatch = arr[0].match(/:(.*?);/)
    if (!mimeMatch) {
      throw new Error('Invalid base64 data')
    }

    const mime = mimeMatch[1]
    const extensionMatch = mime.match(/\/([a-zA-Z]+)/)
    const extension = extensionMatch ? `.${extensionMatch[1]}` : ''

    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    // Append the file extension to the filename
    const filenameWithExtension = `${filename}${extension}`

    // Convert to a File object
    return new File([u8arr], filenameWithExtension, { type: mime })
  } catch (e) {
    console.error(e)
  }
}

export function pathToFile(filePath, accept) {
  if (!(accept instanceof RegExp) && typeof accept !== 'string') {
    return Promise.reject(new Error('accept 参数必须是正则表达式或字符串'))
  }

  const filename = filePath.split('/').pop()
  return fetch(filePath)
    .then((response) => response.blob())
    .then((blob) => {
      if (
        (accept instanceof RegExp && accept.test(blob.type)) ||
        (typeof accept === 'string' && blob.type.startsWith(accept))
      ) {
        const file = new File([blob], filename, { type: blob.type })
        return file
      } else {
        return Promise.reject(new Error('文件类型不符合要求或指定文件未找到'))
      }
    })
}
