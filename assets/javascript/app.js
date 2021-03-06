 // Initial array of giphs
 var giphies = ["UGA", "Atlanta Falcons", "Atlanta Braves", "Atlanta Hawks", "Football", "Fantasy Football", "Atlanta United", "Dodge Challenger"];

 function displayGiphyInfo() {

var giphy = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=Ea5LJqvjOvXOG3WY4imF3jqbq3DE6lmF&limit=10";


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
       $("#gifsView").prepend(gifDiv);
   }
});
}





 // Function for displaying giphy
 function renderButtons() {

   $("#giphy-view").empty();

   // Looping through the array of giphs
   for (var i = 0; i < giphies.length; i++) {

     var a = $("<button>");     
     a.addClass("giphy");     
     a.attr("data-name", giphies[i]);     
     a.text(giphies[i]);     
     $("#giphy-view").append(a);
   }
 }

 // This function handles events where one button is clicked
 $("#add-giphy").on("click", function(event) {
   
   event.preventDefault();   
   var giphy = $("#giphy-input").val().trim();  
   giphies.push(giphy);  
   renderButtons();
 });

 // Calling the renderButtons function at least once to display the initial list of movies
 renderButtons();
 $(document).on("click", ".giphy", displayGiphyInfo);
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
