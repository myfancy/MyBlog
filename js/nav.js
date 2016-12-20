/**
 * 菜单相关事项，响应式代码
 */
$(function(){
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
 */

$(function(){
    var subName = window.location.href.split("MyBlog/")[1]||window.location.href.split("github.io/")[1];
    if(subName===undefined) console.error("subName未定义！");
    var $NavItem =  $(".nav.navbar-nav").find("li");
    switch (subName){
        case "about.html?id=introduce":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("个人简介") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "about.html?id=honor":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("我的相册") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "about.html?id=messages":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("留言板") !== -1){
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
        case "news.html":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("最新文章") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "product.html":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("参与项目") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        case "job.html":
            $NavItem.removeClass("active")
                .each(function(){
                    if($(this).find("a").html().indexOf("工作经历") !== -1){
                        $(this).addClass("active");
                    }
                });
            return;
        default:
            //console.log(subName);
            return;
    }
});