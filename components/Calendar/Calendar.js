// components/Calendar/Calendar.js
const { globalData: { util } } = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'date' // date只选择一个时间 dateRange 选择范围
    },
    value: {
      type: [String, Array],
      value: ''
    },
    splitCode: {
      type: String,
      value: '-'
    },
    maxlength: { // 最长可选择的天数
      type: Number,
      value: 7
    },
    validText: { // 可选择的日期提示文字
      type: String,
      value: '' // 可预约
    },
    minDate: String,
    maxDate: String,
    showMark: Boolean,
  },
  /**
   * 组件的初始数据
   */
  data: {
    init: {},
    current: {
      Y: '',
      M: '',
      D: ''
    },
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    List: [],
    modalAnimation: {},
    isClose: false,
    checkedDate: []
  },
  observers: {
    'current.M': function () {
      this.getDayList()
    },
    'visible': function (v) {
      if (v) {
        wx.nextTick(() => {
          this.animate.translateY(0).opacity(1).step()
          this.setData({
            modalAnimation: this.animate.export()
          })
        })
      }
    }
  },
  lifetimes: {
    attached () {
      this.animate = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      this.getCurrentDate(this.data.value)
    },
    detached () {}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handlePrevMonth () {
      const { current } = this.data
      if (current.M === 1) {
        current.M = 12
        current.Y--
      } else {
        current.M--
      }
      this.setData({
        current: current
      })
    },
    handleNextMonth () {
      const { current } = this.data
      if (current.M === 12) {
        current.M = 1
        current.Y++
      } else {
        current.M++
      }
      this.setData({
        current: current
      })
    },
    handleCloseCalendar () {
      this.setData({
        isClose: true
      })
      this.animate.translateY(-40).opacity(0).step()
      this.setData({
        modalAnimation: this.animate.export()
      })
    },
    handleCloseAnimationEnd () {
      this.data.isClose && this.setData({
        visible: false,
        isClose: false
      })
    },
    handleCheckedCell (e) {
      const { type } = this.data
      const { currentTarget: { dataset: { value, idx } } } = e
      if (value.disabled) {
        wx.showToast({
          title: '该日期不可选',
          icon: 'error'
        })
      } else {
        if (type === 'date') {
          const { List } = this.data
          const checkDate = [`${value.y}/${value.m}/${value.d}`]
          this.setData({
            checkedDate: checkDate
          })
          this.setCellStatus(List, checkDate)
          this.setData({
            List: List
          })
        } else {
          const { checkedDate, List } = this.data
          checkedDate.length === 2 && (checkedDate.length = 0)
          checkedDate.push(`${value.y}/${value.m}/${value.d}`)
          checkedDate.sort((a, b) => {
            return new Date(a) < new Date(b) ? -1 : 1
          })
          this.setCellStatus(List, checkedDate)
          this.setData({
            checkedDate: checkedDate,
            List: List
          })
        }
        // const { splitCode } = this.data
        // this.setData({
        //   value: [value.y, value.m.padStart(2, '0'), value.d.padStart(2, '0')].join(splitCode)
        // })
        // this.handleCloseCalendar()
      }
    },
    setCellStatus (target, checkedDate) {
      if (this.data.type === 'date') {
        target.forEach(item => {
          item.checked = checkedDate[0] === `${item.y}/${item.m}/${item.d}`
        })
      } else {
        target.forEach((item) => {
          item.isStart = checkedDate[0] ? checkedDate[0] === `${item.y}/${item.m}/${item.d}` : false
          item.isEnd = checkedDate[1] ? checkedDate[1] === `${item.y}/${item.m}/${item.d}` : false
          item.isMid = checkedDate.length > 1 && new Date(checkedDate[0]) < new Date(`${item.y}/${item.m}/${item.d}`) && new Date(checkedDate[1]) > new Date(`${item.y}/${item.m}/${item.d}`) 
        })
      }
    },
    getCurrentDate (value) {
      const { type } = this.data
      let tmpDate
      if (type === 'date') {
        tmpDate = value ? new Date(value) : new Date()
      } else {
        tmpDate = Array.isArray(value) && value.length ? new Date(value[0]) : new Date()
      }
      const C = {
        Y: tmpDate.getFullYear(),
        M: tmpDate.getMonth() + 1,
        D: tmpDate.getDate()
      }
      this.setData({
        current: C,
        init: { ...C }
      })
    },
    // 获取当前月天数
    getMonthDays (m, y) {
      return util.getMonthDays(m, y)
    },
    // 获取第一天是周几？
    getFirstDayInWeek () {
      const { current: { Y, M } } = this.data
      return new Date(`${Y}-${M}-1`).getDay()
    },
    // 获取上一月?
    getPrevMonth () {
      const { current: { Y, M } } = this.data
      if (M === 1) {
        return [12, Y - 1]
      } else {
        return [M - 1, Y]
      }
    },
    // 获取下一月?
    getNextMonth () {
      const { current: { Y, M, D } } = this.data
      if (M === 12) {
        return [1, Y + 1]
      } else {
        return [M + 1, Y]
      }
    },
    getDayList () {
      const List = []
      const { current: { Y, M, D }, minDate, maxDate, type, checkedDate } = this.data
      const CURRENT_DAYS = this.getMonthDays(M, Y)
      const F = this.getFirstDayInWeek()
      const L = 42 - F - CURRENT_DAYS
      //补齐前缀天数
      if (F > 0) {
        const T = this.getPrevMonth()
        const prev = this.getMonthDays(...T)
        for (let i = 0; i < F; i++) {
          List.unshift({
            d: prev - i,
            m: T[0],
            y: T[1],
            disabled: (minDate ? new Date(minDate) > new Date(`${T[1]}-${T[0]}-${prev-i}`) : false) || (maxDate ? new Date(maxDate) < new Date(`${T[1]}-${T[0]}-${prev-i}`) : false)
          })
        }
      }
      for (let i = 1; i <= CURRENT_DAYS; i++) {
        List.push({
          d: i,
          m: M,
          y: Y,
          disabled: (minDate ? new Date(minDate) > new Date(`${Y}-${M}-${i}`) : false) || (maxDate ? new Date(maxDate) < new Date(`${Y}-${M}-${i}`) : false)
        })
      }
      // 补齐后缀天数
      if (L > 0) {
        for (let i = 0; i < L; i++) {
          const T = this.getNextMonth()
          List.push({
            d: i + 1,
            m: T[0],
            y: T[1],
            disabled: (minDate ? new Date(minDate) > new Date(`${T[1]}-${T[0]}-${i + 1}`) : false) || (maxDate ? new Date(maxDate) < new Date(`${T[1]}-${T[0]}-${i + 1}`) : false)
          })
        }
      }
      this.setCellStatus(List, checkedDate)
      this.setData({
        List: List
      })
    }
  }
})
