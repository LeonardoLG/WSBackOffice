
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: -7.171757, lng: -78.478472}
    });
    
    setMarkers1(map);
    //soap();
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var beaches = [
    ['Ganado 1', -7.1727793, -78.47969, 4],
    ['Ganado 2', -7.1729013, -78.47932, 5],
    ['Ganado 3', -7.1723533, -78.479905, 3],
    ['Ganado 4', -7.1727203, -78.478419, 2]
];

//var beaches = llamarWS();

function setMarkers1(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    for (var i = 0; i < beaches.length; i++) {
        var beach = beaches[i];
        var marker = new google.maps.Marker({
            position: {lat: beach[1], lng: beach[2]},
            map: map,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3]
        });
    }
}

function soap() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://lleon:8380/WSCore/serviciosGanado', true);

    // build SOAP request
    var sr =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soapenv:Envelope ' +
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            //           'xmlns:api="http://127.0.0.1/Integrics/Enswitch/API" ' +
            'xmlns:wsc="http://wscore.ws.lleon.com/" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '<soapenv:Body>' +
            '<wsc:obtenerUbicaciones/>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                //alert(xmlhttp.responseText);
                var xmlDoc = xmlhttp.responseXML;
                var ubicaciones = obtenerArrayNodosPorTag(xmlDoc, 'ubicacion');
                setMarkers2(map, ubicaciones)
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
}

function obtenerArrayNodosPorTag(nodoRaiz, nombreTag) {
    var arrayNodos = nodoRaiz.getElementsByTagName(nombreTag);
    return arrayNodos;
}

function setMarkers2(map, ubicaciones) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    for (var i = 0; i < ubicaciones.length; i++) {
        var beach = ubicaciones[i];
        var marker = new google.maps.Marker({
            position: {lat: parseFloat(obtenerArrayNodosPorTag(beach, 'lat')[0].textContent), lng: parseFloat(obtenerArrayNodosPorTag(beach, 'lng')[0].textContent)},
            map: map,
            icon: image,
            shape: shape,
            
            zIndex: parseFloat(obtenerArrayNodosPorTag(beach, 'zIndex')[0].textContent)
        });
    }
}