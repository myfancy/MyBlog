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
 * 保持菜单当前高亮：
 * 手动设置菜单来当前高亮
 * 需要两个参数：菜单项的选择器（class或id等），保持高亮用的class（css中定义的）
 * //程序逻辑：
 * //遍历导航菜单的DOM，得到navConfig = {URL:NAME,URL:NAME}对象
 * //得到当前window.herf,判断它对应的菜单，移除所有高亮后，对其添加高亮
 *
 *
 * 此网站逻辑：
 * 找到.nav.navbar-nav，遍历得到{url:name}对象，判断当前url
 *
 * 设置高亮办法：
 * 找到对应dom，移除所有的菜单项的高亮class，给当前添加高亮
 *
 * 判断当前页面属于哪个版块办法：
 * 得到当前浏览器URL，
 * 指定当前导航菜单DOM的Class或ID，
 * 遍历它：当前对象的href如果和当前浏览器url相同，即设为高亮
 *
 * 实际困难:url可能会带很多参数，这样不可能和菜单里的保持一致。
 * 一般网址都是这样的
 * http：//www.aaaa.com/xxxx.html[/?id=yyyy]
 * http://localhost:8090/MyBlog/about.html[/?id=yyyy]
 * http://www.aaa.com/xxxx/yyyy/zzzz
 * 而导航链接通常是这样的：
 * [/]xxxx.html[?id=yyyy]
 * [/]xxxx.html#!yyyy
 * [/]xxxx/yyyy
 * 他们之间有什么关联呢？
 * 需要这样想，排除二次跳转的可能性。
 * 在导航链接写的都是相对路径的情况下，当前菜单的href总是包含在当前浏览器url中的。
 * （如果导航里链接写的绝对路径（几乎不可能）或者某种特殊原因，不包含在当前浏览器url中，那么就需要手动split一下得到包含的部分，这里先不考虑这种情况了）
 *
 *
 */

$(function(){
    var window_href = window.location.href;
    $(".nav.navbar-nav").find("li").removeClass("active")
            .each(function () {
                var href = $(this).find("a").attr("href");
                //alert(href)
                if (window_href.indexOf(href) !== -1) {
                    $(this).addClass("active");
                }
            });

    //下面的方法不用了  ---但是也不是没有意义，至少锻炼了编码能力不是吗？
    //主要问题出在思维逻辑上，没有把问题简单化
    //var subName = window.location.href.split("MyBlog/")[1]||window.location.href.split("github.io/")[1];
    //if(subName===undefined) console.error("subName未定义！");
    //var $NavItem =  $(".nav.navbar-nav").find("li");

    //定义导航菜单链接和名字信息--------如果改为自动读取对应html文件中的内容就更好了 --下面已经改好了
    //var navConfig = {
    //    "about.html?id=introduce":"个人简介",
    //    "about.html?id=honor":"我的相册",
    //    "about.html?id=messages":"留言板",
    //    "about.html?id=contact":"联系方式",
    //    "news.html":"最新文章",
    //    "product.html":"参与项目",
    //    "job.html":"工作经历"
    //};

    //var navConfig = {};
    //$NavItem.find("a").each(function(i,el){
    //    //alert(el.href+":"+el.innerHTML);
    //    var href = el.href.split("MyBlog/")[1]||el.href.split("github.io/")[1];
    //    navConfig[href] = el.innerHTML;
    //});
    //alert(JSON.stringify(navConfig));

    //if(navConfig[subName]) {
    //    $NavItem.removeClass("active")
    //        .each(function () {
    //            if ($(this).find("a").html().indexOf(navConfig[subName]) !== -1) {
    //                $(this).addClass("active");
    //            }
    //        });
    //}
    //进阶优化：这种是swtich太占代码行数了，相同的代码出现了这么遍，所以将数据用json提取出来。---看上面
    //switch (subName){
    //    case "about.html?id=introduce":
    //        $NavItem.removeClass("active")
    //            .each(function(){
    //                if($(this).find("a").html().indexOf("个人简介") !== -1){
    //                    $(this).addClass("active");
    //                }
    //            });
    //        return;
    //    case "about.html?id=honor":
    //        $NavItem.removeClass("active")
    //            .each(function(){
    //                if($(this).find("a").html().indexOf("我的相册") !== -1){
    //                    $(this).addClass("active");
    //                }
    //            });
    //        return;
    //    case "about.html?id=messages":
    //        $NavItem.removeClass("active")
    //            .each(function(){
    //                if($(this).find("a").html().indexOf("留言板") !== -1){
    //                    $(this).addClass("active");
    //                }
    //            });
    //        return;
    //    case "about.html?id=contact":
    //        $NavItem.removeClass("active")
    //            .each(function(){
    //                if($(this).find("a").html().indexOf("联系方式") !== -1){
    //                    $(this).addClass("active");
    //                }
    //            });
    //        return;
    //    case "news.html":
    //        $NavItem.removeClass("active")
    //            .each(function(){
    //                if($(this).find("a").html().indexOf("最新文章") !== -1){
    //                    $(this).addClass("active");
    //                }
    //            });
    //        return;
    //    case "product.html":
    //        $NavItem.removeClass("active")
    //            .each(function(){
    //                if($(this).find("a").html().indexOf("参与项目") !== -1){
    //                    $(this).addClass("active");
    //                }
    //            });
    //        return;
    //    case "job.html":
    //        $NavItem.removeClass("active")
    //            .each(function(){
    //                if($(this).find("a").html().indexOf("工作经历") !== -1){
    //                    $(this).addClass("active");
    //                }
    //            });
    //        return;
    //    default:
    //        //console.log(subName);
    //        return;
    //}
});