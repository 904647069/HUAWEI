$(function () {
    var obj = {
        login_box: $(".login_box"),
        login_close: $(".login_close"),
        login_in: $(".login_in"),
        uname: $("#uname"),
        upwd: $("#upwd"),
        login_error: $(".login_error"),
    }
    new Login(obj)
})
class Login {
    constructor(obj) {
        this.login_box = obj.login_box;
        this.login_close = obj.login_close;
        this.login_in = obj.login_in;
        this.uname = obj.uname;
        this.upwd = obj.upwd;
        this.login_error = obj.login_error;
        this.signout = $(".shortcut_signout a")
        this.sign_in();
        this.closeLoginBox();
        this.openLoginBox();
        this.signOut()
        this.isLogin = false;
    }
    sign_in() {
        var _this = this;
        this.login_in.click(function () {
            _this.username = _this.uname.val();
            _this.pwd = _this.upwd.val();
            var pro = new Promise(function (suc, fail) {
                $.ajax({
                    type: "GET",
                    url: "php/login.php",
                    data: {
                        username: _this.username,
                        pwd: _this.pwd
                    },
                    success: function (res) {
                        suc(res);
                    }
                })
            })
            _this.loginIsOk(pro);
        })
    }
    loginIsOk(pro) {
        var _this = this;
        pro.then(function (res) {
            if (res == 1) {
                alert("登录成功");
                _this.login_box.css("visibility", "hidden");
                $(".shortcut_login").css("display", "none");
                $(".shortcut_uname").css("display", "block");
                $(".shortcut_uname_span").html(_this.username);
                $(".shortcut_uname").mouseenter(function () {
                    $(".shortcut_signout").show();
                });
                $(".shortcut_uname").mouseleave(function () {
                    $(".shortcut_signout").hide();
                });
                _this.upwd.val("");
                _this.isLogin = true;

            }
            else {
                _this.login_error.css("display", "block");
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
        var _this = this;
        this.signout.click(function () {
            $(".shortcut_login").css("display", "block");
            $(".shortcut_uname").css("display", "none");
            _this.isLogin = false;
        })
    }
}