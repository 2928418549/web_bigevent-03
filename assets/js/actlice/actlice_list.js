$(function () {
    var form = layui.form
    var laypage = layui.laypage;
    template.defaults.imports.dateFormat = function (dtSrc) {
        var dt = new Date(dtSrc)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + "-" + d + " " + hh + ":" + mm + ":" + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: '',
    }
    initTable()
    initCate()
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var htmlSrc = template('tpl-table', res)
                $('tbody').html(htmlSrc)
                renderPage(res.total)
            }
        })
    }
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var htmlSrc = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlSrc)
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) {

        e.preventDefault()

        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        q.cate_id = cate_id
        q.state = state

        initTable()
    })
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/delete/' + id,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('删除成功')
                var len = $('.btn-delete').length
                if (len === 1) {
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                }
                initTable()
            }
        })
    })

})