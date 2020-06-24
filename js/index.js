"use strict";


var mapboxToken = "pk.eyJ1IjoiamFzbWluZWFubnJpdmVyYSIsImEiOiJjazZ0dHhheWowMndlM21tdGl3anJqYW81In0.tKJmouaLKN8yxyceD5rIUw";
mapboxgl.accessToken = mapboxToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-46.6, -23.68],
    zoom: 10
});

var lat = -46.6;
var long = -23.68;

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false
}));


var marker = new mapboxgl.Marker({
    draggable: true,
    color: "orange"
})
    .setLngLat([long, lat])
    .addTo(map);

map.on("moveend", function() {
    marker.setLngLat(map.getCenter());
    dragPoint();
});

function dragPoint() {
    var lngLat = marker.getLngLat();
    var newLng = lngLat.lat;
    var newLat = lngLat.lng;



    let openWeatherToken = "f3846b0c841256675a19a50e484ca5ff";

        $.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + newLat + "&lon=" + newLng + "&exclude=hourly&appid=f3846b0c841256675a19a50e484ca5ff&units=imperial").done(function(data) {

        var weatherHTML = "";
        for(var i = 0; i <= 2; i++) {
            var forecast = data.daily[i];
            weatherHTML += '<div class="col-3 card shadow m-4 text-center">';
            weatherHTML += '<h1>' + (forecast.temp.max).toFixed(0) + '&deg;|' +
                (forecast.temp.min).toFixed(0) + '&deg;</h1>';
            weatherHTML += '<p><strong>' + forecast.weather[0].description + ' </strong>' + '</p>';
            weatherHTML += '<p><strong> UV Index: ' + (forecast.uvi).toFixed(0) + ' </strong>' + '</p>';
            weatherHTML += '<p><strong>Humidity: </strong>' +(forecast.humidity).toFixed(0) + "%" + '</p>';
            weatherHTML += '<p><strong>Dew Point: </strong>' + (forecast.dew_point).toFixed(0) + '&deg;</p>';
            weatherHTML += '</div>';
        }

        $("#insertData").html(weatherHTML);
    });
}
marker.on('drag', dragPoint);
dragPoint();