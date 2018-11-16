$(function () {
    var obj = {
        loginName: localStorage.getItem("loginName"),
        login_box: $(".login_box"),
        login_close: $(".login_close"),
        login_in: $(".login_in"),
        uname: $("#uname"),
        upwd: $("#upwd"),
        login_error: $(".login_error"),
        allCheckBox: $(".allCheckBox"),
        cancleCheck: $(".cancleCheck"),
        sumPrice: $(".sumPrice")
    }
    new GoMyCart(obj);
})

class GoMyCart {
    constructor(obj) {
        this.loginName = obj.loginName;
        this.login_box = obj.login_box;
        this.login_close = obj.login_close;
        this.login_in = obj.login_in;
        this.uname = obj.uname;
        this.upwd = obj.upwd;
        this.login_error = obj.login_error;
        this.signout = $(".shortcut_signout a");
        this.allCheckBox = obj.allCheckBox;
        this.cancleCheck = obj.cancleCheck;
        this.sumPrice = obj.sumPrice;
        this.isLogin();
        this.sign_in();
        this.closeLoginBox();
        this.openLoginBox();
        this.signOut();
        this.checkGoods();
    }
    isLogin() {
        if (this.loginName) {
            $(".attention").hide();
            this.haveLogin();
        }
        else {
            $(".attention").show();
            $(".emptyCart").show();
            $(".haveGoods").hide();
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
        this.userCart = localStorage.getItem(this.loginName + "cart");
        if (this.userCart) {
            $(".attention").hide();
            $(".emptyCart").hide();
            $(".haveGoods").show();
            this.showMyCartGoods()
        }
        else {
            $(".attention").hide();
            $(".emptyCart").show();
            $(".haveGoods").hide();
        }
    }
    showMyCartGoods() {
        var _this = this;
        $.ajax({
            type: "get",
            url: "../php/getGoodsInfo.php",
            success: function (res) {
                suc(res);
            }
        })
        function suc(res) {
            var goodInfo = JSON.parse(res);
            var cartInfo = JSON.parse(_this.userCart);
            $.each(cartInfo, function (i, item) {
                $.each(goodInfo, function (n, it) {
                    var color = JSON.parse(it["color"]);
                    if (item["gid"] == it["gid"]) {
                        var ul = `<ul>
                        <li class="info">${JSON.stringify(item)}</li>
                        <li>
                            <span class="checkbox itemcheckbox"></span>
                        </li>
                        <li>
                            <img src="../images/nav/${item["gid"]}/428_428_${item["color"]}.jpg" alt="">
                        </li>
                        <li>
                            <p class="goodsName">${it["gname"]}
                                <span class="goodColor">${color[item["color"]]}</span>
                            </p>
                        </li>
                        <li>
                            <span class="goodPrice">￥ ${it["gprice"]}.00</span>
                        </li>
                        <li>
                            <div class="selectCount ">
                                <input type="text " class="count " value="${item["count"]}">
                                <div class="tips ">
                                    <span class="addCount countBtn">+</span>
                                    <span class="delCount countBtn">-</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="smallPrice">￥ ${item["count"] * it["gprice"]}.00</span>
                        </li>
                        <li>
                            <span class="deleteGoods" style="cursor:pointer;">删除</span>
                        </li>
                    </ul>`
                        $(".showCartGoods").html($(".showCartGoods").html() + ul);
                    }
                })
            })
            _this.checkGoods();
            _this.addbtn = $(".addCount");
            _this.delbtn = $(".delCount");
            _this.countBtn = $(".countBtn");
            _this.deleteCheckGoodsBtn = $(".deleteCheckGoods");
            _this.deleteGoods = $(".deleteGoods");
            _this.addBtn();
            _this.delBtn();
            _this.deleteCheckGoods();
            _this.deleteItemGoods();
        }
    }

    openLoginBox() {
        $(".attention button").click(function () {
            $(".login_box").css("visibility", "visible");
        })
        var _this = this;
        this.openBtn = $(".shortcut_login a:first-child");
        this.openBtn.click(function () {
            _this.login_box.css("visibility", "visible");
        })
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
    signOut() {
        var signout = $(".shortcut_signout a");
        signout.click(function () {
            $(".shortcut_login").css("display", "block");
            $(".shortcut_uname").css("display", "none");
            $(".sumCount").html("0")
            localStorage.setItem("loginName", "");
            this.loginName = "";
            $(".attention").show();
            $(".emptyCart").show();
            $(".haveGoods").hide();
        })
    }
    checkGoods() {
        var _this = this;
        this.itemcheckbox = $(".itemcheckbox");
        this.allCheckBox.off().click(function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                _this.itemcheckbox.removeClass("selected");
                _this.cancleCheck.addClass("selected");
            }
            else {
                $(this).addClass("selected");
                _this.itemcheckbox.addClass("selected");
                _this.cancleCheck.removeClass("selected");
                _this.calculate()
            }
        })
        this.cancleCheck.off().click(function () {
            $(this).addClass("selected");
            _this.itemcheckbox.removeClass("selected");
            _this.allCheckBox.removeClass("selected");

        })
        this.itemcheckbox.click(function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                $(this).addClass("selected");
            }
            var flag = true;
            var cancleFlag = true;
            $.each(_this.itemcheckbox, function (i, item) {
                if (!$(item).hasClass("selected")) {
                    flag = false;
                }
                else {
                    cancleFlag = false;
                }
            })
            if (flag == true) {
                _this.allCheckBox.addClass("selected");
            }
            else {
                _this.allCheckBox.removeClass("selected");
            }
            if (cancleFlag) {
                _this.cancleCheck.addClass("selected");
            }
            else {
                _this.cancleCheck.removeClass("selected");
            }
        })
        $(".checkbox").click(function () {
            _this.calculate();
        })
    }
    calculate() {
        this.selected = $(".selected");
        var count = 0;
        var sumPrice = 0;
        var flag = false;
        $.each(this.selected, function (i, item) {
            if ($(item).hasClass("itemcheckbox")) {
                sumPrice += Number($(item).parent().siblings().eq(5).find("span").html().slice(1));
                count += Number($(item).parent().siblings().eq(4).find("input").val());
                $(".sumPrice").html("￥" + sumPrice);
                $(".sumCount span").html(count);
                flag = true;
            }
        })
        if (!false) {
            $(".sumPrice").html("￥" + sumPrice);
            $(".sumCount span").html(count);
        }
    }
    // this.addbtn = $(".addCount");
    // this.delbtn = $(".addCount");
    // this.countBtn = $(".countBtn");
    addBtn() {
        var _this = this;
        this.addbtn.click(function () {
            var this_ = this;
            var li = $(this).parent().parent().parent().siblings();
            var obj = JSON.parse(li.eq(0).html());
            var gid = obj["gid"];
            var color = obj["color"];
            var cartInfo = JSON.parse(localStorage.getItem(_this.loginName + "cart"));
            $.each(cartInfo, function (i, item) {
                if (item["gid"] == gid && item["color"] == color) {
                    var price = Number(li.eq(4).children().html().slice(1));
                    item["count"]++;
                    li.eq(5).children().html("￥" + item["count"] * price + ".00");
                    $(this_).parent().siblings().eq(0).val(item["count"]);
                }
            })
            localStorage.setItem(_this.loginName + "cart", JSON.stringify(cartInfo));
            _this.calculate();
        })
    }
    delBtn() {
        var _this = this;
        this.delbtn.click(function () {
            var this_ = this;
            var li = $(this).parent().parent().parent().siblings();
            var obj = JSON.parse(li.eq(0).html());
            var gid = obj["gid"];
            var color = obj["color"];
            var cartInfo = JSON.parse(localStorage.getItem(_this.loginName + "cart"));
            $.each(cartInfo, function (i, item) {
                if (item["gid"] == gid && item["color"] == color) {
                    var price = Number(li.eq(4).children().html().slice(1));
                    if (item["count"] > 1) {
                        item["count"]--;
                    }
                    li.eq(5).children().html("￥" + item["count"] * price + ".00");
                    $(this_).parent().siblings().eq(0).val(item["count"]);
                }
            })
            localStorage.setItem(_this.loginName + "cart", JSON.stringify(cartInfo));
            _this.calculate();
        })
    }
    deleteCheckGoods() {
        var _this = this;
        this.deleteCheckGoodsBtn.click(function () {
            this.selected = $(".selected");
            var cartInfo = JSON.parse(localStorage.getItem(_this.loginName + "cart"));
            $.each(this.selected, function (i, item) {
                if ($(item).hasClass("itemcheckbox")) {
                    var obj = JSON.parse(($(item).parent().siblings().eq(0).html()));
                    var gid = obj["gid"];
                    var color = obj["color"];
                    console.log(color, gid)
                    for (var i = 0; i < cartInfo.length; i++) {
                        if (cartInfo[i]["color"] == color && cartInfo[i]["gid"] == gid) {
                            cartInfo.splice(i, 1);
                            $(item).parent().parent().remove();
                            i--;
                        }
                    }
                }
            })
            //localStorage.setItem(_this.loginName + "cart", JSON.stringify(cartInfo));
            if (cartInfo.length) {
                localStorage.setItem(_this.loginName + "cart", JSON.stringify(cartInfo));
            }
            else {
                localStorage.removeItem(_this.loginName + "cart");
                _this.haveLogin();
            }
            _this.calculate();

        })
    }
    deleteItemGoods() {
        var _this = this;
        this.deleteGoods.click(function () {
            var cartInfo = JSON.parse(localStorage.getItem(_this.loginName + "cart"));
            var obj = JSON.parse(($(this).parent().siblings().eq(0).html()));
            for (var i = 0; i < cartInfo.length; i++) {
                if (cartInfo[i]["gid"] == obj["gid"] && cartInfo[i]["color"] == obj["color"]) {
                    cartInfo.splice(i, 1);
                    break;
                }
            }
            $(this).parent().parent().remove();
            if (cartInfo.length) {
                localStorage.setItem(_this.loginName + "cart", JSON.stringify(cartInfo));
            }
            else {
                localStorage.removeItem(_this.loginName + "cart");
                _this.haveLogin();
            }
            _this.calculate();
        })
    }
}