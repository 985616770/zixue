<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="utf-8">
  <title>Comments &laquo; Admin</title>
  <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/vendors/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="/static/assets/vendors/nprogress/nprogress.css">
  <link rel="stylesheet" href="/static/assets/css/admin.css">
  <script src="/static/assets/vendors/nprogress/nprogress.js"></script>
  <style>
    .run-loader {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 5px solid #4A9EB1;
  border-right-color: transparent;
  border-radius: 50%;
  animation: loader-rotate 1s linear infinite;
}

@keyframes loader-rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } 
    }
#load {
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:none;
  background: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content:center;
  z-index: 999;
  
}
  </style>

</head>

<body>
  <script>NProgress.start()</script>
  <div id="load">
    <div class="run-loader"></div>
  </div>

  <div class="main">
    <?php include 'inc/navbar.php' ?>
    <div class="container-fluid">
      <div class="page-title">
        <h1>所有评论</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <!-- show when multiple checked -->
        <div class="btn-batch" style="display: none">
          <button class="btn btn-info btn-sm">批量批准</button>
          <button class="btn btn-warning btn-sm">批量拒绝</button>
          <button class="btn btn-danger btn-sm">批量删除</button>
        </div>
        <ul class="pagination pagination-sm pull-right">

        </ul>
      </div>
      <table class="table table-striped table-borde0 table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>作者</th>
            <th>评论</th>
            <th>评论在</th>
            <th>提交于</th>
            <th>状态</th>
            <th class="text-center" width="150">操作</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </div>

  <?php $current_page = 'comments'; ?>
  <?php include 'inc/sidebar.php' ?>
  <script id="comments_tmpl" type="text/x-jsrender">
    {{for comments}}
<tr {{if status == 'held'}} class ="warning" {{else status == 'rejected'}} class ="danger"{{/if}} data-id = "{{:id}}"> 
  <td class="text-center"><input type="checkbox"></td>
  <td>{{:author}}</td>
  <td>{{:content}}</td>
  <td>{{:post_title}}</td>
  <td>{{:created}}</td>
  <td>{{:status}}</td>
  <td class="text-center">
    {{if status == 'held'}}
    <a href="post-add.html" class="btn btn-info btn-xs">批准</a>
    <a href="javascript:;" class="btn btn-warning btn-xs">拒绝</a>
    {{/if}}
    
    <a href="javascript:;" class="btn btn-danger btn-xs btn-delete">删除</a>
  </td>
</tr>
{{/for}}
  </script>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script src="/static/assets/vendors/jsrender/jsrender.js"></script>

  <script src="/static/assets/vendors/twbs-pagination/jquery.twbsPagination.js"></script>
  <script>
    $(document)
      .ajaxStart(function () {
        NProgress.start()
        $('#load').css('display','flex')
      })
      .ajaxStop(function () {
        NProgress.done()
        $('#load').css('display','none')
      })
    //发送ajax请求
      

    var currentPage = 1  

    function loadPageData(page) {

      $('tbody').fadeOut()
      $.getJSON("/admin/api/comments.php", {page: page}, function (res) {
        $('.pagination').twbsPagination('destroy')
        $('.pagination').twbsPagination({
          first: '&laquo;',
          last: '&raquo;',
          prev: '上一页',
          next: '下一页',
          startPage:page,
          totalPages: res.total_pages,
          visiblePages: 5,
          initiateStartPageClick: false,
          onPageClick: function (e, page) {
            loadPageData(page)
          }
        })
        var html = $('#comments_tmpl').render({
          comments: res.comments
        })
        $('tbody').html(html).fadeIn()
        currentPage = page
      })
    }

    loadPageData(currentPage)

    //注册点击事件,按钮是动态添加的,所以用事件委托机制
    $('tbody').on('click','.btn-delete', function () {
      //delete solo data  
      //1.拿到需要删除的ID
      $tr = $(this).parent().parent()
      var id =$tr.data('id')
      //2.发送Ajax请求
      $.get('/admin/api/comments-delete.php',{ id:id },function(res){
        if (!res) return
        //在界面上删除元素 
        $tr.remove()
        loadPageData(currentPage)
      })
    })

  </script>
  <script>
    NProgress.done()
  </script>
</body>

</html>