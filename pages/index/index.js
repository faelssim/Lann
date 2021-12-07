// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    banner: [
      { img: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' },
      { img: 'https://images.pexels.com/photos/373934/pexels-photo-373934.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' },
      { img: 'https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }
    ],
    List: [
      {
        img: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: '虹桥龙湖天街店',
        distance: 23,
        address: '闵行区胜昌路869号龙湖虹桥天街A馆526、527',
        isUsed: true
      },
      {
        img: 'https://images.pexels.com/photos/2831794/pexels-photo-2831794.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        title: '虹桥龙湖天街店',
        distance: 23,
        address: '闵行区胜昌路869号龙湖虹桥天街A馆526、527',
        isUsed: false
      }
    ]
  },
  onLoad() {
    
  } 
})
