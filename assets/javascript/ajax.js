var topics = ["Animals", "Video Games", "Music", "Movies", "Coding"];

    function renderButtons() {
        $("#add-giphy-button").empty();

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

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var topicsDiv = $("<div>");

                    var ratingGiphy = results[i].rating;

                    var p = $("<p>").text("Rating: " + ratingGiphy);

                    var giphyImage = $("<img>");

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

    function clicker () {
        var state = $("img").attr("data-state");

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

$("#find-giphy").on("click", function(event) {
    event.preventDefault();

    var giphyInput = $("#giphy-input").val().trim();
    
    topics.push(giphyInput);

    renderButtons();
});


$(document).on("click", ".gifs", displayGifs);

renderButtons();

//pre-made buttons, and newly created buttons, do not call the giphy api.

// when a user clicks one of the still images, it will then animate. 
// if the user clicks again, it should stop playing.





