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
    value: {
      type: String,
      value: ''
    },
    splitCode: {
      type: String,
      value: '-'
    },
    range: {
      type: Number,
      value: 7
    }
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
  },
  observers: {
    'current.M': function () {
      // console.log(v)
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
      this.getCurrentDate(this.value)
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
      const { currentTarget: { dataset: { value } } } = e
      console.log(value)
      if (value.disabled) {
        wx.showToast({
          title: '该日期不可选',
          icon: 'error'
        })
      } else {
        const { splitCode } = this.data
        this.setData({
          value: [value.y, value.m.padStart(2, '0'), value.d.padStart(2, '0')].join(splitCode)
        })
        this.handleCloseCalendar()
      }
    },
    getCurrentDate (value) {
      const C = {}
      if (value) {
        const T = T.split(this.data.splitCode)
        C.Y =  +T[0]
        C.M = +T[1]
        C.D = +T[2]
      } else {
        const T = new Date()
        C.Y =  T.getFullYear()
        C.M = T.getMonth() + 1
        C.D = T.getDate()
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
        return [M, Y - 1]
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
      const { current: { Y, M, D }, init, range, splitCode } = this.data
      const CURRENT_DAYS = this.getMonthDays(M, Y)
      const F = this.getFirstDayInWeek()
      const L = 42 - F - CURRENT_DAYS
      let validDate = util.getValidDateRange(`${init.Y}-${init.M}-${init.D}`, range)
      validDate = Object.values(validDate).map(item => item.v)
      //补齐前缀天数
      if (F > 0) {
        const T = this.getPrevMonth()
        const prev = this.getMonthDays(...T)
        for (let i = 0; i < F; i++) {
          List.unshift({
            d: prev - i,
            m: T[0],
            y: T[1],
            disabled: true
          })
        }
      }
      for (let i = 1; i <= CURRENT_DAYS; i++) {
        List.push({
          d: i,
          m: M,
          y: Y,
          disabled: !validDate.includes(`${Y}${splitCode}${M}${splitCode}${i}`)
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
            disabled: !validDate.includes(`${T[1]}${splitCode}${T[0]}${splitCode}${i + 1}`)
          })
        }
      }
      this.setData({
        List: List
      })
    }
  }
})
