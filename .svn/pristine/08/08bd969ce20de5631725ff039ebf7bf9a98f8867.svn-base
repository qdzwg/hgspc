$(function () {
    $(".picScroll").slide({ mainCell:".picList", effect:"left",autoPlay:false,vis:4, pnLoop:true, scroll:1, autoPage:true});

    $('.countdown').each(function(){
        var $t = $(this);
        var date = $t.data('countdown');
        // var date = Date.parse(new Date(dates));
        $(this).countdown({
            date:date,
            template: '%d天 %h时 %i分 %s秒',
            onComplete:function(){
                $t.parent().parent().attr('href','javascript:;');
            }
        });
    });
    //首页搜索
    $('.hss-btn').click(function () {
        var indexModel = $(this).data('type');
        var searchName = $(this).parent().siblings().find('input').val();
        window.location.href = '/list/'+indexModel+'?searchName='+searchName;
    });
    $('.hot-tj a').click(function () {
        var indexModel = $(this).parent().parent().data('type');
        var labelId = $(this).data('labelid');
        window.location.href = '/list/'+indexModel+'?labelId='+labelId;
    });
    $('.hotScience a').click(function () {
        var searchName = $(this).text();
        window.location.href = '/list/ticket?searchName='+searchName;
    });
    //首页左侧悬浮
    if($(".stairslist").length>0){
        $(".stairslist").find("a").click(function(){
            //$(".stairslist li").removeClass("current");
            //$(this).parent().addClass("current");
            $("html, body").animate({
                scrollTop: ($($(this).attr("href")).offset().top-50) + "px"
            }, {
                duration: 500,
                easing: "swing"
            });
            return false;
        });

        var obj = document.getElementById("stairslist"),eq=0;
        var top = getTop(obj);
        var isIE6 = /msie 6/i.test(navigator.userAgent);
        var navTar = $(".stairslist");
        window.onscroll = function(){
            var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (bodyScrollTop > top){
                obj.style.position = (isIE6) ? "absolute" : "fixed";
                obj.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
            } else {
                obj.style.position = "static";
            }
            navTar.find("li").removeClass("current");
            $(".detail-moudle").each(function(i){
                var scrolltop=$(this).offset().top;
                if( scrolltop-bodyScrollTop+$(this).height()-50>0){ //当前元素离body顶部的高-被滚动条卷去的高
                    eq=i;
                    return false;
                }
            });
            navTar.find("li:eq("+eq+")").addClass("current");
        };
    }
});