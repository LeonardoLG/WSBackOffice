function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: {lat: -7.171757, lng: -78.478472}
    });
    var ubicaciones = [
        {"nombreGanado": "Ganado 1", "lat": -7.1727793, "lng": -78.47969, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.1729013, "lng": -78.47932, "zIndex": 5},
        {"nombreGanado": "Ganado 3", "lat": -7.1723533, "lng": -78.479905, "zIndex": 3},
        {"nombreGanado": "Ganado 4", "lat": -7.1727203, "lng": -78.478419, "zIndex": 2}];
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
        var flag = ubicaciones[i];
        var marker = new google.maps.Marker({
            position: {lat: flag.lat, lng: flag.lng},
            map: map,
            icon: image,
            shape: shape,
            title: flag.nombreGanado,
            zIndex: flag.zindex
        });
        if (flag.fecha !== undefined) {
            mostrarAlerta(flag.nombreGanado, flag.fecha);
        }
    }
}

function mostrarAlerta(ganadoAlerta, fechaAlerta) {
    var contenido = document.querySelector('#tab_alerta_real');
    contenido.innerHTML += `
    <tr>
        <th><img src="../resources/img/alert.png"/></th>                       
        <th>${ganadoAlerta}</th>                       
        <th>${fechaAlerta}</th>                       
    </tr>`
}

function actualizarUbicaciones() {
    $.ajax({
        url: "http://localhost:8090/WSCore/resources/service/obtenerUbicaciones"
    }).then(function (data) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            center: {lat: -7.171757, lng: -78.478472}
        });
        setUbicacion(map, data);
    });
}

function buscarAlertas() {
    var fechaBusqueda = document.getElementById("fechaBusqueda").value;
    $.ajax({
        url: "http://localhost:8090/WSCore/resources/service/listarAlertas?fecha=" + fechaBusqueda,
        dataType: 'json',
    }).then(function (data) {
        alert("exito: " + data);
        var contenido = document.querySelector('#tab_alertas');
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