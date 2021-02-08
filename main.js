function getUrlParam() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function(){

    getSections();
    console.log('sections')
    


// function sectionNews() {
//     var section = getUrlParam()["category"];
//     if (section == null || section == "") {  
//         section = "world"; //Home section automatically defaults to "World" news category 
//     }
//     console.log(section)

//     var selectedHeader = $("#HeaderSec").find("[data-sec='" + section + "']"); //Reads the heading section
//     $(selectedHeader).addClass("text-success font-weight-bolder"); //highlights the text and changes the font to bold
//     $(selectedHeader).removeClass("text-muted");

//         $.ajax({
//             type: "GET",
//             dataType: "jsonp",
//             cache: false,
//             url: "https://content.guardianapis.com/search?section="  + section +"&api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8",
//             success: function (data) {
//                 console.log(this.url)
//                 $(".searchContainer").show();
//                 $('html, body').animate({
//                     scrollTop: $(".searchContainer").offset().top - 10
//                 }, 2000);
//                 if (data.response.total == 0) {
//                     $(".loadSearchResults").html('No results found against this search.');
//                 } else {
//                     if (!window.localStorage.getItem("search" + searchInput)) {
//                         var dataResponse = JSON.stringify(data.response.results);
//                         window.localStorage.setItem("search" + searchInput, dataResponse);
//                     }
//                     $(".loadSearchResults").html("");
//                     for (var i = 0; i <= 9; i++) {
//                         var first = "";
//                         if (i % 3 == 0) {
//                             first = "first";
//                         }
//                         $(".loadSearchResults").append(
//                             `
//                             <div class="col mb-4">
//                                 <div class="card h-100">
//                                     <h5 class="card-header">` + data.response.results[i].sectionName +`</h5>
//                                     <div class="card-body">
//                                         <h5 class="card-title">`+ data.response.results[i].fields.headline +  `</h5>
//                                         <img src="` + data.response.results[i].fields.thumbnail + `" class="card-img-top" alt="">
//                                         <a href="#" class="btn btn-primary"><label for="modal_search_` + i + `">Read Full Story</label></a>
//                                     </div>
//                                 </div>
//                             </div>

//                             <input class="checker" type="checkbox" id="modal_search_` + i + `">
                            
//                             <div class="modal" style="max-width: 100vw; padding: 40px;">
//                                 <div class="modal-body">
//                                     <div class="modal-header">
//                                         <h5 class="modal-title">` + data.response.results[i].fields.headline + `</h5>
//                                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                             <label class="btn_close btn btn-outline-dark" for="modal_search_` + i + `"><i class="fa fa-times"></i></label>
//                                         </button>
//                                     </div>
//                                     <img src="` + data.response.results[i].fields.thumbnail + `" alt="">
//                                     <div class="modal-content">` + data.response.results[i].fields.body + `</div>
//                                 </div>
//                             </div>
//                             `
//                             );
//                         }
//                     }
//                 },
//             })

//             //------------------------------------------------------ OFFLINE ------------------------------------------//
//             //**
//             // 1 - If the API call fails then check if the search input exists by searching local storage.
//             // 2 - Parse the results of the search value from local storage into a JSON file and the render HTML.
//             //**
        
//             .fail(function (jqXHR, textStatus, errorThrown) {
//                 if ($(".loadSearchResults").html(""),
//                 $(".searchContainer").show(),
//                 $("html, body").animate({
//                     scrollTop: $(".searchContainer").offset().top - 10
//                 }, 2000),
//                 window.localStorage.getItem("search" + searchInput)
//                 ) {
//                     searchResults = window.localStorage.getItem("search"+ searchInput);
//                     results = JSON.parse(searchResults);
//                     for (var o = 0; o < results.length; o++) {
//                         var first = "";
//                         if (o % 3 == 0) {
//                             first = "first";
//                         }
//                         var response = results[o];
//                         $(".loadSearchResults").append(
//                             `
//                             <div class="col mb-4">
//                                 <div class="card h-100">
//                                     <h5 class="card-header">` + response.sectionName +`</h5>
//                                     <div class="card-body">
//                                         <h5 class="card-title">`+ response.fields.headline +  `</h5>
//                                         <img src="` + response.fields.thumbnail + `" class="card-img-top" alt="">
//                                         <a href="#" class="btn btn-primary"><label for="modal_search_` + o + `">Read Full Story</label></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <input class="checker" type="checkbox" id="modal_search_` + o + `">
//                             <div class="modal" style="max-width: 100vw; padding: 40px;">
//                                 <div class="modal-body">
//                                     <div class="modal-header">
//                                         <h5 class="modal-title">` + response.fields.headline + `</h5>
//                                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                             <label class="btn_close btn btn-outline-dark" for="modal_search_` + o + `"><i class="fa fa-times"></i></label>
//                                         </button>
//                                     </div>
//                                     <img src="` + response.fields.thumbnail + `" alt="">
//                                     <div class="modal-content">` + response.fields.body  + `</div>
//                                 </div>
//                             </div>
//                             `
//                             );
//                         }
//                         $(".searchContainer").show();
//                     } else {
//                         console.log("no results"), $(".loadSearchResults").html("No data found against this search.");
//                     }
//                 })
//             } 
});

//------------------------------------------------------- UK STOREIS SECTION ONLINE & OFFLINE FUNCTION  ------------------------------------------
// ONLINE FUNCTION
    //**
    //Step 1 - Searching for the term UK and then ordering the results order of RELEVANCE
    //Step 2 - Creating an array for uk news and storying them in the local storage using headline as the key
    //Step 3 - Initiating the html of the news section which here is uk
    //Step 4 - Creating a loop for the API call to do the function 9 times
    //Step 5 - Duplication check - check if key doesn't exists in localStorage, if not then store it with headline as the key
    //Step 5 - Seperating the keys to array of world breaking the string by headline by dimeter "%%"
    //Step 6 - Getting the date of the publication of the artical and putting it into the date function created to show how old the article is (diff_minutes)
    //Step 7 - add html to the "loadUKStories" block resulting in the headline, date and thumbnial being output in cards
    //Step 8 - the modal itself then starts at (<div class = "modal_body">....</div>)
    //Step 9 - a checkbox is added to check if the article is clicked to view more so it shows the correpondant modal
    //Step 10 - To have a correspondance between the modal full view and the article, I use the parameter "i" which is used to create the "id" of the checkbox 
    //Step 11 - The footer is used to open the modal and the btn_close is used to close the modal full view when finished reading
    //**      
    function getSections() {
        var section = getUrlParam()["category"];
    if (section == null || section == "") {  
        section = "world"; //Home section automatically defaults to "World" news category 
    }
        var selectedHeader = $("#HeaderSec").find("[data-sec='" + section + "']"); //Reads the heading section
            $(selectedHeader).addClass("text-success font-weight-bolder"); //highlights the text and changes the font to bold
            $(selectedHeader).removeClass("text-muted");

            const guardianSectionAPI = "https://content.guardianapis.com/search?section=" + section + "&order-by=relevance&api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8&show-fields=thumbnail,body,headline";

            
    console.log(section)
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: guardianSectionAPI,
            success: function (data) {
                console.log(data)
                window.localStorage.setItem("sports", "");
                $("#Sections").html('');
                for (var i = 0; i < 9; i++) {
                    var first = "";
                    if (i == 0 || i == 3 || i == 6) {
                        first = "first";
                    }
                    if (!window.localStorage.getItem(data.response.results[i].fields.headline)) {
                        var dataString = JSON.stringify(data.response.results[i]);
                        window.localStorage.setItem(data.response.results[i].fields.headline, dataString);
                    }
                    window.localStorage.setItem("sports", window.localStorage.getItem("sports") + "%%" + data.response.results[i].fields.headline)
                    var dt2 = new Date(data.response.results[i].webPublicationDate);
                    // var res = diff_minutes(dt2);
                    $("#Sections").append(`<li class="one_third ` + first + `">
                                    <figure>
                                        <div class="banner-title">` + data.response.results[i].sectionName + `</div>
                                        <img src="` + data.response.results[i].fields.thumbnail + `" alt="">
                                        <figcaption>
                                            <p>` + data.response.results[i].fields.headline + `</p>
                                            
                                            <footer><label class="btn pointer"  for="modal_ukstories_` + i + `">Read More</label></footer>
                                        </figcaption>
                                    </figure>
                                </li>
                                <input class="checker" type="checkbox" id="modal_ukstories_` + i + `">
                                <div class="modal">
                                    <div class="modal-body">
                                        <label class="btn_close" for="modal_ukstories_` + i + `">Close</label>
                                        <h6 class="heading">` + data.response.results[i].fields.headline + `</h6>
                                        <img src="` + data.response.results[i].fields.thumbnail + `" alt="">
                                        <div class="modal-content">` + data.response.results[i].fields.body + `</div>
                                    </div>
                                </div>`);
                }
            }

// OFFLINE
//**
//Step 1 - If API request fails (no network) fails initiate the html of World stories, if not in local storage console log no results
//Step 2 - If it wasn't searched before or stored show No data found
//Step 3 - Break the string file up into an array of keys for example str= potato%%tomato%%carrot would then be x = [potato,tomato,carrot] after split
//Step 4 - using first class from css file to output only 3 items per line
//Step 5 - If i==3 articles (if it already has added 3 articles) the variable first user the value "first" for another line 
//Step 6 - loop through keys like normal and get date from local storage 
//** 
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $(".loadUKStories").html('');
            if (!window.localStorage.getItem("ukStories")) {
                console.log('no results');
                $(".loadUKStories").html('No data found against this search.');
            } else {
                resultss = window.localStorage.getItem("ukStories").split('%%');
                for(var i=0; i<resultss.length;i++){
                    var first = "";
                    
                    if ((i-1) % 3 == 0) {
                        first = "first";
                    }
                    var result = JSON.parse(window.localStorage.getItem(resultss[i]));
                    if(result){
                        var dt2 = new Date(result.webPublicationDate);
                        var res = diff_minutes(dt2);
                        $(".loadUKStories").append(`<li class="one_third ` + first + `">
                        <figure>
                            <div class="banner-title">` + result.sectionName + `</div>
                            <img src="` + result.fields.thumbnail + `" alt="">
                            <figcaption>
                                <p>` + result.fields.headline + `</p>
                                <p class="time-difference"><small><em>` + res + `</em></small></p>
                                <footer><label class="btn pointer"  for="modal_ukstories_` + i + `">Read More</label></footer>
                            </figcaption>
                        </figure>
                    </li>
                    <input class="checker" type="checkbox" id="modal_ukstories_` + i + `">
                    <div class="modal">
                        <div class="modal-body">
                            <label class="btn_close" for="modal_ukstories_` + i + `">Close</label>
                            <h6 class="heading">` + result.fields.headline + `</h6>
                            <img src="` + result.fields.thumbnail + `" alt="">
                            <div class="modal-content">` + result.fields.body + `</div>
                        </div>
                    </div>`);
                    }
                   
                }
            }

        });
    //**
        // This is a refresh for content, a refresh function to refresh the page with new ajax calls. 
        // what it is doing is forcing the page to reload and therefore load newest data.
    //**
        setTimeout(getSections, 10800000);
    }

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
// 9 - Render html using for loop to return first 10 results.
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
                    for (var i = 0; i <= 9; i++) {
                        var first = "";
                        if (i % 3 == 0) {
                            first = "first";
                        }
                        $(".loadSearchResults").append(
                            `
                            <div class="col mb-4">
                                <div class="card h-100">
                                    <h5 class="card-header">` + data.response.results[i].sectionName +`</h5>
                                    <div class="card-body">
                                        <h5 class="card-title">`+ data.response.results[i].fields.headline +  `</h5>
                                        <img src="` + data.response.results[i].fields.thumbnail + `" class="card-img-top" alt="">
                                        <a href="#" class="btn btn-primary"><label for="modal_search_` + i + `">Read Full Story</label></a>
                                    </div>
                                </div>
                            </div>

                            <input class="checker" type="checkbox" id="modal_search_` + i + `">
                            
                            <div class="modal" style="max-width: 100vw; padding: 40px;">
                                <div class="modal-body">
                                    <div class="modal-header">
                                        <h5 class="modal-title">` + data.response.results[i].fields.headline + `</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <label class="btn_close btn btn-outline-dark" for="modal_search_` + i + `"><i class="fa fa-times"></i></label>
                                        </button>
                                    </div>
                                    <img src="` + data.response.results[i].fields.thumbnail + `" alt="">
                                    <div class="modal-content">` + data.response.results[i].fields.body + `</div>
                                </div>
                            </div>
                            `
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
                            `
                            <div class="col mb-4">
                                <div class="card h-100">
                                    <h5 class="card-header">` + response.sectionName +`</h5>
                                    <div class="card-body">
                                        <h5 class="card-title">`+ response.fields.headline +  `</h5>
                                        <img src="` + response.fields.thumbnail + `" class="card-img-top" alt="">
                                        <a href="#" class="btn btn-primary"><label for="modal_search_` + o + `">Read Full Story</label></a>
                                    </div>
                                </div>
                            </div>
                            <input class="checker" type="checkbox" id="modal_search_` + o + `">
                            <div class="modal" style="max-width: 100vw; padding: 40px;">
                                <div class="modal-body">
                                    <div class="modal-header">
                                        <h5 class="modal-title">` + response.fields.headline + `</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <label class="btn_close btn btn-outline-dark" for="modal_search_` + o + `"><i class="fa fa-times"></i></label>
                                        </button>
                                    </div>
                                    <img src="` + response.fields.thumbnail + `" alt="">
                                    <div class="modal-content">` + response.fields.body  + `</div>
                                </div>
                            </div>
                            `
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