// components/Textarea/Textarea.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    placeholder: String,
    maxlength: {
      type: Number,
      value: -1
    },
    autoHeight: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFocus () {
      this.triggerEvent('focus')
    },
    handleBlur () {
      this.triggerEvent('blur')
    }
  }
})
