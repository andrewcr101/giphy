 // Initial array of movies
 var giphies = ["UGA", "Atlanta Falcons", "Atlanta Braves", "Atlanta Hawks", "Football", "Fantasy Football", "Atlanta United", "Dodge Challenger"];

 function displayMovieInfo() {

var giphy = $(this).attr("data-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=Ea5LJqvjOvXOG3WY4imF3jqbq3DE6lmF&limit=10";

// Creating an AJAX call for the specific movie button being clicked
$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
console.log(response); // console test to make sure something returns
   $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
   var results = response.data; //shows results of gifs
   if (results == ""){
     alert("There isn't a gif for this selected button");
   }
   for (var i=0; i<results.length; i++){

       var gifDiv = $("<div>"); //div for the gifs to go inside
       gifDiv.addClass("gifDiv");
       // pulling rating of gif
       var gifRating = $("<p>").text("Rating: " + results[i].rating);
       gifDiv.append(gifRating);
       // pulling gif
       var gifImage = $("<img>");
       gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
       gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
       gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
       gifImage.attr("data-state", "still"); // set the image state
       gifImage.addClass("image");
       gifDiv.append(gifImage);
       // pulling still image of gif
       // adding div of gifs to gifsView div
       $("#gifsView").prepend(gifDiv);
   }
});
}





 // Function for displaying movie data
 function renderButtons() {

   // Deleting the movie buttons prior to adding new movie buttons
   // (this is necessary otherwise we will have repeat buttons)
   $("#giphy-view").empty();

   // Looping through the array of movies
   for (var i = 0; i < giphies.length; i++) {

     // Then dynamicaly generating buttons for each movie in the array.
     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class
     a.addClass("giphy");
     // Adding a data-attribute with a value of the movie at index i
     a.attr("data-name", giphies[i]);
     // Providing the button's text with a value of the movie at index i
     a.text(giphies[i]);
     // Adding the button to the HTML
     $("#giphy-view").append(a);
   }
 }

 // This function handles events where one button is clicked
 $("#add-giphy").on("click", function(event) {
   // event.preventDefault() prevents the form from trying to submit itself.
   // We're using a form so that the user can hit enter instead of clicking the button if they want
   event.preventDefault();

   // This line will grab the text from the input box
   var giphy = $("#giphy-input").val().trim();
   // The movie from the textbox is then added to our array
   giphies.push(giphy);

   // calling renderButtons which handles the processing of our movie array
   renderButtons();
 });

 // Calling the renderButtons function at least once to display the initial list of movies
 renderButtons();
 $(document).on("click", ".giphy", displayMovieInfo);
 $(document).on("click", ".image", function(){
var state = $(this).attr('data-state');
if ( state == 'still'){
   $(this).attr('src', $(this).data('animate'));
   $(this).attr('data-state', 'animate');
}else{
   $(this).attr('src', $(this).data('still'));
   $(this).attr('data-state', 'still');
 }
});
