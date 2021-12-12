// pages/subscribe/subscribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: '#ff6706',
    customType: 0,
    customName: '',
    customId: '',
    projectName: '',
    projectId: '',
    birthday: '',
    sex: 1,
  },

  handleRadioGroupChange (e) {
    const { detail: { value }, currentTarget: { dataset: { key } } } = e
    this.setData({
      [key]: +value
    })
  },

  handlePickerDate () {
    wx.navigateTo({
      url: './datePicker',
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