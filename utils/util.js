// 扩充Number类型
Number.prototype.padStart = function (len = 1, code = '') {
  return String(this).padStart(len, code)
}

function validatePhone (value) {
  if (!value) {
    return {
      value: false,
      text: '请输入手机号'
    }
  }
  if (!/^1\d{10}$/.test(value)) {
    return {
      value: false,
      text: '手机号格式有误'
    }
  }
  return {
    value: true
  }
}
function isLeapYear (value) {
  return value % 400 ===  0 || value % 4 === 0 && value % 100 !== 0
}
function getMonthDays (m, y) {
  if ([1,3,5,7,8,10,12].includes(+m))  {
    return 31
  } else if (+m === 2) {
    return isLeapYear(+y) ? 29 : 28
  } else {
    return 30
  }
}
function getValidDateRange (initDate, range) {
  const R = {}
  let [y, m, d] = initDate.split('-')
  y = +y
  m = +m
  d = +d
  let days = getMonthDays(m, y)
  // r 范围 s 起始的日期（几号） m 月份 y 年份 d天数
  function _f (r, s, m, y, d, v) {
    if (r <= d - s) {
      for (let i = 0; i <= r; i++) {
        const t = `${y}-${m}-${s + i}`
        v[`${y}-${m.padStart(2, '0')}-${(s + i).padStart(2, '0')}`] = {
          v: t,
          w: new Date(t).getDay()
        }
      }
    } else {
      for (let i = s; i <= d; i++) {
        const t = `${y}-${m}-${i}`
        v[`${y}-${m.padStart(2, '0')}-${i.padStart(2, '0')}`] = {
          v: t,
          w: new Date(t).getDay()
        }
      }
      r = r - d + s
      const _m  = m === 12 ? 1 : m + 1
      const _y = m === 12 ? y + 1 : y
      _f(r, 1, _m, _y, getMonthDays(_m, _y), v)
    }
  }
  _f(range, d, m, y, days, R)
  return R
}
module.exports = {
  validatePhone: validatePhone,
  isLeapYear: isLeapYear,
  getMonthDays: getMonthDays,
  getValidDateRange: getValidDateRange
}
