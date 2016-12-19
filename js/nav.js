$(document).ready(function(){
    $(document).off('click.bs.dropdown.data-api');
    /**
     * 给菜单绑定下拉事件
     * 如果屏幕大于768时才绑定
     * 当屏幕尺寸发生改变的时候，一旦小于768，则解绑事件，一旦大于768则恢复。
     */
    if($(window).width() > 768){
        dropdownOpen();//调用
    }else{
        dropdownHover();
    }
    $(window).resize(function(){
        if($(window).width() < 768){
            $('li.dropdown').unbind();
            $('li.dropdown').bind('mouseover',dropdownHover());
        }else{
            $('li.dropdown').unbind();
            $('li.dropdown').bind('mouseover',dropdownOpen());
        }
    });
});
/**
 * 鼠标划过就展开子菜单，免得需要点击才能展开
 *
 */
function dropdownOpen() {

    var $dropdownLi = $('li.dropdown');

    $dropdownLi.mouseover(function() {
        $(this).addClass('open');
    }).mouseout(function() {
        $(this).removeClass('open');
    });
}
/**
 * 模仿上方添加open后的hover效果
 *
 */
function dropdownHover() {

    var $dropdownLi = $('li.dropdown');

    $dropdownLi.mouseover(function() {
        $dropdownLi.removeClass('open');
        $(this).addClass('hover');
    }).mouseout(function() {
        $(this).removeClass('hover');
    });
}

/**
 * 手动设置菜单来当前高亮
 * yMenuIndex下移出li的yMenua class
 * 分析url给指定li添加class yMenu
 * 本地：henghuikx/ local.html 同城配送 tuan.html 同城团购 chinafeature.html 特色中国 instalment.html 恒会分期 hbbuy.html 会饼换购
 * 外网：mall.henghuinet.com/ CityDist 同城快购 Tuan 同城团购 ChinaFeature 特色中国 Instalment 恒会分期 HbProduct 会饼兑换
 */

$(function(){
    var subName = window.location.href.split("XinHaoGangJieGou/")[1];
    var $NavItem =  $(".nav.navbar-nav").find("li");
    switch (subName){
        case "about.html?id=introduce":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("公司简介") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "about.html?id=honor":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("资质荣誉") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "news.html":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("最新资讯") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "product.html":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("产品展示") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "job.html":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("人才招聘") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "about.html?id=messages":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("请您留言") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "about.html?id=contact":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("联系方式") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        default:
            //alert(subName);
            return;
    }
});