$(document).ready(function(){
	
	// make an array for gif topic buttons
	var topics = [ "orange juice", "running", "pizza" ];

	function makeGifTopicButton(){
		$("#inputbuttons").empty();

		// create a loop to make the topic buttons from the array, "topics" (set inside div with id of inputbuttons)
		for (var i = 0; i < topics.length; i++){
			var ibuttons = $("<div>");
			ibuttons.addClass("topicbutton");
			ibuttons.attr("data-topics", topics[i]);
			ibuttons.text(topics[i]);
			$("#inputbuttons").append(ibuttons);
		}
	};

	// make topic buttons with the items already inside the array 
	makeGifTopicButton();

	// make a push function so any item submitted from the input will be added to the array, "topics"
	$("#submit").on("click", function(event){
		event.preventDefault();
		var user = $("#userinput").val().trim();
		topics.push(user);
		makeGifTopicButton();
	});

	// create a click function for buttons to generate gifs
	// attach those gifs to the div with an id of gifresults	
	function createGifs(){	
		var link = $(this).attr("data-topics");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + link + "&api_key=fAJzZznQrHjmbZhmk0z8emGofg6gAYpt&limit=10";
		
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			$("#gifresults").empty();

			for (var i = 0; i < response.data.length; i++) {
            	var gifDiv = $("<div class='item'>");
            	var rating = response.data[i].rating;
	            var p = $("<p class='para'>").text("Rating: " + rating);
	            var Image = $("<img>");
	            Image.attr("src", response.data[i].images.original_still.url);
	            Image.attr("data-still", response.data[i].images.original_still.url);
	            Image.attr("data-animate", response.data[i].images.original.url);
	            Image.attr("data-state", "still");
	            Image.addClass("gifs");
	            gifDiv.prepend(p);
	            gifDiv.prepend(Image);
	            $("#gifresults").prepend(gifDiv);
	        }
		});
	};

	// create a function for the animation to be turned on and off
	function gifAnimationEvent(){
		var state = $(this).attr("data-state");

		if (state === "still"){
			$(this).attr("src", $(this).data("animate"));
	        $(this).attr("data-state", "data-animate");
	      } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
	      }
	};

	// call click events on the DOM for the functions created
	$(document).on("click", ".topicbutton", createGifs);
	$(document).on("click", ".gifs", gifAnimationEvent);

});
