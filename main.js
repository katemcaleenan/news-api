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

function searchData() {
    var e = $("#search").val();
    "" !== e
        ? $.ajax({
              type: "GET",
              dataType: "jsonp",
              cache: !1,
              url: "https://content.guardianapis.com/search?q=" + e + "&order-by=relevance&api-key=f2501b62-5dde-4bda-aaf2-3f824948fec8&show-fields=thumbnail,body,headline",
              success: function (t) {
                  if ((console.log("Your search has been made"), $(".searchContainer").show(), $("html, body").animate({ scrollTop: $(".searchContainer").offset().top - 10 }, 2e3), 0 == t.response.total))
                      $(".loadSearchResults").html("No results found against this search.");
                  else {
                      if (!window.localStorage.getItem("search" + e)) {
                          var n = JSON.stringify(t.response.results);
                          window.localStorage.setItem("search" + e, n);
                      }
                      $(".loadSearchResults").html("");
                      for (var i = 0; i < 9; i++) {
                          var o = "";
                          i % 3 == 0 && (o = "first");
                        //   var s = diff_minutes(new Date(t.response.results[i].webPublicationDate));
                          $(".loadSearchResults").append(
                              '<li class="one_third ' +
                                  o +
                                  '">\n                                                <figure>\n                                                    <div class="banner-title">' +
                                  t.response.results[i].sectionName +
                                  '</div>\n                                                    <img src="' +
                                  t.response.results[i].fields.thumbnail +
                                  '" alt="">\n                                                    <figcaption>\n                                                        <p>' +
                                  t.response.results[i].fields.headline +
                                  '</p>\n                                                        <p class="time-difference"><small><em>' +
                                //   s +
                                  '</em></small></p>\n                                                        <footer><label class="btn pointer"  for="modal_search_' +
                                  i +
                                  '">Read More</label></footer>\n                                                    </figcaption>\n                                                </figure>\n                                            </li>\n                                            <input class="checker" type="checkbox" id="modal_search_' +
                                  i +
                                  '">\n                                            <div class="modal">\n                                                <div class="modal-body">\n                                                    <label class="btn_close" for="modal_search_' +
                                  i +
                                  '">Close</label>\n                                                    <h6 class="heading">' +
                                  t.response.results[i].fields.headline +
                                  '</h6>\n                                                    <img src="' +
                                  t.response.results[i].fields.thumbnail +
                                  '" alt="">\n                                                    <div class="modal-content">' +
                                  t.response.results[i].fields.body +
                                  "</div>\n                                                </div>\n                                            </div>"
                          );
                      }
                  }
              },
          }).fail(function (t, n, i) {
              if (($(".loadSearchResults").html(""), $(".searchContainer").show(), $("html, body").animate({ scrollTop: $(".searchContainer").offset().top - 10 }, 2e3), window.localStorage.getItem("search" + e))) {
                  (resultss = window.localStorage.getItem("search" + e)), (results = JSON.parse(resultss));
                  for (var o = 0; o < results.length; o++) {
                      var s = "";
                      o % 3 == 0 && (s = "first");
                      var r = results[o];
                        //   a = diff_minutes(new Date(r.webPublicationDate));
                      $(".loadSearchResults").append(
                          '<li class="one_third ' +
                              s +
                              '">\n                            <figure>\n                                <div class="banner-title">' +
                              r.sectionName +
                              '</div>\n                                <img src="' +
                              r.fields.thumbnail +
                              '" alt="">\n                                <figcaption>\n                                    <p>' +
                              r.fields.headline +
                              '</p>\n                                    <p class="time-difference"><small><em>' +
                            //   a +
                              '</em></small></p>\n                                    <footer><label class="btn pointer"  for="modal_search_' +
                              o +
                              '">Read More</label></footer>\n                                </figcaption>\n                            </figure>\n                        </li>\n                        <input class="checker" type="checkbox" id="modal_search_' +
                              o +
                              '">\n                        <div class="modal">\n                            <div class="modal-body">\n                                <label class="btn_close" for="modal_search_' +
                              o +
                              '">Close</label>\n                                <h6 class="heading">' +
                              r.fields.headline +
                              '</h6>\n                                <img src="' +
                              r.fields.thumbnail +
                              '" alt="">\n                                <div class="modal-content">' +
                              r.fields.body +
                              "</div>\n                            </div>\n                        </div>"
                      );
                  }
                  $(".searchContainer").show();
              } else console.log("no results"), $(".loadSearchResults").html("No data found against this search.");
          })
        : ($(".searchContainer").hide(), $(".loadSearchResults").html(""));
}