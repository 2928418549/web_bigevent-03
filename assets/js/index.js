$(function () {
    getUserInfo()
    $('#btnLogout').on('click',function(){
        layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href="/login.html"
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.user-avatar').html(name[0].toUpperCase()).show()
    }
}