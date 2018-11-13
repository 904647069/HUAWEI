$(function () {
    //用户名验证
    var username = "";
    var uname = $(".username");
    var unameFlag = true;
    uname.blur(function () {
        username = uname.val();
        if (username) {
            if (!/^[\w\u4e00-\u9fa5]{2,10}$/.test(username)) {
                $(".reguname").html("用户名由2-10个中文字符、英文字符、下划线和数字组成");
                $(".uname_input").addClass("input_error");
                unameFlag = false;
            }
            else {
                var pro = new Promise(function (suc, fail) {
                    $.ajax({
                        type: "get",
                        url: "../php/register.php",
                        data: {
                            username: username
                        },
                        success: function (res) {
                            suc(res);
                        }
                    })
                })
                pro.then(function (res) {
                    if (res == 1) {
                        $(".reguname").html("用户名已存在");
                        unameFlag = false;
                    }
                });
            }
        }
    });
    uname.focus(function () {
        $(".reguname").html("");
        $(".uname_input").removeClass("input_error");
        unameFlag = true;
    })
    //密码验证
    var j = 0;
    var pwdRegArr = [/\d/, /[a-z]/, /[A-Z]/, /[^a-zA-Z0-9]\S/];
    var pwd = $(".pwd");
    var regpwd = $(".regpwd");
    var repwd = $(".repwd");
    var regrepwd = $(".regrepwd");
    var regFlag = true;
    var pwdStr = "";
    var repwdStr = "";
    pwd.blur(function () {
        var j = 0;
        pwdStr = pwd.val();
        for (var i = 0; i < pwdRegArr.length; i++) {
            if (pwdRegArr[i].test(pwdStr)) {
                j++;
            }
        }
        if (pwdStr.length < 8) {
            regpwd.html("至少包含8个字符");
            $(".pwd_input").addClass("input_error");
            regFlag = false;
        }
        else if (pwdStr.length > 20) {
            regpwd.html("最多包含20个字符");
            $(".pwd_input").addClass("input_error");
            regFlag = false;
        }
        else if (/\s/.test(pwdStr)) {
            regpwd.html("不能包含空格");
            $(".pwd_input").addClass("input_error");
            regFlag = false;
        }
        else if (j < 2) {
            regpwd.html("至少包含字母、数字、符号中的2种");
            $(".pwd_input").addClass("input_error");
            regFlag = false;
        }
        if (repwdStr && repwdStr == pwdStr) {
            $(".regrepwd").html("");
            $(".repwd_input").removeClass("input_error");
        }
        else if (repwdStr && repwdStr != pwdStr) {
            $(".regrepwd").html("密码与确认密码不一致");
            $(".repwd_input").addClass("input_error");
            regFlag = false;
        }
    })
    pwd.focus(function () {
        regFlag = true;
        $(".pwd_input").removeClass("input_error");
        regpwd.html("");
    });

    //密码与确认密码不一致
    repwd.blur(function () {
        repwdStr = repwd.val();
        if (repwdStr != pwdStr) {
            regrepwd.html("密码与确认密码不一致");
            $(".repwd_input").addClass("input_error");
            regFlag = false;
        }
    })
    repwd.focus(function () {
        regFlag = true;
        regrepwd.html("");
        $(".repwd_input").removeClass("input_error");
    })
    $(".register").click(function () {
        if (regFlag && unameFlag) {
            $.ajax({
                url: "../php/adduser.php",
                type: "post",
                data: {
                    username: username,
                    pwd: pwdStr
                },
                success: function (res) {
                    if (res == 1) {
                        alert(username + "注册成功");
                        location.href = "../index.html";
                    }
                }
            })
        }
    })
})