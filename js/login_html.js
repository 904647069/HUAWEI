$(function () {
    var obj = {
        login_in: $(".login_in"),
        uname: $("#uname"),
        upwd: $("#upwd"),
        login_error: $(".login_error"),
    }
    new Login(obj)
})
class Login {
    constructor(obj) {
        this.login_in = obj.login_in;
        this.uname = obj.uname;
        this.upwd = obj.upwd;
        this.login_error = obj.login_error;
        this.sign_in();
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
                        url: "../php/login.php",
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
            }
        })
    }
    loginIsOk(pro) {
        var _this = this;
        pro.then(function (res) {
            if (res == 1) {
                alert("登录成功");
                localStorage.setItem("loginName", _this.username);
                location.href = "../index.html";

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
}