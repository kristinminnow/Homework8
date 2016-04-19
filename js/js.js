
// In this application we will be working with the OMDB API to develop a movie search front end. This application will make use of Handlebars for templating.
// Download the starter code, and link Handlebars and your custom JS file.
// You will be using the OMDB search API to pull a list of movies matching a search query in the text field.
// A sample query is:
// http://www.omdbapi.com?s=The+Matrix
// The JSON that comes back only gives you truncated information. You will need much more movie information to fill out the rest of the template.
// You will need to make subsequent requests to retrieve the rest of the information. A good way to do this is through using the IMDB ID endpoint:
// http://www.omdbapi.com/?i=tt0133093
// The app should hide the search box when the search is successful and show the movie cards with the correct information.
// Bonus: Provide the user with the option to search again after the results come in.


//Prevent the form from trying to go to a URL.
//Listen for the form submission and get value of form field for title, serialize it. 
//Create AJAX call to API with title and get back a list of movies, including their IDs: http://www.omdbapi.com?s=The+Matrix
//For each movie, submit a new request with the ID back to the ID endpoint, getting back the data we want to display for each
//Compile HB template
//Append new HTML to document


$(document).ready(function() {

 // set up the handlebars template by getting the HTML defined as a template
 var source = $("#movie-template").html();

                            // compile the template
                            var movieTemplate = Handlebars.compile(source);



// listen for the user to submit the form
$("#movieSearchForm").on("submit", function(event) {
        //don't allow the form to refresh the page
        event.preventDefault();

        // get the text submission and encode it
        var movieTitle = encodeURIComponent($("#movie-title").val());
        
        // append the text string to the omdb api URL
        var titleSearchURL = "http://www.omdbapi.com?s=" + movieTitle;

        // perform an ajax request via jquery
        $.ajax({
            // get data
            type: "GET",
            // use the omdb url set up above
            url: titleSearchURL,
            success: function(movies) {
                // look into the original object, which contains the search results as a child object
                var singleMovies = movies.Search;

                // loop through each of those single movies
                singleMovies.forEach(function(movie) {
                    // set the URL for that movie to it's own ID
                    var idSearch = "http://www.omdbapi.com?i=" + movie.imdbID;
                    $.ajax({
                        type: "GET",
                        // get data from the new search URL for that specific movie
                        url: idSearch,
                        success: function(fullMovie) {

                            // assign the new html created by handlebars to a variable so we can append it
                            var newHTML = movieTemplate(movie);

                            // append the new html to the page
                            $("#movie-output").append(newHTML);

                            // unhide the movies
                            $(".movie-card").css("display", "block");

                            // hide the search box
                            $("#search-input-box").removeClass("show").addClass("hide");
                            
                            // show the search again buttons at bottom and top
                            $(".re-search").removeClass("hide").addClass("show");

                        },
                        error: function() {
                            console.log("title id error");
                        }

                    });

                })

            },
            error: function() {
                console.log("title search error");
            }


        });


    });
    // show and hide stuff when initiating a new search

    // listen for the clicking of the search again button
    $(".re-search-button").on("click", function(clicky) {
        // don't let that button go anywhere
        clicky.preventDefault();
        // hide the movies previously searched
        $(".movie-card").css("display", "none");
        // show the search box
        $("#search-input-box").removeClass("hide").addClass("show");
        // hide the search again buttons
        $(".re-search").removeClass("show").addClass("hide");
        // remove the old movies
        $("#movie-output").html("");
        
    })

});