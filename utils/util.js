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

module.exports = {
  validatePhone: validatePhone
}
