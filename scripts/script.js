$(document).ready(function () {
    $("#nav-bar-popup").hide();
    $("#calcModal").data("bs.modal")
    
    //Pop-up Fixed Nav-bar script to appear on scrolling past homepage
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        var topOfDiv = $(".seperator").offset().top-40;
        if (y > topOfDiv) {
            $("#nav-bar-popup").fadeIn(1000);
        }
        else {
            $("#nav-bar-popup").fadeOut(1000);
        }
    });
    
    //Nav-bar Scroll to functions
    $("#arrow").click(function() {
        $("html, body").animate({
            scrollTop: $("#skillsTop").offset().top
        }, 2000);
    });
    
    $(".home").click(function() {
        $("html, body").animate({
            scrollTop: $("#homepage").offset().top
        }, 2000);
    });

    $(".skills").click(function(e){
        $("html, body").animate({
            scrollTop: $("#skillsTop").offset().top
        }, 2000);
    });
    
    $(".whatIDo").click(function() {
        $("html, body").animate({
            scrollTop: $("#whatIDoTop").offset().top
        }, 2000);
    });
    
    $(".portfolio").click(function(){
        $("html, body").animate({
            scrollTop: $("#portfolioTop").offset().top
        }, 2000);
    });

    $(".contactMe").click(function() {
        $("html, body").animate({
            scrollTop: $("#contactTop").offset().top
        }, 2000);
    });
});
