var topics = ["Animals", "Video Games", "Music", "Movies", "Coding"];

    function renderButtons() {
        //clears so not all buttons are repeated when adding a new one
        $("#add-giphy-button").empty();
        //
        for (var j = 0; j < topics.length; j++) {
            var b = $("<button>");

            b.addClass("gifs btn btn-dark");

            b.attr("id")

            b.attr("data-name", topics[j]);

            b.attr("value", topics[j]);

            b.text(topics[j]);

            $("#add-giphy-button").append(b);
        }
    };

    // API KEY = INeXGcmMypyVwer9CdJsNzXaw1Yo2ArL
    function displayGifs () {
        
        $("#giphy-view").empty();

        var giphy = $(this).attr("data-name");

        //url + giphy segments(count, offset, etc) + apiKey(INeXGcmMypyVwer9CdJsNzXaw1Yo2ArL);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=INeXGcmMypyVwer9CdJsNzXaw1Yo2ArL&limit=10";


        $.ajax({
            //url of page + additional segments,
            url: queryURL, 
            method: "GET"

        }).then(function(response) {

        console.log(queryURL);
        console.log(response);

            //set results variable = the response, and find the data segment of the object.
            var results = response.data;
            //for-loop to run through every option in the results
            for (var i = 0; i < results.length; i++) {
                //if ratings of gifs are not "r" or "pg-13" do the following.
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var topicsDiv = $("<div>");
                    

                    var ratingGiphy = results[i].rating;

                    var p = $("<p>").text("Rating: " + ratingGiphy);

                    var giphyImage = $("<img>");

                    //set attributes to be called in the clicker function
                    giphyImage.attr("src", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                    giphyImage.attr("data-state", "still");
                    giphyImage.attr("id", "giphyImages");

                    
                    topicsDiv.prepend(p);
                    topicsDiv.prepend(giphyImage);
                
                $("#giphy-view").prepend(topicsDiv);

                }

            }

        });

    };

    var c=0;
    //function to click on images, and change attributes with if/else statements
    function clicker () {
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            c++;
            console.log(c);
        }
    };

$(document).on("click", "#giphyImages", clicker);
//click event for find-giphy 
$("#find-giphy").on("click", function(event) {
    event.preventDefault();

    var giphyInput = $("#giphy-input").val().trim();
    
    topics.push(giphyInput);

    renderButtons();
});

//call onclick and renderbutton functions
$(document).on("click", ".gifs", displayGifs);

renderButtons();









