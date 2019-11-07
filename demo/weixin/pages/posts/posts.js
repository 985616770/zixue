let postData = require('../../data/posts-data.js')

Page({
  data: {},
  postTap(event) {
    let postId = event.currentTarget.dataset.postid;
    console.log(postId)
    wx.navigateTo({
      url: `./post-detail/post-detail?id=${postId}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      local_database: postData.post_list
    });
  },


})