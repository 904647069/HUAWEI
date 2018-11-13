$(function () {
    //友情链接轮播
    var linkIndex = 0;
    $(".service_button_left").click(function () {
        linkIndex--;
        if (linkIndex <= 0) {
            linkIndex = 0;
            $(this).css("background", "#ccc");
        }
        else {
            $(this).css("background", "#b3b3b3");
        }
        $(".service_button_right").css("background", "#b3b3b3");
        $(".service_box").stop().animate({ left: -linkIndex * $(".service_link_box").width() })
    })
    $(".service_button_right").click(function () {
        linkIndex++;
        if (linkIndex >= $(".service_box").children().size() - 1) {
            linkIndex = $(".service_box").children().size() - 1;
            $(this).css("background", "#ccc");
        }
        else {
            $(this).css("background", "#b3b3b3");
        }
        $(".service_button_left").css("background", "#b3b3b3");
        $(".service_box").stop().animate({ left: -linkIndex * $(".service_link_box").width() })
    })
})