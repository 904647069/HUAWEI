$(function () {
    var obj = {
        login_box: $(".login_box"),
        login_close: $(".login_close"),
        login_in: $(".login_in"),
        uname: $("#uname"),
        upwd: $("#upwd"),
        login_error: $(".login_error"),
        loginName: localStorage.getItem("loginName")
    }
    new Login(obj)
})
// function haveLogin() {
//     $("login_box").css("visibility", "hidden");
//     $(".shortcut_login").css("display", "none");
//     $(".shortcut_uname").css("display", "block");
//     $(".shortcut_uname_span").html(localStorage.getItem("loginName"));
//     $(".shortcut_uname").mouseenter(function () {
//         $(".shortcut_signout").show();
//     });
//     $(".shortcut_uname").mouseleave(function () {
//         $(".shortcut_signout").hide();
//     });
// }
class Login {
    constructor(obj) {
        this.login_box = obj.login_box;
        this.login_close = obj.login_close;
        this.login_in = obj.login_in;
        this.uname = obj.uname;
        this.upwd = obj.upwd;
        this.login_error = obj.login_error;
        this.signout = $(".shortcut_signout a");
        this.loginName = obj.loginName;
        this.isLogin();
        this.sign_in();
        this.closeLoginBox();
        this.openLoginBox();
        this.signOut();
    }
    isLogin() {
        if (this.loginName) {
            this.haveLogin();
        }
    }
    haveLogin() {
        this.login_box.css("visibility", "hidden");
        $(".shortcut_login").css("display", "none");
        $(".shortcut_uname").css("display", "block");
        $(".shortcut_uname_span").html(this.loginName);
        $(".shortcut_uname").mouseover(function () {
            $(".shortcut_signout").show();
        })
        $(".shortcut_uname").mouseleave(function () {
            $(".shortcut_signout").hide();
        })
        this.getCount(this.loginName)
    }
    sign_in() {
        var _this = this;
        this.login_in.click(function () {
            _this.username = _this.uname.val();
            _this.pwd = _this.upwd.val();
            if (!_this.username || !_this.pwd) {
                _this.login_error.css("display", "block");
            }
            else {
                var pro = new Promise(function (suc, fail) {
                    $.ajax({
                        type: "POST",
                        url: $("#url").html(),
                        data: {
                            username: _this.username,
                            pwd: _this.pwd
                        },
                        success: function (res) {
                            // console.log(res);
                            suc(res);
                        }
                    })
                })
                _this.loginIsOk(pro);
            }
        })
    }
    loginIsOk(pro) {
        var _this = this;
        pro.then(function (res) {
            if (res == 1) {
                alert("登录成功");
                _this.loginName = _this.username;
                localStorage.setItem("loginName", _this.username);
                _this.haveLogin();
                _this.upwd.val("");

            }
            else if (res == -1) {
                _this.login_error.css("display", "block");
                $(".errorInfo").html("用户名不存在");
                console.log(1)
            }
            else {
                _this.login_error.css("display", "block");
                $(".errorInfo").html("帐号或密码错误，请重新输入。");
            }
        });
        this.uname.focus(function () {
            _this.login_error.css("display", "none");
        });
        this.upwd.focus(function () {
            _this.login_error.css("display", "none");
        });
    }
    closeLoginBox() {
        var _this = this;
        this.closeBtn = $(".login_close");
        this.closeBtn.click(function () {
            _this.login_box.css("visibility", "hidden");
        })
    }
    openLoginBox() {
        var _this = this;
        this.openBtn = $(".shortcut_login a:first-child");
        this.openBtn.click(function () {
            _this.login_box.css("visibility", "visible");
        })
    }
    signOut() {
        var signout = $(".shortcut_signout a")
        signout.click(function () {
            $(".shortcut_login").css("display", "block");
            $(".shortcut_uname").css("display", "none");
            $(".sumCount").html("0")
            localStorage.setItem("loginName", "");
            this.loginName = "";
        })
    }
    getCount(name) {
        var userCart = localStorage.getItem(name + "cart");
        if (userCart) {
            var userCartJson = JSON.parse(userCart)
            var sumCount = 0;
            $.each(userCartJson, function (i, item) {
                sumCount += item["count"];
            })
            $(".sumCount").html(sumCount);
        }
    }
}