$(function () {
    //放大镜
    $(".smallImg").mouseenter(function () {
        $(".mask").show();
        $(".bigImg").show();
        var n = $(".bigImg").width() / $(".mask").width();
        $(document).bind("mousemove", function (e) {
            var l = e.pageX - $(".mask").width() / 2 - $(".smallImg").offset()["left"];
            var t = e.pageY - $(".mask").height() / 2 - $(".smallImg").offset()["top"];
            var maxLeft = $(".smallImg").width() - $(".mask").width() - 2;
            var maxTop = $(".smallImg").height() - $(".mask").height() - 2;
            l = l < 0 ? 0 : (l > maxLeft ? maxLeft : l);
            t = t < 0 ? 0 : (t > maxTop ? maxTop : t);
            $(".mask").css({ "left": l, "top": t });
            $(".bigImg img").css({ "left": -l * n, "top": -t * n });
        })
    })
    $(".smallImg").mouseleave(function () {
        $(".mask").hide();
        $(".bigImg").hide();
        $(document).unbind("mousemove");
    })
    //将对应的图片渲染到网页上
    var goodId = location.search.slice(1).split("=")[1];
    // $(".goodshow ul li img").each(function (i, item) {
    //     item.src = "../images/nav/" + goodId + "/78_78_" + (i + 1) + ".jpg ";
    // });
    // $(".smallImg img").attr("src", "../images/nav/" + goodId + "/800_800_1.jpg");
    // $(".bigImg img").attr("src", "../images/nav/" + goodId + "/800_800_1.jpg");

    // //小图换对应大图
    // $(".goodshow li").mouseenter(function () {
    //     $(this).addClass("selected").siblings().removeClass("selected");
    //     $(".smallImg img").attr("src", "../images/nav/" + goodId + "/800_800_" + ($(this).index() + 1) + ".jpg");
    //     $(".bigImg img").attr("src", "../images/nav/" + goodId + "/800_800_" + ($(this).index() + 1) + ".jpg");
    // })
    $.ajax({
        type: "get",
        data: {
            goodId: goodId
        },
        url: "../php/goodInfo.php",
        success: function (res) {
            suc(res)
        }
    })
    function suc(res) {
        var goodInfoObj = JSON.parse(res);
        var imgcount = Number(goodInfoObj["gimgcount"]);
        var imgcolor = JSON.parse(goodInfoObj["color"]);
        $("head title").html(goodInfoObj["gname"]);
        $(".goodTitle").html(goodInfoObj["gname"]);
        $(".price").html("¥" + goodInfoObj["gprice"] + ".00")
        $(".smallImg img").attr("src", "../images/nav/" + goodInfoObj["gid"] + "/800_800_1.jpg");
        $(".bigImg img").attr("src", "../images/nav/" + goodInfoObj["gid"] + "/800_800_1.jpg");
        $(".goodshow ul").css("width", imgcount * 74);
        for (var i = 0; i < imgcount; i++) {
            if (i == 0) {
                var li = `<li class="selected">
                <img src=" ../images/nav/${goodInfoObj["gid"]}/78_78_${i + 1}.jpg" alt=" ">
            </li>`
            }
            else {
                var li = `<li>
                <img src=" ../images/nav/${goodInfoObj["gid"]}/78_78_${i + 1}.jpg" alt=" ">
            </li>`
            }
            $(".goodshow ul").html($(".goodshow ul").html() + li);
        }
        $.each(imgcolor, function (i, item) {
            if (i == 0) {
                var li = `<li class="selected">
                <img src="../images/nav/${goodInfoObj["gid"]}/40_40_${i}.jpg" alt="">
                <span>${item}</span>
            </li>`
            }
            else {
                var li = `<li>
                <img src="../images/nav/${goodInfoObj["gid"]}/40_40_${i}.jpg" alt="">
                <span>${item}</span>
            </li>`
            }
            $(".selectColor ul").html($(".selectColor ul").html() + li);
        })
        //小图换对应大图
        $(".goodshow li").mouseenter(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            $(".smallImg img").attr("src", "../images/nav/" + goodInfoObj["gid"] + "/800_800_" + ($(this).index() + 1) + ".jpg");
            $(".bigImg img").attr("src", "../images/nav/" + goodInfoObj["gid"] + "/800_800_" + ($(this).index() + 1) + ".jpg");
        })
        $(".selectColor ul li").click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
        })
        sendGood(goodInfoObj);
    }
    var goodInfoObj = null;
    function sendGood(x) {
        goodInfoObj = x;
        console.log(goodInfoObj)
    }
    //小图ul轮播
    $(".goodxiangzuo").click(function () {
        var ulleft = parseInt($(".goodshow ul").css("left")) + 74;
        if (ulleft > 0) {
            ulleft = 0;
        }
        $(".goodshow ul").animate({ "left": ulleft });
    })
    $(".goodxiangyou").click(function () {
        var ulleft = parseInt($(".goodshow ul").css("left")) - 74;
        if (ulleft < -$(".goodshow ul").width() + $(".goodshow").width()) {
            ulleft = -$(".goodshow ul").width() + $(".goodshow").width();
        }
        $(".goodshow ul").animate({ "left": ulleft });
    })
    //赠减商品
    $(".addCount").click(function () {
        var count = Number($(".count").val());
        count++
        $(".count").val(count);

    })
    $(".delCount").click(function () {
        var count = Number($(".count").val());
        count--
        if (count < 1) {
            count = 1;
        }
        $(".count").val(count);
    })
    //加入购物车
    $(".addCartBtn").click(function () {
        var loginName = localStorage.getItem("loginName");
        if (!loginName) {
            $(".login_box").css("visibility", "visible");
        }
        else {
            var userCart = localStorage.getItem(loginName + "cart");
            if (!userCart) {
                localStorage.setItem(loginName + "cart", '[{"gid":"' + goodInfoObj["gid"] + '","count":' + Number($(".count").val()) + ',"color":' + $(".selectColor ul .selected").index() + '}]');
                getCount(loginName);
            }
            else {
                var userCartJson = JSON.parse(userCart);
                var flag = false;
                $.each(userCartJson, function (i, item) {
                    if (item["gid"] == goodInfoObj["gid"] && item["color"] == $(".selectColor ul .selected").index()) {
                        item["count"] += Number($(".count").val());
                        flag = true;
                    }
                })
                if (!flag) {
                    userCartJson.push({ "gid": goodInfoObj["gid"], "count": Number($(".count").val()), "color": + $(".selectColor ul .selected").index() });
                }
                localStorage.setItem(loginName + "cart", JSON.stringify(userCartJson));
                getCount(loginName);
            }
        }
    })

    function getCount(name) {
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
})