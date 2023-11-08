// connects to the yelp API developer database and allow the user to search and display results.
var APIURL =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&location=";
var APIKey =
  "5l4WtcZ_5IokoF9qEHja7vU8w-ZXdHqItNEoZUNQosMbWqp_BVjP6WlMm8rtGMd5A8aZBKTaAtAwQw5SA6luEh6l7cvf55Vp659M-5Rie9oE2RLD9estW9gJiOw4ZXYx"; // stores the API key for yelp API developer

// this method returns an Element object with Id
const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");
const prev = document.getElementById("Prev");
const next = document.getElementById("Next");
let pageNumber = 1;

// searches yelp API developer
// results from yelp API
window.addEventListener("load", function () {
  // param : query the search term
  const query = localStorage.getItem("query");
  if (query) {
    searchBox.value = query;
  }
});

class RestaurantFood {
  async search() {
    try {
      console.log(APIURL + searchBox.value);
      localStorage.setItem("query", searchBox.value);
      //look at the data inside the response and pull the response out, need to use await for the length long or not.
      const response = await axios.get(
        `${APIURL}${searchBox.value}&offset=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${APIKey}`,
          },
        }
      );
      cards.innerHTML = "";

      var catt = "";
      for (var item of response.data.businesses) {
        catt += `
        <div class= "col-4">
        <div class="card">
          <img class="card-img"
            src="${item.image_url}"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <div class="card-text">
              <p>
                ${item.location.display_address}
              </p>
              <p>${item.location.state}</p>
              <p>${item.rating}</p>
              <p>${item.phone}</p>
            </div>
          </div>
        </div>
        </div>
      `;
      }
      document.querySelector(".container-1").innerHTML = catt;
      errorMessage.style.display = "none";
    } catch (error) {
      console.log(error);
      errorMessage.style.display = "block";
    }
  }
}
let restaurant = new RestaurantFood();

//btn listen to an event and callback
prev.addEventListener("click", (event) => {
  pageNumber--;
  restaurant.search();
});

next.addEventListener("click", (event) => {
  pageNumber++;
  restaurant.search();
});

errorMessage.style.display = "none";

searchButton.addEventListener("click", restaurant.search);
