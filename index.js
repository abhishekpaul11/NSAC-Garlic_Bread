let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2,
    });
    var opt = {
        minZoom: 2
    };
    map.setOptions(opt);
    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "ab.csv",
            dataType: "text",
            success: function(data) {
                processData(data)
            },
            error: function(err) {
                console.log(err)
            }
        });
    });
}
setMarker = function(lat, lng) {
    lat = Number(lat)
    lng = Number(lng)
    const myLatLng = {
        lat: lat,
        lng: lng
    };
    var img = 'b.png'
    var icon = {
        url: img, // url
        scaledSize: new google.maps.Size(20, 20), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: icon
    });
}

processData = function(data) {
    data = data.split('\n')
    for (i = 1; i < data.length; i++) {
        setMarker(data[i].split(',')[0], data[i].split(',')[1])
    }
}