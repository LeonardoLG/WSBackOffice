function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: {lat: -7.171757, lng: -78.478472}
    });

    var ubicaciones = [
        {"title": "Ganado 1", "lat": -7.1727793, "lng": -78.47969, "zIndex": 4},
        {"title": "Ganado 2", "lat": -7.1729013, "lng": -78.47932, "zIndex": 5},
        {"title": "Ganado 3", "lat": -7.1723533, "lng": -78.479905, "zIndex": 3},
        {"title": "Ganado 4", "lat": -7.1727203, "lng": -78.478419, "zIndex": 2}];
//    var ubicaciones = [
//        ['Ganado 1', -7.1727793, -78.47969, 4],
//        ['Ganado 2', -7.1729013, -78.47932, 5],
//        ['Ganado 3', -7.1723533, -78.479905, 3],
//        ['Ganado 4', -7.1727203, -78.478419, 2]
//    ];

    setUbicacion(map, ubicaciones);
}

function setUbicacion(map, ubicaciones) {
    var image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };

    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    for (var i = 0; i < ubicaciones.length; i++) {
        var beach = ubicaciones[i];
        var marker = new google.maps.Marker({
            position: {lat: beach.lat, lng: beach.lng},
            map: map,
            icon: image,
            shape: shape,
            title: beach.title,
            zIndex: beach.zindex
        });
    }
}

function actualizar() {
    actualizarUbicaciones();
    actualizarAlertas();
}

function actualizarUbicaciones() {
    $.ajax({
        url: "http://192.168.1.40:8090/WSCore/resources/service/ubicaciones"
    }).then(function (data) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            center: {lat: -7.171757, lng: -78.478472}
        });
        setUbicacion(map, data);
    });
}

function actualizarAlertas() {
    var contenido = document.querySelector('#tab_alerta');
    $.ajax({
        url: "http://192.168.1.40:8090/WSCore/resources/service/alertas"
    }).then(function (data) {
        llenarTabla(data, contenido);
    });
}

function llenarTabla(data, contenido) {
    contenido.innerHTML = '';
    for (let item of data) {
        contenido.innerHTML += `
        <tr>
            <th>${item.nombreGanado}</th>                       
            <th>${item.fechaAlerta}</th>                       
        </tr>`
    }
}