$(function () {
    $.getJSON("js/jptj.json", function (date) {
        $.each(date, function (i, item) {
            if (item.class) {
                var li = `<li>
                <a href="#">
                    <img src="images/jptj/jptj${i + 1}.png" alt="">
                    <div class="good_title">${item.title}</div>
                    <p class="good_desc">${item.desc}</p>
                    <p class="good_price">￥${item.price}</p>
                    <img src="images/${item.class}.png" alt="" class="tips">
                </a>
            </li>`
            }
            else {
                var li = `<li>
                <a href="#">
                    <img src="images/jptj/jptj${i + 1}.png" alt="">
                    <div class="good_title">${item.title}</div>
                    <p class="good_desc">${item.desc}</p>
                    <p class="good_price">￥${item.price}</p>
                </a>
            </li>`
            }
            $(".jingPinTuiJian div ul").html($(".jingPinTuiJian div ul").html() + li);
        })
    })
    var ulLeft = 0;
    $(".tip_right").click(function () {
        ulLeft -= 1200;
        if (ulLeft < -$(".jingPinTuiJian div ul").width() + 1200) {
            ulLeft = -$(".jingPinTuiJian div ul").width() + 1200;
        }
        $(".jingPinTuiJian div ul").animate({ left: ulLeft })
    })
    $(".tip_left").click(function () {
        if (ulLeft == -$(".jingPinTuiJian div ul").width() + 1200) {
            ulLeft = ulLeft + $(".jingPinTuiJian div ul").width() % 1200;
        }
        else {
            ulLeft += 1200;
            if (ulLeft > 0) {
                ulLeft = 0;
            }
        }


        $(".jingPinTuiJian div ul").animate({ left: ulLeft });
    })

})