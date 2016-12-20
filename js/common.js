/**
 * 更简单的写法
 * 只判断ie文档模式
 */
(function(){
    if(document.documentMode){
        ieversion = "ie"+document.documentMode;
        document.getElementsByTagName("html")[0].className = ieversion;
    }else {
        document.getElementsByTagName("html")[0].className = "w3c";
    }
})();


/**
 * Javascript to enable link to tab
 * 1、检测URL，实现通过URL传参（?id=item1）或（?id=item1#item2?nojump），自动打开指定标签页
 * 2、切换标签页后，修改页面hash(#id?nojump)，实现刷新页面仍留在原标签页上
 * 3、点击tab或页面加载完毕时，确保副标题的文字内容和打开的tab标签名字一致
 * 4、隐藏显示地图
 *
 */
/*
 说明1：检测页面URL，得到三种结果
 1）http://www.xxxx.com/about.html
 2）http://www.xxxx.com/about.html?id=item3
//------------------------------已弃用，换成通常大家用的#! 3）http://www.xxxx.com/about.html[?id=item3]#item5?nojump   ([]代表可选)
 3）http://www.xxxx.com/about.html[?id=tab1]#!tab2   ([]代表可选)

 第一种结果，是页面默认情况，自动打开第一个选项卡，不用处理，并且在正式开发中，菜单栏的链接不会这么写的
 第二种结果，是菜单栏的链接的格式。之所以不直接用#!tab1，是因为这样页面不会刷新。
    但因为菜单栏也没有关联下面的tab点击事件，所以会出现第一次点击这种链接是如个人简介（……#!introduce）时，页面刷新打开；然后再次点击，如资质荣誉(……#!introduce#!honor)时,页面会没有反应。故这里采用了(?id=)的方式传参，保证页面会刷新。
 第三种结果，是点击tab标签后修改hash用来保存标签打开情况产生的值，使用#!是为了不触发锚点跳转事件。（原理：随便加个后缀，使浏览器找不到指定id就不跳转了）。之所以修改hash不修改href，是因为一旦修改href则页面必刷新。
 得到这三种结果后，1)无需处理，2)3)两种情况，如果有#!,说明在做了切换标签的操作，就以它为准，若无，以?id=为准。然后通过js的一个方法截取字符串，根据得到的值打开指定的标签。

 说明2：传参
 1）?id= 菜单栏的连接是通过后台传的值，无需处理。
 2）#!tab2 需要编写js事件，在点击tab的时候修改页面hash

 说明3：修改副标题
 页面加载完毕时和点击tab时，都要修改。

 说明4、打开地图
 百度地图和bootstrap有冲突，直接放到tab content中会导致地图指定地点不居中。同时还会有一些样式上的错位（已在css中修正）
 解决办法：把地图放到tab的下面，默认隐藏，页面刷新或点击tab时，检测到打开的是【联系方式】即显示。
 隐藏方式选择了{visibility:hidden;margin-bottom:-450px}是因为使用{display:none}也会导致和上面一样的指定地点不居中的问题
 */

$(document).ready(function(){
    //得到页面url
    var url = document.location.toString();
    var xhtab = $("#xhTab");
    var newTabObj;

    //url可能是 ?id=tab1 或 [?id=tab1]#!tab2
    //当有 #! 存在时，以 #!tab2 为准，打开指定标签。
    //当无 #! 但有 ?id= 时，以 ?id=tab1 为准，打开指定标签。（若两者都无，无需做任何处理，默认打开第一个标签）

    //用到了indexOf()和split()[]方法，忘记使用方法请自行百度
    //如果有#！，以#!后面为准，打开tab，否则以?id=后面为准打开
    if (url.indexOf("#!")!== -1) {
        newTabObj = xhtab.find('a[href="'+'#'+url.split('#!')[1]+'"]').tab('show');
    }else if (url.indexOf("?id=")!== -1) {
        newTabObj = xhtab.find('a[href="'+'#'+url.split('?id=')[1]+'"]').tab('show');
    }

    //修改副标题为新打开标签的标题
    if(newTabObj){
        $(".public-item-header h1").html(newTabObj.html());
    }
    //若当前标签是“联系方式”则显示地图
    if(newTabObj&&newTabObj.html()=="联系方式"){
        $("#dituContent").css("visibility","visible").css("margin-bottom","50px");
    }

    //标签页的钩子函数
    xhtab.find('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        // 修改页面hash，以便刷新页面仍保留在当前标签页
        //window.location.hash = e.target.hash+"?nojump";
        //采用 #!方式
        var href = window.location.href;
        href = href.indexOf("#!")?href.split("#!")[0]:href;
        window.location.href =  href+"#!"+e.target.hash.split("#")[1];
        // 获取已激活的标签页的名称
        var activeTab = $(e.target).text();
        // 修改副标题为新激活标签的标题
        $(".public-item-header h1").html(activeTab);
        // 若当前标签是“联系方式”则显示地图，否则隐藏
        if(activeTab=="联系方式"){
            $("#dituContent").css("visibility","visible").css("margin-bottom","50px");
        }else {
            $("#dituContent").css("visibility","hidden").css("margin-bottom","-450px");
        }
    });
});

/**
 * 添加动画 animate.css
 */
(function($){
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
})(jQuery);


