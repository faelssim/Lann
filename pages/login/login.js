// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: {
      phone: {
        show: false,
        text: ''
      },
      code: {
        show: false,
        text: ''
      }
    },
    phone: '',
    code: '',
    visible: false,
    date: '',
  },

  handleLogin () {
    this.setData({
      visible: !this.data.visible
    })
    return
    const { validatePhone } = app.globalData.util
    const { tip, phone, code } = this.data
    const { value, text } = validatePhone(phone)
    tip.phone.show = !value
    tip.phone.text = text
    if (code === '') {
      tip.code.show = true
      tip.code.text = '请输入短信验证码'
    } else {
      tip.code.show = false
    }
    this.setData({
      tip: tip
    })
    if (!tip.phone.show && !tip.code.show) {
      console.log('pass')
    }
  },

  handleInputFocus () {
    const { tip } = this.data
    tip.phone.show = tip.code.show = false
    this.setData({
      tip: tip
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})