$(function () {
    var form = layui.form
    initArsCaseList()
    function initArsCaseList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var htmlSrc = template('tpl-table', res)
                $('tbody').html(htmlSrc)
            }
        })
    }
    $('#btnAdd').on('click', function () {
        layer.open({
            type: 1,
            title: '在线调试',
            area: ['500px', '250px'],
            content: $('#tpl-Add').html()
        });


    })
    $('body').on('submit', '#form-Add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('添加成功')
                initArsCaseList()
                layer.closeAll()
            }
        })
    })
    $('tbody').on('click', '.btn-edit', function () {
        var id = $(this).attr('data-id')
        layer.open({
            type: 1,
            title: '修改',
            area: ['500px', '250px'],
            content: $('#tpl-edit').html()
        });

        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('修改成功')
                initArsCaseList()
                layer.closeAll()
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg('删除成功')
                    initArsCaseList()
                    layer.closeAll()
                }
            })

            layer.close(index);
        });


    })
})