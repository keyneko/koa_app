import dayjs from 'dayjs'
import i18n from '@/lang'

/**
 * 延时函数
 * @param  {Number} time [description]
 * @return {[type]}      [description]
 */
export function delay(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/**
 * 将数字格式化为千位分隔的字符串，并保留指定的小数位数。
 *
 * @param {number|string} num   需要格式化的数字或数字字符串。
 * @param {number} [digits=0]   保留的小数位数，默认为0。
 * @return {string}             格式化后的字符串。
 */
export function fmtThousands(num, digits = 0) {
  // 辅助函数，用于格式化数值
  function formatNumericValue(value) {
    return value.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 检查输入值是否为有效的数字或可以转换为数字的字符串
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 如果是字符串类型的数字，则转换为数字类型
    const numericValue = typeof num === 'string' ? parseFloat(num) : num
    return formatNumericValue(numericValue)
  }
  else {
    // 如果输入不是有效数字或数字字符串，则原样返回
    return num
  }
}

/**
 * 计算一个值相对于总值的百分比。
 * @param  {number} value   要计算百分比的部分值。
 * @param  {number} total   总值，代表100%。
 * @return {string}         相对于总值的百分比表示。
 */
export function percentage(value, total) {
  // 将输入转换为数字以确保进行有效的数值运算
  const numericValue = Number(value)
  const numericTotal = Number(total)

  // 检查是否为有效的非零数字总值以避免除以零的情况
  if (numericTotal === 0) {
    return '0%'
  }

  // 计算百分比
  const calculatedPercentage = (numericValue / numericTotal) * 100

  // 使用 toFixed 处理浮点数精度问题并四舍五入到最近的整数
  const percentageString = `${calculatedPercentage.toFixed(0)}%`

  return percentageString
}

/**
 * 计算一个值相对于总值的千分比。
 * @param  {number} value   要计算千分比的部分值。
 * @param  {number} total   总值，代表1000‰。
 * @return {string}         相对于总值的千分比表示。
 */
export function permillage(value, total) {
  // 将输入转换为数字以确保进行有效的数值运算
  const numericValue = Number(value)
  const numericTotal = Number(total)

  // 检查是否为有效的非零数字总值以避免除以零的情况
  if (numericTotal === 0) {
    return '0‰'
  }

  // 计算千分比
  const calculatedPermillage = (numericValue / numericTotal) * 1000

  // 使用 toFixed 处理浮点数精度问题并四舍五入到最近的整数
  const permillageString = `${calculatedPermillage.toFixed(0)}‰`

  return permillageString
}

/**
 * 将百分数（字符串）转换为对应的小数。
 * @param  {string} value   表示百分数的字符串，例如 "50%"。
 * @return {number}         转换后的小数，例如 0.5。
 */
export function per2num(value) {
  // 检查输入是否为字符串，如果不是或者为空字符串，则返回0
  if (typeof value !== 'string' || value.trim() === '') {
    return 0
  }

  // 移除字符串中的百分号，并将其转换为数字
  const numericValue = Number(value.replace('%', ''))

  // 检查转换后的数字是否为有效数字
  if (isNaN(numericValue)) {
    return 0
  }

  // 将百分比转换为小数
  return numericValue / 100
}

/**
 * 将日期时间转换为更易读的格式，如“今天”，“昨天”，“明天”，或“YYYY-MM-DD”，并附上时间。
 * @param  {string|number|Date} value   代表日期时间的值，可以是字符串、时间戳或Date对象。
 * @return {string}                     可视化友好的日期时间字符串。
 */
export function datetime2vis(value) {
  const date = dayjs(value)
  const now = dayjs()
  const yesterday = now.subtract(1, 'day')
  const tomorrow = now.add(1, 'day')
  const formattedTime = date.format('HH:mm:ss')

  // 根据日期相对于当前日期的位置，选择合适的标签
  let formattedDate
  if (date.isSame(now, 'day')) {
    formattedDate = '今天'
  }
  else if (date.isSame(yesterday, 'day')) {
    formattedDate = '昨天'
  }
  else if (date.isSame(tomorrow, 'day')) {
    formattedDate = '明天'
  }
  else {
    formattedDate = date.format('YYYY-MM-DD')
  }

  // 返回合并的日期和时间字符串
  return `${formattedDate} ${formattedTime}`
}

/**
 * 格式化日期。
 * @param  {string|number|Date} value       要格式化的日期，可以是字符串、时间戳或Date对象。
 * @param  {string} [format='YYYY-MM-DD']   日期格式，默认为'YYYY-MM-DD'。
 * @return {string}                         格式化后的日期字符串。如果输入值无效，将返回空字符串。
 */
export function dateformat(value, format = 'YYYY-MM-DD') {
  // 检查是否有有效的值，如果没有，则返回空字符串
  if (!value) return ''

  // 使用dayjs进行日期格式化，如果值无效，dayjs会返回'Invalid Date'
  const formattedDate = dayjs(value).format(format)

  // 检查dayjs是否返回了一个有效的日期字符串
  return formattedDate === 'Invalid Date' ? '' : formattedDate
}

/**
 * 根据给定字符串生成HSLA颜色值。
 * @param {string} str        要转换为颜色的字符串。
 * @param {number} [alpha=1]  透明度值，范围从0（完全透明）到1（完全不透明）。
 * @return {string}           返回HSLA颜色字符串。
 */
export function str2hsla(str, alpha = 1) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // 使用hash值计算一个0到360之间的颜色值
  const hue = hash % 360
  return `hsla(${hue}, 100%, 50%, ${alpha})`
}
