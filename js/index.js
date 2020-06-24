"use strict";

mapboxgl.accessToken = mapboxToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-98.4916, 29.4252],
    zoom: 10
});

var lat = 29.424;
var long = -98.4936;

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false
}));


var marker = new mapboxgl.Marker({
    draggable: true,
    color: "pink"
})
    .setLngLat([long, lat])
    .addTo(map);

map.on("moveend", function() {
    marker.setLngLat(map.getCenter());
    dragPoint();
});

function dragPoint() {
    var lngLat = marker.getLngLat();
    var newLat = lngLat.lng;
    var newLng = lngLat.lat;

    //
    // function GetFormattedDate(date) {
    //     var month = format(date .getMonth() + 1);
    //     var day = format(date .getDate());
    //     var year = format(date .getFullYear());
    //     return month + "/" + day + "/" + year;
    // }





    $.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + newLng + "," + newLat).done(function(data) {
        console.log(data);


        var weatherHTML = "";
        for(var i = 0; i <= 2; i++) {
            weatherHTML += '<div class="col-3 card m-4 text-center">';
            // weatherHTML += '<h1>' + GetFormattedDate(data.daily.data[i].time) + '</h1>';
            weatherHTML += '<h1>' + (data.daily.data[i].temperatureHigh).toFixed(0) + '&deg;|' +
                (data.daily.data[i].temperatureLow).toFixed(0) + '&deg;</h1>';
            weatherHTML += '<p><strong>' + data.daily.data[i].summary + ' </strong>' + '</p>';
            weatherHTML += '<p><strong>Humidity: </strong>' +
                (data.daily.data[i].humidity * 100).toFixed(0) + "%" + '</p>';
            weatherHTML += '<p><strong>Dew Point: </strong>' + (data.daily.data[i].dewPoint).toFixed(0) + '&deg;</p>';
            weatherHTML += '<p><strong>Chance of Rain: </strong>' + (((data.daily.data[i].precipProbability) * 100).toFixed(0)) + '%</p>';
            weatherHTML += '</div>';
        }

        $("#insertData").html(weatherHTML);
    });
}
marker.on('drag', dragPoint);
dragPoint();