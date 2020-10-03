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
function merc(){
    map.overlayMapTypes.clear();
    var date = document.getElementById('merc_date').value
    var getTileUrl = function (tile, zoom) {
        return '//gibs.earthdata.nasa.gov/wmts/epsg3857/best/' +
        'MODIS_Terra_Aerosol/default/'+date+'/'+
        'GoogleMapsCompatible_Level6/' +
        zoom + '/' + tile.y + '/' +
        tile.x + '.png';
    };
    var layerOptions = {
        alt: 'MODIS_Terra_Aerosol',
        getTileUrl: getTileUrl,
        maxZoom: 6,
        minZoom: 1,
        name: 'MODIS_Terra_Aerosol',
        tileSize: new google.maps.Size(256, 256),
        opacity: 0.5
    };
    var imageMapType = new google.maps.ImageMapType(layerOptions);
    map.overlayMapTypes.insertAt(0, imageMapType);
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
        //setMarker(data[i].split(',')[0], data[i].split(',')[1])
    }
}