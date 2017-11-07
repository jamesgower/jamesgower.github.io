$(document).ready(function() {
    var users = ["freecodecamp", "buckarmy", "sips_", "bigbangs06", "mbonehd"];


    $("#online").click(function() {
        for(var i=0; i<users.length; i++) {
            if($("#" + users[i] + "-status").text() === "Status: Offline") {
                $("#" + users[i]).fadeOut(1000);
            } else {
                $("#" + users[i]).fadeIn(1000);
            }
        }
    });

    $("#offline").click(function() {
        for(var i=0; i<users.length; i++) {
            if($("#" + users[i] + "-status").text() === "Status: Live Now!") {
                $("#" + users[i]).fadeOut(1000);
            } else {
                $("#" + users[i]).fadeIn(1000);
            }
        }
    });

    $("#all").click(function() {
        for(var i=0; i<users.length; i++) {
            $("#" + users[i]).fadeIn(1000);
        }
    });

    $("#addStreamerBtn").click(function(){
        var streamer = $("#streamerName").val();
        if($("#streamerName").val().length <= 0) {
            $("#streamerName").css("border", "2px solid red");
        } else {
            users.push(streamer);
            $(".online").append(
                '<div class="row" id="' + streamer + '">' +
                '<div class="col-sm-3 logoContain">' +
                '<img class="logo" id="' + streamer + '-logo" src="http://www.jaimagroup.com/wp-content/uploads/2015/05/photo_unavailable2.jpg" />' +
                '<p class="name">' + streamer.substring(0,1).toUpperCase() + streamer.substring(1).toLowerCase() + '</p>' +
            '</div>' +
            '<div class="col-sm-4 status">' +
                '<span>' +
                    '<p id="' + streamer + '-status"></p>' +
                    '<span id="' + streamer + '-hide">' +
                        '<p id="' + streamer + '-game"></p>' +
                        '<p id="' + streamer + '-name"></p>' +
                        '<p id="' + streamer + '-viewers"></p>' +
                    '</span>' +
                '</span>' +
            '</div>' +
            '<div class="col-sm-5 previews">' +
                '<h4 class="previewTitle">Preview</h4>' +
                '<img id="' + streamer + '-preview" src="https://i.ytimg.com/vi/y63rUzzCZUM/maxresdefault.jpg" class="preview center-block" />' +
            '</div>' +
        '</div>'
            );

            getData(streamer);
        }
    });

    for(var i=0; i<users.length;i++) {
        getData(users[i]);
    }

        function getData(name) {
            var api = "https://wind-bow.gomix.me/twitch-api/streams/";
            var callback = "?callback=?";
            var url = api + name + callback;
            $.ajax({
                cache: false,
                url: url,
                dataType: "json",
                success: function(data) {
                    if(data.stream !== null) {
                        $("#" + name + "-logo").attr('src', data.stream.channel.logo);
                        $("#" + name + "-game").text("Game: " + data.stream.game);
                        $("#" + name + "-status").text("Status: Live Now!");
                        $("#" + name + "-name").text("Title: " + data.stream.channel.status);
                        $("#" + name + "-viewers").text("Viewers: " + data.stream.viewers);
                        $("#" + name + "-preview").attr("src", data.stream.preview.large);
                        $("#" + name).css("background-color", "#ccffcc");
                        $("#" + name).css("border", "4px solid green");
                        $("#" + name).appendTo(".online");
                    }
                    else {
                        $("#" + name + "-status").text("Status: Offline");
                        $("#" + name).css("background-color", "#ffb3b3")
                        $("#" + name).css("border", "4px solid red");
                        $("#" + name + "-hide").hide();
                        $("#" + name).appendTo(".offline");
                    }
                },
                error: function() {
                    $("#" + name + "-status").text("Error connecting to API");
                    $("#" + name + "-hide").hide();
                    return false;
                }
            });
        }


});
