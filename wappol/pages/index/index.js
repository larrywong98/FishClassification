//index.js
//获取应用实例
const app = getApp()
var Util = require('../../utils/util.js');
Page({
  data: {
    motto: 'Welcome Stranger',
    res: 'Hey AI,What is it？',
    btn_name: "Choose pic",
    condition: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  btn_primary: function () {
    var btn_this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: 'Loading',
        })
        wx.uploadFile({
          url: 'ip_address',
          filePath: tempFilePaths[0],
          method: 'POST',
          name: "picture",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            var result = JSON.parse(res.data)
//            console.log(result.data)
            wx.hideLoading()
//            console.log(temp)
            wx.navigateTo({
              url: '../result/result?result=' + res.data + '&tempFilePath=' + JSON.stringify(tempFilePaths)
            })
          },
          fail: function() {
            wx.hideLoading()
            wx.showModal({
              title: '失败',
              content: '请求超时',
              showCancel: false
            })
          }
        })
      }
    })
  },
})
