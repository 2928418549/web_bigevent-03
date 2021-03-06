$(function () {
    var form = layui.form
    initCate()
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
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseImage').on('click', function () {
        $('#covarFile').click()
    })
    $('#covarFile').on('change', function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    var state = '已发布'
    $('#btnSave').on('click', function () {
        state = '草稿'
    })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })
    function publishArticle(fd){
        $.ajax({
            method:'POST',
            url: '/my/article/add',
            contentType:false,
            processData:false,
            data:fd,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('发布成功')
                    window.parent.document.getElementById('art_list').click()
            }
        })
    }
})