$(document).ready(function(){
	// make an array for animals
	var topics = [ "orange juice", "running", "pizza" ];

	function makeButtons(){
		$("#inputbuttons").empty();
		// create a loop to make the objects within the array buttons (set inside div with id of inputbuttons)
		for (var i = 0; i < topics.length; i++){
			var ibuttons = $("<button>");
			ibuttons.addClass("topicbutton");
			ibuttons.attr("data-topics", topics[i]);
			ibuttons.text(topics[i]);
			$("#inputbuttons").append(ibuttons);
		}
	}
	// make buttons with the items already inside the array 
	makeButtons();

	// make a push function so any item submitted from the input will be added to the array
	$("#submit").on("click", function(event){
		event.preventDefault();
		var user = $("#userinput").val();
		topics.push(user);
		makeButtons();
	});

	// create a click function to buttons generating gifs
	// attach gifs to the div with an id of gifresults	
	function CallUrl(){	
		var link = $(this).attr("data-topics");
		 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + link + "&api_key=dc6zaTOxFJmzC&limit=10";
		
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
	function imageEvent(){
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
	$(document).on("click", ".topicbutton", CallUrl);
	$(document).on("click", ".gifs", imageEvent);

});

