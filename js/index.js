$(document).ready(function() {

	function inputReset() {
		// reset input form
				$(".keyword").val('').blur();
				$(".load").remove();

	}

	function errorMessage() {
		// error, something went wrong
					$(".keyword").val("").blur();
					$(".row").empty();
					$(".row").append(
						'<div class="error">Something went wrong. Please try again or refresh!</div>'
					);
	}

	// GET INPUT WHEN ENTER IS PRESSED
	$(".keyword").keyup(function(event) {
		if (event.keyCode == 13) {
			var keyword = $(".keyword").val();
			$(".row").html(
				'<div class="load"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>'
			);

			// AJAX CALL
			$.ajax({
				url: "https://en.wikipedia.org/w/api.php",
				data: {
					action: "query",
					list: "search",
					srsearch: keyword,
					format: "json",
					srlimit: "12"
				},
				dataType: "jsonp",
				success: function(data) {

					inputReset();

					// if there are no results
					if (data.query.searchinfo.totalhits === 0) {
						$(".header").css("padding-top", "200px");
						$(".row").append(
							'<div class="error">We could not find any articles about ' +
								'<span class="no-result">' +
								keyword +
								'</span>' +
								'... Please try again!'
						);
					}
					// if the search yielded results
					else {
						for (var i = 0; i <= 12; i++) {
							// STORE DATA
							var articleTitle = data.query.search[i].title;
							var summary = data.query.search[i].snippet;
							var url =
								"https://en.wikipedia.org/?curid=" + data.query.search[i].pageid;
							// PUT RESULTS IN DOM
							$(".header").css("padding-top", "50px");
							$(".row").append(
								'<div class="col-md-12"><div class="content"><h2 class="title titleSearch"><a href="' +
									url +
									'">' +
									articleTitle +
									"</a>" +
									"</h2>" +
									'<p class="summary">' +
									summary +
									'<a href="' +
									url +
									'" class="more"> (...)</a></p></div></div>'
							);
						}
					}
				}, error: function() {
					errorMessage();
				}
			});
		}
	});

	// RANDOM ARTICLES
	$(".random").click(function() {
		$(".row").append(
				'<div class="load"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>'
			);
		inputReset();


		// AJAX CALL
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php",
			data: {
				action: "query",
				list: "random",
				rnnamespace: "0",
				format: "json",
				rnlimit: "3"
			},
			dataType: "jsonp",
			success: function(data) {
				$('.row').empty();
		$('.row').append(
						'<div class="info">Here are three exciting reads we picked for you!</br></div>'
					);

				for (var i = 0; i <= 3; i++) {
					// STORE DATA
					var articleTitle = data.query.random[i].title;
					var url = "https://en.wikipedia.org/?curid=" + data.query.random[i].id;

					// INPUT IN DOM
					$(".header").css("padding-top", "200px");
					$(".info").append(
						'<span class="randomArticles"><a href="' +
							url +
							'"> ' +
							articleTitle +
							' </a></span>'
					);
				}
			},
			error: function() {
				errorMessage();
			}
		});
	});
	// documentload
});
