 $(document).ready(function() {
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
