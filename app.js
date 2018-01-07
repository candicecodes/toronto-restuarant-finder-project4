//when user clicks on cuisine type, place <li>s on page listing name of restaurant and address
//automatically scroll down to list of restaurants on user click

//zomato api key: 17f0ebc79e72adffa693336d34691596

const app = {};

app.getCuisines = function() {
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=89',
        method: 'GET',
        dataType: 'json',
        data: {
            city_id: 89
        },
        headers: {
            'user-key': '17f0ebc79e72adffa693336d34691596'
        }
    }).then(function (res) {
        // console.log('res', res);
        app.displayCuisines(res.cuisines);
    });
};

app.getRestaurants = function(cuisineType) {
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search',
        method: 'GET',
        dataType: 'json',
        data: {
            entity_id: 89,
            entity_type: 'city',
            cuisines: cuisineType
        },
        headers: {
            'user-key': '17f0ebc79e72adffa693336d34691596'
        }
    }).then(function (res) {
        console.log(res.restaurants);
        app.displayRestaurants(res.restaurants);
    });
};


app.displayCuisines = function(cuisinesArray) {
    // for each of the results in array 
    // create an option for each cusine and put it in select
    cuisinesArray.forEach(function(cuisine) {
        // console.log(cuisine.cuisine);
        $('#cuisines').append(`<option value="${cuisine.cuisine.cuisine_id}"> ${cuisine.cuisine.cuisine_name}  </option>`);
    });
    // console.log(cuisinesArray);
}

app.displayRestaurants = function(restaurantArray) {
    $('.rest').empty(); 
    // console.log(restaurantArray);
    restaurantArray.forEach(function(restaurant) {
        // console.log(restaurant.restaurant.name);
        console.log(restaurant.restaurant.location.address);
        // $('.rest').append('<li>' + restaurant.restaurant.name + '</option>');
        $('.rest').append('<li class="cell">' + '<h3>' + restaurant.restaurant.name + '</h3>' + '<p>' + restaurant.restaurant.location.address + '</p>' + '</li>');
    });
}

app.events = () => {
    $('#cuisines').on('change', function() {
        const cuisineId = $(this).val();
        // console.log(cuisineId);
        app.getRestaurants(cuisineId);
    });
};



app.init = () => {
    app.getCuisines();
    
    app.events();
};

//document ready
$(app.init);

//getAddress for restaurants displayed
//print addresses to screen
//somehow use these addresses to populate on a google map? 