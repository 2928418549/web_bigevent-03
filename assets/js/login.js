$(function () {
    $('#reg').on('click', function () {
        $('#box-login').hide()
        $('#box-reg').show()
    })
    $('#login').on('click', function () {
        $('#box-login').show()
        $('#box-reg').hide()
    })
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value !== $('[name=repassword]').val()) {
                return '输入不一致'
            }
        }
    })
    $('#box-reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#login').click()
            }
        })
    })
    $('#box-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })
})