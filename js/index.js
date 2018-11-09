$(function () {
    //轮播图
    var imgIndex = 0;
    var timer = setInterval(autoplay, 2000);
    $(".banner").mouseenter(function () {
        clearInterval(timer);
    });
    $(".banner").mouseleave(function () {
        timer = setInterval(autoplay, 2000);
    });
    $(".sowingMap_tip li").mouseenter(
        function () {
            imgIndex = $(this).index();
            $(".sowingMap li").eq(imgIndex).fadeIn().siblings().fadeOut();
            $(".sowingMap_tip li").eq(imgIndex).addClass("current").siblings().removeClass("current");
        }
    )
    function autoplay() {
        imgIndex++;
        if (imgIndex > $(".sowingMap li").size() - 1) {
            imgIndex = 0;
        }
        $(".sowingMap li").eq(imgIndex).fadeIn().siblings().fadeOut();
        $(".sowingMap_tip li").eq(imgIndex).addClass("current").siblings().removeClass("current");
    }
    //菜单
    $(".menu").delegate(".menuLi", "mouseenter", function () {
        $(this).css("opacity", 1);
    })
    $(".menu").delegate(".menuLi", "mouseleave", function () {
        $(this).css("opacity", 0.5);
    })

    //给menu的二级菜单的classify中添加li

})
var menuArr = [["荣耀", "HUAWEI P系列", "荣耀畅玩系列", "HUAWEI Mate系列", "HUAWEI nova系列", "HUAWEI 麦芒系列", "华为畅享系列", " 移动4G+专区"], ["平板电脑", "笔记本电脑", "笔记本配件"], ["手环", "手表", "VR"], ["路由器", "电视盒子", "照明", "清洁", "子母/分布式路由", "电力猫/wifi放大器", "随行wifi", "节能", "环境", "安防", "健康", "厨电", "影音", "卫浴", "其他"], ["移动电源", "耳机", "音箱", "自拍杆/支架", "充电器/线材", "U盘/存储卡", "摄像机/镜头", "智能硬件", "生活周边", "取卡针"], ["保护壳", "保护套", "贴膜", "盒子专属配件", "表带", "触控笔"]];

for (var i = 0; i < $(".menuLi").size(); i++) {
    for (var j = 0; j < menuArr[i].length; j++) {
        var li = `<li><a href="#">${menuArr[i][j]}</a></li>`;
        $(".menu .menuLi:nth-child(" + (i + 1) + ") .menuBox .classify").html($(".menu .menuLi:nth-child(" + (i + 1) + ") .menuBox .classify").html() + li);
    }
}
//给menu添加滑动事件
$(".menuLi").mouseenter(function () {
    $(this).children().eq(1).show();
});
$(".menuLi").mouseleave(function () {
    $(this).children().eq(1).hide();

    //公告轮播图
    var textIndex = 0;
})
