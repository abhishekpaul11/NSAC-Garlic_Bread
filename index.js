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
    var landcover = new google.maps.ImageMapType({
        getTileUrl: getTileUrl,
        name: "Landcover",
        alt: "National Land Cover Database 2016",
        minZoom: 0,
        maxZoom: 19,
        opacity: 1.0
    });
    map.overlayMapTypes.push(landcover);
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

var EXTENT = [-Math.PI * 6378137, Math.PI * 6378137];

function xyzToBounds(x, y, z) {
    var tileSize = (EXTENT[1] * 2) / Math.pow(2, z);
    var minx = EXTENT[0] + x * tileSize;
    var maxx = EXTENT[0] + (x + 1) * tileSize;
    // remember y origin starts at top
    var miny = EXTENT[1] - (y + 1) * tileSize;
    var maxy = EXTENT[1] - y * tileSize;
    return [minx, miny, maxx, maxy];
}

var getTileUrl = function(coordinates, zoom) {
    return (
        "https://www.mrlc.gov/geoserver/NLCD_Land_Cover/wms?" +
        "&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1" +
        "&LAYERS=mrlc_display%3ANLCD_2016_Land_Cover_L48" +
        "&FORMAT=image%2Fpng" +
        "&SRS=EPSG:3857&WIDTH=256&HEIGHT=256" +
        "&BBOX=" +
        xyzToBounds(coordinates.x, coordinates.y, zoom).join(",")
    );
};

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