// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'aspectFit',
    result: '',
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var out = ''
    var result = JSON.parse(options.result)
    var tempFilePath = JSON.parse(options.tempFilePath)
    var temp = result.data.sort(function (a, b) { return b['acc'] - a['acc'] })
    for(var i = 0; i < 5; i++) {
      if(temp[i]['acc'] == 0) break
      out += temp[i]['name'] + ":" + temp[i]['acc'] + '%\n'
    }
    this.setData({
      result: out,
      src: tempFilePath
    })
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