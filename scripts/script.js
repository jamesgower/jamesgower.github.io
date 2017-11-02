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

    // Calculator Script //
    var answerGiven = false;
    var sumToComplete = false;
    $(".calcBtn").click(function() {
        var val = $(this).val();

        if(val === '+' || val === '-' || val === '/' || val === '*') {
            $("#sums").append($("#outcome").text() + val);
            $("#outcome").text(val);
            sumToComplete = true;
        }
        else if(val === "ce"){
            var cancel = $("#outcome").text().slice(0,-1);
            $("#outcome").text(cancel);
        }

        else if(val === "ac") {
            $("#outcome").text("");
            $("#sums").text("");
            calc.removeAll();
        }

        else if(val === "=") {
            $("#sums").append($("#outcome").text());
            var equation = $("#sums").text();
            var answer = math.eval(equation);
            $("#outcome").text(answer);
            answerGiven = true;
        }
        else {
            if(answerGiven) {
                $("#outcome").text("");
                $("#sums").text("");
                answerGiven = false;
                $("#outcome").append(val);
            }
            else if(sumToComplete) {
                sumToComplete = false;
                $("#outcome").text("");
                $("#outcome").append(val);
            }

            else {
                $("#outcome").append(val);
            }
        }
    });
});
