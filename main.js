$(document).ready(function(){
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://content.guardianapis.com/search?api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8&show-fields=all",
        success: function(data)
        {
            for(var i = 0; i < 10; i++)
            {
                $("#news").append("<img src='" + data.response.results[i].fields.thumbnail + "' width='200'></img>");
                $("#news").append("<div><a target ='_blank' href='" + data.response.results[i].webUrl +"' >"+ data.response.results[i].webTitle + "</a> </div>");

            }

            for(var i = 4; i < 5; i++)
            {
                $("#whole-story").append(data.response.results[i].fields.body);
            }
        }
});
});

//------------------------------------------------------ SEARCH ------------------------------------------//
//**
// 1 - Check if search is not empty then input the search value into the api url and order by relevance.
// 2 - If api call is successful console log successful call.
// 3 - Display search container and use animation to scroll to the section.
// 4 - If results are 0 then return no results found.
// 5 - using first class from css file to output only 3 items per line
// 6 - If i==3 articles (we already added 3 articles) the variable first user the value "first" for another line 
// 7 - If call result is within local storage then stringify results.
// 8 - Add results to local storage using the search input & the value searched.
// 9 - Render html using for loop to return first 9 results.
//**
function searchNews() {
    var searchInput = $("#search").val();
    if (searchInput !== "") {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: "https://content.guardianapis.com/search?q=" + searchInput + "&order-by=relevance&api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8&show-fields=thumbnail,body,headline",
            success: function (data) {
                console.log("Your search has been made");
                $(".searchContainer").show();
                $('html, body').animate({
                    scrollTop: $(".searchContainer").offset().top - 10
                }, 2000);
                if (data.response.total == 0) {
                    $(".loadSearchResults").html('No results found against this search.');
                } else {
                    if (!window.localStorage.getItem("search" + searchInput)) {
                        var dataResponse = JSON.stringify(data.response.results);
                        window.localStorage.setItem("search" + searchInput, dataResponse);
                    }
                    $(".loadSearchResults").html("");
                    for (var i = 0; i <= 8; i++) {
                        var first = "";
                        if (i % 3 == 0) {
                            first = "first";
                        }
                        $(".loadSearchResults").append(
                            `<li class="one_third ` + first + `">
                                <figure>
                                    <div class="banner-title">` + data.response.results[i].sectionName + `</div>
                                    <img src="` + data.response.results[i].fields.thumbnail + `" style="max-width:325px; border-radius:4px;" alt="">
                                    <figcaption>
                                        <p>` + data.response.results[i].fields.headline + `</p>
                                        <footer><label class="btn btn-primary"  for="modal_search_` + i + `">Read More</label></footer>
                                    </figcaption>
                                </figure>
                            </li>
                            <input class="checker" type="checkbox" id="modal_search_` + i + `">
                            <div class="modal">
                                <div class="modal-body">
                                    <label class="btn_close btn btn-outline-dark" for="modal_search_` + i + `"><i class="fa fa-times"></i>Close</label>
                                    <h6 class="heading">` + data.response.results[i].fields.headline + `</h6>
                                    <img src="` + data.response.results[i].fields.thumbnail + `" alt="">
                                    <div class="modal-content">` + data.response.results[i].fields.body + `</div>
                                </div>
                            </div>`
                            );
                        }
                    }
                },
            })

            //------------------------------------------------------ OFFLINE ------------------------------------------//
            //**
            // 1 - If the API call fails then check if the search input exists by searching local storage.
            // 2 - Parse the results of the search value from local storage into a JSON file and the render HTML.
            //**
        
            .fail(function (jqXHR, textStatus, errorThrown) {
                if ($(".loadSearchResults").html(""),
                $(".searchContainer").show(),
                $("html, body").animate({
                    scrollTop: $(".searchContainer").offset().top - 10
                }, 2000),
                window.localStorage.getItem("search" + searchInput)
                ) {
                    searchResults = window.localStorage.getItem("search"+ searchInput);
                    results = JSON.parse(searchResults);
                    for (var o = 0; o < results.length; o++) {
                        var first = "";
                        if (o % 3 == 0) {
                            first = "first";
                        }
                        var response = results[o];
                        $(".loadSearchResults").append(
                            `<li class="one_third ` + first + `">
                                <figure>
                                    <div class="banner-title">` + response.sectionName + `</div>
                                    <img src="` + response.fields.thumbnail + `" alt="">
                                    <figcaption>
                                        <p>` + response.fields.headline + `</p>
                                        <footer><label class="btn pointer"  for="modal_search_` + o + `">Read More</label></footer>
                                    </figcaption>
                                </figure>
                            </li>
                            <input class="checker" type="checkbox" id="modal_search_` + o + `">
                            <div class="modal">
                                <div class="modal-body">
                                    <label class="btn_close" for="modal_search_` + o + `">Close</label>
                                    <h6 class="heading">` + response.fields.headline + `</h6>
                                    <img src="` + response.fields.thumbnail + `" alt="">
                                    <div class="modal-content">` + response.fields.body + `</div>
                                </div>
                            </div>`
                            );
                        }
                        $(".searchContainer").show();
                    } else {
                        console.log("no results"), $(".loadSearchResults").html("No data found against this search.");
                    }
                })
            } else {
                // hide the search section until a search is made
                ($(".searchContainer").hide(),
                $(".loadSearchResults").html(""))
             } 
}

//------------------------------------------------------ CLOSE SEARCH -------------------------------------------------//
//**
// Using jQuery animation to hide search results section
//**

$( "#closeResults" ).click(function() {
    $( ".searchContainer" ).slideUp(2000);
 });