$(function () {
    load();
    //输入数据
    $('#title').on('keydown', function (event) {
        if (event.keyCode == 13) {
            if ($(this).val() == "") {
                alert('请输入内容！');
            } else {
                var local = getDate();
                local.push({ title: $(this).val(), done: false });
                saveDate(local);
                load();
                $(this).val("");
            }
        }
    })
    //删除数据
    $('ol,ul').on('click', 'a', function () {
        var data = getDate();
        var index = $(this).attr('id');
        data.splice(index, 1);
        saveDate(data);
        load();
    })
    //点击已完成/未完成切换
    $('ol,ul').on('click', 'input', function () {
        var data = getDate();
        var index = $(this).siblings('a').attr('id');
        console.log(index);

        data[index].done = $(this).prop('checked');
        saveDate(data);
        load();
    })
    //获取数据
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存数据
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    //界面渲染，数据加载
    function load() {
        var data = getDate();
        $('ol,ul').empty();
        var todocount = 0;
        var donecount = 0;
        $.each(data, function (i, n) {
            if (n.done) {
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>' + n.title + '</p><a href="javascript:;" id=' + i + '></a></li>');
                donecount++;
            } else {
                $('ol').prepend('<li><input type="checkbox"><p>' + n.title + '</p><a href="javascript:;" id=' + i + '></a></li>');
                todocount++;
            }
        })
        $('#todocount').text(todocount);
        $('#donecount').text(donecount);
    }
})