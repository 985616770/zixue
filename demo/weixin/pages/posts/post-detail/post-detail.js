let postsData = require('../../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取id,读取数据文件,根据id筛选数据,挂载数据
    let postId = options.id;
    this.data.postId = postId;
    let postData = postsData.post_list[postId];
    this.setData({
      ...postData
    })

    let postsCollection = wx.getStorageSync('postsCollection')
    if (postsCollection) {
      let collected = wx.getStorageSync(postsCollection[postId])
      if (collected) {
        this.setData({
          collected
        })
      }
    } else {
      let postsCollection = {};
      postsCollection[postId] = false;
      wx.setStorageSync('postsCollection', postsCollection)
    }


  },
  onCollectionTap() {
    let postId = this.data.postId;
    let postsCollection = wx.getStorageSync('postsCollection')
    let collected = postsCollection[postId];

    let message = '';
    if (collected) {
      message = '是否取消收藏'
    } else {
      message = '是否收藏'
    }
    wx.showModal({
      content: message,
      confirmText:'是',
      cancelText:'否',
      success: (res) => {
        if (res.confirm) {
          collected = !collected;
          postsCollection[postId] = collected;
          wx.setStorageSync('postsCollection', postsCollection);
          this.setData({
            collected
          })
        }
      }
    })


  },
  onShareTap() {
    wx.removeStorageSync(key)
  }

})