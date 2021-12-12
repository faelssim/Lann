// components/Header/Header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    date: Array,
    type: {
      type: String,
      value: 'input'
    },
    dropList: {
      type: Array,
      value: []
    },
    dropIndex: {
      type: Number,
      value: 0
    },
    labelKey: {
      type: String,
      value: 'label'
    },
    valueKey: {
      type: String,
      value: 'value'
    },
    placeholder: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    open: false,
    visible: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleOpenDrop () {
      this.setData({
        open: !this.data.open
      })
    },
    handleCloseDrop () {
      this.setData({
        open: false
      })
    },
    handleCheckedItem (e) {
      const { currentTarget: { dataset: { value } } } = e
      this.setData({
        dropIndex: +value
      })
      this.handleCloseDrop()
    },
    handleFocus () {
      this.handleCloseDrop()
      this.triggerEvent('focus')
    },
    handleOpenPicker () {
      this.handleCloseDrop()
      this.setData({
        visible: true
      })
    },
    handleSearch () {
      this.triggerEvent('search')
    }
  }
})
