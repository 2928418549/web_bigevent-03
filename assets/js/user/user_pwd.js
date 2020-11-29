$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '不能和原密码一致'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '密码必须一致'
            }
        }
    })
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('更换成功')
                
            }
        })
    })
})