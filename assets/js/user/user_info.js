$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '长度在1-6之间'
            }
        }
    })
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val("formUserInof", res.data)
            }
        })
    }
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('click',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.getUserInfo()
            }
        })
    })

})