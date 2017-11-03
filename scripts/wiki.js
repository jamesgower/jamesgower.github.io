$(document).ready(function() {
	$("#searchinput").hide();
	$("#searchBtn").click(function() {
		$("#searchBtn").hide();
		$("#searchclear").fadeIn(1000);
		$("#searchinput").show();
		$("#searchinput").animate({
			marginLeft: "0%",
			width: "100%"
		});
	});
	$("#searchinput").keyup(function() {
		$("#searchclear").toggle(Boolean($(this).val()));
	});
	$("#searchclear").toggle(Boolean($("#searchinput").val()));
	$("#searchclear").click(function() {
		$("#searchinput")
			.val("")
			.focus();
		$(this).hide();
		$("#searchinput").animate({
			marginLeft: "45%",
			width: "0px"
		});
		$("#searchBtn")
			.delay(100)
			.fadeIn(800);
	});


	$(".article").hide();

	$("#searchinput").keypress(function(e) {
		var inputStr = document.getElementById("searchinput").value;

		if (e.which == 13) {
			$(".contain").animate(
				{
					marginTop: "10px",
					height: "140px"
				},
				1000
			),
			$("#searchTxt").remove();

			var url =
				"https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" +
				inputStr +
				"&srlimit=10";

			$.ajax({
				url: url,
				dataType: "jsonp",
				success: function(data) {
					if(data.query.searchinfo.totalhits === 0) {
						$("#article0").append(
					'<p id="titleWiki">No such match</p><p id="extract">Sorry, there are no matches to display</p>'
				);
				$("#article0").fadeIn(2000);
					}
					for (var i = 0; i < 10; i++) {
						getInfo(data.query.search[i].pageid, i);
					}
				}
			});
		}
	});


	function getInfo(pageId, i) {
		var url =
			"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exsentences=4&pageids=" +
			pageId;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: function(data) {
				var pageid = Object.keys(data.query.pages)[0];
				var title = data.query.pages[pageid].title;
				var extract = data.query.pages[pageid].extract;
				$("#article" + i).empty();
				$("#article" + i).hide();
				$("#article" + i).append(
					'<p class="titleWiki">' + title + '</p><p id="extract">' + extract + "</p>"
				);
				$("#article" + i).fadeIn(2000);
				$("#article" + i).append(
					'<a target="_blank" href="https://en.wikipedia.org/wiki/' +
						titleWiki.replaceAll(" ", "%20") +
						'"></a>'
				);
				$("#article" + i).click(function() {
					if ($(this).find("a").length) {
						window.location.href = $(this)
							.find("a:first")
							.attr("href")
					}
				});
			}
		});
	}
});

String.prototype.replaceAll = function(search, replace) {
	if (replace === undefined) {
		return this.toString();
	}
	return this.split(search).join(replace);
};
