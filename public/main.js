$(document).ready(function () {
   // Function Calls to generate dynamic content for sections
   getSections();
   // Function Calls to generate dynamic content for popular news
   getPopularNews();
   // Function Calls OpenWeather API to generate dynamic content for weather
   getWeather();

   $(function () {
      $(".slides").slick({
         dots: true,
         autoplay: true,
         autoplaySpeed: 3000
      });
   })

   //------------------------------------------------------- TOP STORIES SLIDER ONLINE & OFFLINE FUNCTION  ------------------------------------------
   //------------------------------------------------------- ONLINE  ------------------------------------------
   //**
   //Step 1 - Url searched top stories and orders the response by newest
   //Step 2 - An array is developed for trending stories and stores the articles in localStorage with key of headline
   //Step 4 - For loop used to render 7 stories
   //Step 5 - Duplication check: used to check if the key already exists in storage and if not then stores the new array for trending
   //Step 5 - Seperating the keys to array of trending stories breaking the string by headline by dimeter "%%"
   //Step 6 - Dynamicly insert the headline, body and thumbnail data into cards
   //Step 7 - Read more button opens the modal by using the checkbox
   //Step 8 - Using the i parameter the modal renders the article info for the appropriate articles that was selected by being passed in the checkbox
   //**  

   $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      // GET latest trending stories by newest relevance
      url: "https://content.guardianapis.com/search?q=&order-by=newest&api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8&show-fields=thumbnail,body,headline",
      success: function (data) {
         for (var i = 0; i < 7; i++) {
            $("#slider" + i).append(`
              <figcaption class="caption_trending_topics">
              <div class="d-flex align-items-center">
                  <h6 class="heading">` + data.response.results[i].fields.headline + `</h6>
                  <label class="btn btn-light ml-2"  for="modal_trending_` + i + `">Read More</label>
              </div>
                  <img src="` + data.response.results[i].fields.thumbnail + `" height="300" width="500" alt="trending thumbnail">
              </figcaption>
             `);

            $("#top-stories").append(`
              <input class="checker" type="checkbox" id="modal_trending_` + i + `">
              <div class="modal" style="max-width: 100vw; padding: 40px;">
                  <div class="modal-body">
                      <div class="modal-header">
                          <h5 class="modal-title trending">` + data.response.results[i].fields.headline + `</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <label class="btn_close btn btn-outline-dark" for="modal_trending_` + i + `"><i class="fa fa-times"></i></label>
                          </button>
                      </div>
                      <div class="modal-content trending">` + data.response.results[i].fields.body + `</div>
                  </div>
              </div>
            `);
         }
      }
      //------------------------------------------------------- OFFLINE  ------------------------------------------
      //**
      //Step 1 - If API call fails check the status code
      //Step 2 - Based on status code render the appropriate error in HTML
      //** 
   }).fail(function (jqXHR, textStatus, errorThrown) {
      var msg = "";
      if (jqXHR.status === 0) {
         msg = "Network Error.";
      } else if (jqXHR.status == 404) {
         msg = "Not Found. [404]";
      } else if (jqXHR.status == 500) {
         msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
         msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
         msg = "Time out error.";
      } else if (exception === "abort") {
         msg = "Ajax request aborted.";
      } else {
         msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      $("#top-stories").html(msg);
   })
});


//------------------------------------------------------- MOST POPULAR NEWS SECTION ONLINE & OFFLINE FUNCTION  ------------------------------------------
//------------------------------------------------------- ONLINE  ------------------------------------------
//**
//Step 1 - Url queries for popular news and orders the response by newest
//Step 2 - Render HTML for the popular section 
//Step 3 - For loop used to render 10 stories
//Step 4 - Dynamicly insert the headline, body and thumbnail data into cards
//Step 5 - Read more button opens the modal by using the checkbox
//Step 6 - Using the i parameter the modal renders the article info for the appropriate articles that was selected by being passed in the checkbox
//**  

function getPopularNews() {
   $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: "https://content.guardianapis.com/search?q=popular&order-by=newest&api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8&show-fields=main,trailText,body,headline,thumbnail",
      success: function (data) {
         $("#most-popular").html('');
         // for loop to render the first 10 articles 
         for (var i = 0; i < 10; i++) {
            // headlines added to the trending array
            // keys are created by splitting the string from the headline  using diameter "%%"
            window.localStorage.setItem("popular", window.localStorage.getItem("trending") + "%%" + data.response.results[i].fields.headline);
            // render the response data into the card
            // i is used to identify the article id and enables the modal to render the appropriate data
            $("#most-popular").append(`
            <div class="mb-4">
                  <div class="card h-100">
                     <h5 class="card-header">` + data.response.results[i].sectionName + `</h5>
                     <div class="card-body">
                        <h5 class="card-title">` + data.response.results[i].fields.headline + `</h5>
                        <img src="` + data.response.results[i].fields.thumbnail + `" class="card-img-top" height="180" width="330" alt="popular news thumbnail">
                        <a href="#" class="btn btn-danger mt-2"><label for="modal_popular_` + i + `">Read Full Story</label></a>
                     </div>
                  </div>
            </div>

            <input class="checker" type="checkbox" id="modal_popular_` + i + `">

            <div class="modal" style="max-width: 100vw; padding: 40px;">
                  <div class="modal-body">
                     <div class="modal-header">
                        <h5 class="modal-title">` + data.response.results[i].fields.headline + `</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <label class="btn_close btn btn-outline-dark" for="modal_popular_` + i + `"><i class="fa fa-times"></i></label>
                        </button>
                     </div>
                     <img src="` + data.response.results[i].fields.thumbnail + `"  height="300" width="500" alt="popular news thumbnail">
                     <div class="modal-content">` + data.response.results[i].fields.body + `</div>
                  </div>
            </div>
            `);
         }
      }
      //------------------------------------------------------- OFFLINE  ------------------------------------------
      //**
      //Step 1 - If API call fails check the status code
      //Step 2 - Based on status code render the appropriate error in HTML
      //** 
   }).fail(function (jqXHR, exception, errorThrown) {
      var msg = "";
      if (jqXHR.status === 0) {
         msg = "Network Error.";
      } else if (jqXHR.status == 404) {
         msg = "Not Found. [404]";
      } else if (jqXHR.status == 500) {
         msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
         msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
         msg = "Time out error.";
      } else if (exception === "abort") {
         msg = "Ajax request aborted.";
      } else {
         msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      $("#most-popular").html(msg);
   });
   // Forcing a refresh of content run new ajax calls after 15mins to load latest popular news.
   setTimeout(getPopularNews, 900000);
};

// Weather section seach value collection
//Variable to initialise the city for weather API
var city = "belfast";
// Event handler calls method on click to retrieve and update city variable value
$("#search-weather").click(function () {
   city = $("#city").val();
   // Method clears previous error text if set
   $("#weather-result").empty();
   // Method clears previous error text if set
   $("#werror").empty();
   // If statement to check if value has been set, if no city message displays to the user
   if (city == "") {
      msg = "Location Required. ";
      $("#werror").html(msg);
   } else {
      // Method called to perform query search and display dynamic content
      getWeather();
   }
});

//------------------------------------------------------- CONTRAST THEMES  ------------------------------------------
$("a.button-toggle-highcontrast").click(function () {
   $("body").addClass("highcontrast");
   $(".subtitle").addClass("subtitle-contrast");
});
$("a.button-toggle-remove").click(function () {
   $("body").removeClass('highcontrast');
   $(".subtitle").removeClass("subtitle-contrast");
});

// Method to display weather related content
function getWeather() {
   // Method checks if application is online before making a call to the Open Weather API
   if (navigator.onLine) {
      $("#weather-error").hide();
      // Shows the weather content if online
      $("#show-weather").show();
      // Variables get the current date and format the information to be legible
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var cd = "/" + month + "/" + year;
      // key required for API access
      var key = "65a93a07f12d1e716d1a81488d69ba85";
      // Ajax request to API and returns
      $.ajax({
         url: "https://api.openweathermap.org/data/2.5/forecast",
         dataType: "json",
         type: "get",
         data: {
            q: city,
            appid: key,
            units: "metric",
            cnt: "7"
         },
         // Retrieves the data from weather API and appends it to application
         success: function (data) {
            var location = "";
            location += "<h2>" + data.city.name + "</h2>";
            $("#weather-title").html(location);
            $.each(data.list, function (index, val) {
               $("#weather-result").append(`
               <div class="card h-100">
                  <b class="card-header p-0 bg-danger text-white" style="display: flex; justify-content: center;">` + day + cd + `</b>
                  <div class="card-body weather-body">
                     <img src="https://openweathermap.org/img/w/` + val.weather[0].icon + `.png" class="card-img-top weather-icon" height="30" width="30" alt="weather icon">
                     <b> ` + val.main.temp + `&degC</b>
                  </div>
               </div>
               `);
               //increments the day 
               day++;
            });
         }
         //------------------------------------------------------- OFFLINE  ------------------------------------------
         //**
         //Step 1 - If API call fails check the status code
         //Step 2 - Based on status code render the appropriate error in HTML
         //**  
      }).fail(function (jqXHR, exception, errorThrown) {
         var msg = "";
         if (jqXHR.status === 0) {
            msg = "Network Error.";
         } else if (jqXHR.status == 404) {
            msg = "Not Found. [404]";
         } else if (jqXHR.status == 500) {
            msg = "Internal Server Error [500].";
         } else if (exception === "parsererror") {
            msg = "Requested JSON parse failed.";
         } else if (exception === "timeout") {
            msg = "Time out error.";
         } else if (exception === "abort") {
            msg = "Ajax request aborted.";
         } else {
            msg = "Uncaught Error.\n" + jqXHR.responseText;
         }
         $("#weather-error").show();
         $("#weather-error").html(msg);
      });
   } else {
      // If application is offline then the weather API content will be hidden
      $("#show-weather").hide();
   }
}

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

//------------------------------------------------------- SECTIONS ONLINE & OFFLINE FUNCTION  ------------------------------------------
// ONLINE FUNCTION
//**
//Step 1 - Searching for the section that was selected using the "data-sec" value and then ordering the results order of relevance
//Step 2 - Creating an array for category then storing in the local storage with headline as the key
//Step 3 - Render HTML looping through the top 9 stories
//Step 4 - Duplication check - check if key doesn't exists in localStorage, if not then store it with headline as the key
//Step 5 - Seperating the keys into sections breaking the string by headline by dimeter "%%"
//Step 6 - Develop modal when clicked "read more" using check box 
//**      
function getSections() {
   var section = getUrlParam()["category"];
   if (section == null || section == "") {
      section = "world"; //Home section automatically defaults to "World" news category 
   }
   var selectedSection = $("#header-section").find("[data-sec='" + section + "']"); //reads the html tag of the nav bar to find what section was selected
   $(selectedSection).addClass("text-danger font-weight-bolder"); //jQuery to highlight the text of the section selected
   $(selectedSection).removeClass("text-muted");

   const guardianSectionAPI = "https://content.guardianapis.com/search?section=" + section + "&order-by=relevance&api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8&show-fields=main,trailText,body,headline";

   $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: guardianSectionAPI,
      success: function (data) {
         window.localStorage.setItem(section, "");
         console.log(section)
         var title = "";
         title += "<h2>" + section.toUpperCase();
         title += " NEWS </h2>";
         $("#section-selected").html(title);
         $("#sections").html('');
         for (var i = 0; i < 9; i++) {
            if (!window.localStorage.getItem(data.response.results[i].fields.headline)) {
               var dataString = JSON.stringify(data.response.results[i]);
               window.localStorage.setItem(data.response.results[i].fields.headline, dataString);
            }
            window.localStorage.setItem(section, window.localStorage.getItem(section) + "%%" + data.response.results[i].fields.headline)
            $("#sections").append(`
            <div class="card flex-md-row mb-4 box-shadow">
               <div class="col-md-12 card-body d-flex flex-column align-items-start">
                  <div class="tag">` + data.response.results[i].sectionName + `</div>
                  <h3 class="mb-0">
                     <p>` + data.response.results[i].fields.headline + `</p>
                  </h3>
                  <div>` + data.response.results[i].fields.trailText + `</div>
                  <div>` + data.response.results[i].fields.main + `</div>
                  <footer><label class="btn btn-danger mt-2"  for="modal_section_` + i + `">Read More</label></footer>
               </div>
            </div>
            
            <input class="checker" type="checkbox" id="modal_section_` + i + `">
                     
            <div class="modal" style="max-width: 100vw; padding: 40px;">
               <div class="modal-body">
                  <div class="modal-header">
                     <h5 class="modal-title">` + data.response.results[i].fields.headline + `</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <label class="btn_close btn btn-outline-dark" for="modal_section_` + i + `"><i class="fa fa-times"></i></label>
                     </button>
                  </div>
                  <div class="modal-content">` + data.response.results[i].fields.body + `</div>
               </div>
             </div>
            `);
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
      $("#sections").html('');
      if (!window.localStorage.getItem(section)) {
         console.log('no results');
         $("#sections").html('No data found against this search.');
      } else {
         resultss = window.localStorage.getItem(section).split('%%');
         for (var i = 0; i < resultss.length; i++) {
            var result = JSON.parse(window.localStorage.getItem(resultss[i]));
            if (result) {
               $("#sections").append(`
               <div class="card flex-md-row mb-4 box-shadow">
                  <div class="col-md-8 card-body d-flex flex-column align-items-start">
                     <h3 class="mb-0">
                        <p>` + result.fields.headline + `</p>
                     </h3>
                     <footer><label class="btn btn-danger mt-2"  for="modal_section_` + i + `">Read More</label></footer>
                  </div>
               </div>
               
               <input class="checker" type="checkbox" id="modal_section_` + i + `">
               
               <div class="modal" style="max-width: 100vw; padding: 40px;">
                  <div class="modal-body">
                        <div class="modal-header">
                           <h5 class="modal-title">` + result.fields.headline + `</h5>
                           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <label class="btn_close btn btn-outline-dark" for="modal_section_` + i + `"><i class="fa fa-times"></i></label>
                           </button>
                        </div>
                        <div class="modal-content">` + result.fields.body + `</div>
                  </div>
               </div>
               `);
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
                  $(".loadSearchResults").append(`
                     <div class="col mb-4">
                           <div class="card h-100">
                              <h5 class="card-header">` + data.response.results[i].sectionName + `</h5>
                              <div class="card-body">
                                 <h5 class="card-title">` + data.response.results[i].fields.headline + `</h5>
                                 <img src="` + data.response.results[i].fields.thumbnail + `" class="card-img-top"  height="170" width="280" alt="search thumbnail">
                                 <a href="#" class="btn btn-danger mt-2"><label for="modal_search_` + i + `">Read Full Story</label></a>
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
                              <img src="` + data.response.results[i].fields.thumbnail + `" height="300" width="500" alt="search thumbnail">
                              <div class="modal-content">` + data.response.results[i].fields.body + `</div>
                           </div>
                     </div>
                     `);
               }
            }
         },
         //------------------------------------------------------ OFFLINE ------------------------------------------//
         //**
         // 1 - If the API call fails then check if the search input exists by searching local storage.
         // 2 - Parse the results of the search value from local storage into a JSON file and the render HTML.
         //**
      }).fail(function (jqXHR, textStatus, errorThrown) {
         if ($(".loadSearchResults").html(""),
            $(".searchContainer").show(),
            $("html, body").animate({
               scrollTop: $(".searchContainer").offset().top - 10
            }, 2000),
            window.localStorage.getItem("search" + searchInput)
         ) {
            searchResults = window.localStorage.getItem("search" + searchInput);
            results = JSON.parse(searchResults);
            for (var o = 0; o < results.length; o++) {
               var first = "";
               if (o % 3 == 0) {
                  first = "first";
               }
               var response = results[o];
               $(".loadSearchResults").append(`
                  <div class="col mb-4">
                        <div class="card h-100">
                           <h5 class="card-header">` + response.sectionName + `</h5>
                           <div class="card-body">
                              <h5 class="card-title">` + response.fields.headline + `</h5>
                              <img src="` + response.fields.thumbnail + `" class="card-img-top" height="170" width="280" alt="search thumbnail">
                              <a href="#" class="btn btn-danger mt-2"><label for="modal_search_` + o + `">Read Full Story</label></a>
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
                           <img src="` + response.fields.thumbnail + `" height="300" width="500" alt="search thumbnail">
                           <div class="modal-content">` + response.fields.body + `</div>
                        </div>
                  </div>
                  `);
            }
            $(".searchContainer").show();
         } else {
            console.log("no results");
            $(".loadSearchResults").html("No data found against this search.");
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

$("#close-search").click(function () {
   $(".searchContainer").slideUp(2000);
});

//---------------------------------------------------- Driver.js Walkthrough Scripting -----------------------------------------------------------------//
//**
// This code below is the JS for driver.js helper tool to identify what is said at each part of the walkthrough
// The tool is being instructed to highlight each section by the id or class name, then renders the information in a popover
//  https://github.com/kamranahmedse/driver.js
//**

$("#help").click(function () {
   // Start the introduction
   driver.start();
});

// Initiate step by step guide using the id 
const driver = new Driver();
driver.defineSteps([
   {
      element: '#help',
      popover: {
         className: 'first-step-popover-class',
         title: 'Take a guided tour',
         description: 'Learn how to use search and find useful information',
         position: 'left'
      }
   },
   {
      element: '#search',
      popover: {
         title: 'Search',
         description: 'Enter a term and click the search icon and view the articles',
         position: 'bottom'
      }
   },
   {
      element: '#politics',
      popover: {
         title: 'Specific news sections',
         description: 'Click any section and view the results of the section',
         position: 'bottom'
      }
   },
   {
      element: '#popular',
      popover: {
         title: 'See what the most popular news is?',
         description: 'View the stories on the popular news',
         position: 'left'
      }
   },
   {
      element: '#weather-title',
      popover: {
         title: 'The weather',
         description: 'Find out the weather where you are',
         position: 'top'
      }
   },
]);