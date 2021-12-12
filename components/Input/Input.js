// components/Input/Input.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    type: {
      type: String,
      value: 'text'
    },
    placeholder: String,
    isPassword: {
      type: Boolean,
      value: false
    },
    icon: String,
    isNeedCode: {
      type: Boolean,
      value: false
    },
    showTip: {
      type: Boolean,
      value: false
    },
    tipText: {
      type: String,
      value: ''
    },
    phone: String,
    label: String,
    required: {
      type: Boolean,
      value: false
    },
    border: {
      type: Boolean,
      value: true
    },
    align: {
      type: String,
      value: 'left'
    },
    openSlot: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isSending: false,
    seconds: 59
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFocus () {
      this.triggerEvent('focus')
    },
    handleBlur () {
      const { value } = this.data
      this.triggerEvent('blur', {
        value: value
      })
    },
    handleSendCode () {
      const { phone, isSending} = this.data
      if (isSending) {
        return
      }
      const { validatePhone } = app.globalData.util
      const { value, text } = validatePhone(phone)
      if (value) {
        this.setData({
          isSending: true
        })
        this.startCountdown()
      } else {
        wx.showToast({
          title: text,
          icon: 'error'
        })
      }
    },
    startCountdown () {
      const timer = setInterval(() => {
        this.setData({
          seconds: this.data.seconds - 1
        }, (value) => {
          if (this.data.seconds === 0) {
            clearInterval(timer)
            this.setData({
              isSending: false,
              seconds: 59
            })
          }
        }) 
      }, 1000)
    }
  }
})
