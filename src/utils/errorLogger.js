// errorLogger.js
import Vue from 'vue'
import store from '@/store'
import { errorLog } from '@/settings'
import * as API from '@/api/app'

const env = process.env.NODE_ENV

// 启用错误日志系统
if (errorLog.includes(env)) {
  // 打开或创建 IndexedDB 数据库
  const request = indexedDB.open('errorLogsDB', 1)

  request.onerror = function(event) {
    console.error('Failed to open database:', event.target.error)
  }

  request.onupgradeneeded = function(event) {
    const db = event.target.result
    // 检查是否存在名为'errorLogs'的object store
    if (!db.objectStoreNames.contains('errorLogs')) {
      var objectStore = db.createObjectStore('errorLogs', { keyPath: 'timestamp' })
      objectStore.createIndex('timestamp', 'timestamp', { unique: true })
      objectStore.createIndex('error', 'error', { unique: false })
      objectStore.createIndex('info', 'info', { unique: false })
      objectStore.createIndex('vm', 'vm', { unique: false })
      objectStore.createIndex('url', 'url', { unique: false })
      objectStore.createIndex('user', 'user', { unique: false })
    }
  }

  request.onsuccess = function(event) {
    const db = event.target.result
    console.info('Database opened successfully')

    // Vue应用的错误处理函数
    Vue.config.errorHandler = function(err, vm, info) {
      Vue.nextTick(() => {
        const errorLog = {
          timestamp: +new Date(),
          error: err.toString(),
          info: info,
          vm: vm.$options.name,
          // 其他需要记录的信息
          url: window.location.href,
          user: store.getters.nickName,
        }

        // 将错误日志写入 IndexedDB
        writeErrorLogToIndexedDB(db, errorLog)

        // 错误日志上报
        API.log({
          message: JSON.stringify(errorLog),
        })
      })
    }

    // 执行检查操作
    checkErrorLogsInIndexedDB(db)
    // 执行清理操作
    cleanupOldLogs(db)

    // const oneWeekAgo = new Date();
    // oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // writeErrorLogToIndexedDB(db, {
    //   timestamp: +oneWeekAgo,
    //   error: "hello world",
    //   info: "You win",
    //   url: window.location.href,
    // });
  }
}

// 写入错误日志到 IndexedDB 的函数
function writeErrorLogToIndexedDB(db, errorLog) {
  const transaction = db.transaction(['errorLogs'], 'readwrite')
  const objectStore = transaction.objectStore('errorLogs')

  // 添加错误日志到对象存储空间
  objectStore.add(errorLog)
}

// 检查 IndexedDB 中的错误日志数据并更新 log state 的函数
function checkErrorLogsInIndexedDB(db) {
  const transaction = db.transaction(['errorLogs'], 'readonly')
  const objectStore = transaction.objectStore('errorLogs')

  // 获取7天前的日期
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const sevenDaysAgo = date.getTime()

  // 创建一个 IDBKeyRange 来表示这个日期范围
  const range = IDBKeyRange.lowerBound(sevenDaysAgo)

  const request = objectStore.openCursor(range, 'prev') // 使用 'prev' 参数来按照降序遍历

  const errorLogs = []

  request.onsuccess = function(event) {
    const cursor = event.target.result
    if (cursor) {
      errorLogs.push(cursor.value) // 将每个日志添加到数组中
      cursor.continue()
    }
    else {
      // 使用检索到的数据更新 log state
      store.commit('errorLog/ADD_ERROR_LOGS', errorLogs)
    }
  }

  request.onerror = function(event) {
    console.error('Error during retrieval:', event.target.errorCode)
  }
}

// 添加一个清理操作，以保留最近7天的错误日志
function cleanupOldLogs(db) {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const transaction = db.transaction(['errorLogs'], 'readwrite')
  const objectStore = transaction.objectStore('errorLogs')

  // 创建一个键范围，包含一周前的所有时间
  const keyRange = IDBKeyRange.upperBound(oneWeekAgo.getTime())
  const request = objectStore.openCursor(keyRange)

  request.onsuccess = function(event) {
    const cursor = event.target.result
    if (cursor) {
      // 如果日志时间早于7天前，删除它
      objectStore.delete(cursor.primaryKey)
      cursor.continue()
    }
  }

  request.onerror = function(event) {
    console.error('Error during cleanup:', event.target.errorCode)
  }

  transaction.onerror = function(event) {
    console.error('Transaction failed:', event.target.errorCode)
  }
}
