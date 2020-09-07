// Simple showdown of films by Studio Ghibli using the Fetch API method to get
// data from the server.
$(document).ready(function() {

  fetch('https://ghibliapi.herokuapp.com/films')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);

      for (var i = 0; i < data.length; i++) {
        var context = {
          title : data[i].title,
          director : data[i].director,
          producer : data[i].producer,
          description : data[i].description,
          releaseDate : data[i].release_date,
          linkCharacters : data[i].people,
          linkLocations : data[i].locations
        };
        var html = template(context);
        var container = document.getElementById('film-container');
        container.innerHTML += html;
      }
        var btn = $(".buttonShow");
        $(btn).click(function() {
          $(this).siblings(".description").toggleClass("hidden");
        });

        // Search function here
        $("#search_bar").keyup(function(){
          var textSearch = $("#search_bar").val().toLowerCase();
          $("h1").each(function() {
            var titleFilm = $(this).text().toLowerCase();
            if (titleFilm.includes(textSearch) == false ) {
              $(this).parent(".film-box").addClass("hidden");
            } else {
              $(this).parent(".film-box").removeClass("hidden")
            }
          })
        })
    })
    .catch((err) => {
      alert("error")
    })
});
