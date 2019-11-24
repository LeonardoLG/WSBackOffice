function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
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
        if (flag.fechaAlerta !== undefined) {
            mostrarAlerta(flag.nombreGanado, flag.fechaAlerta);
        }
    }
}

function mostrarAlerta(ganadoAlerta, fechaAlerta) {
    var contenido = document.querySelector('#tab_alerta_real');
    contenido.innerHTML += `
    <tr>
        <th><img class="lista_alerta" src="../resources/img/alert.png"/></th>                       
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
            streetViewControl: false,
            zoomControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            center: {lat: -7.171757, lng: -78.478472}
        });
        setUbicacion(map, data);
    });
}

function buscarAlertas() {
    var fechaBusqueda = document.getElementById("fecha_busqueda").value;
    //var fechaBusqueda = "aaa";
    $.ajax({
        url: "http://localhost:8090/WSCore/resources/service/listarAlertas?fecha=" + fechaBusqueda,
        dataType: 'json'
    }).then(function (alertas) {
        var contenido_alertas = document.querySelector('#alertas_listas');
        llenarTabla(alertas, contenido_alertas);
    });
}

function buscarTrazado() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        center: {lat: -7.171757, lng: -78.478472}
    });
    var ubicaciones1 = [
        {"nombreGanado": "Ganado 1", "lat": -7.172771, "lng": -78.480961, "zIndex": 5},
        {"nombreGanado": "Ganado 1", "lat": -7.172350, "lng": -78.481111, "zIndex": 5},
        {"nombreGanado": "Ganado 1", "lat": -7.172207, "lng": -78.481186, "zIndex": 5},
        {"nombreGanado": "Ganado 1", "lat": -7.172159, "lng": -78.481042, "zIndex": 5},
        {"nombreGanado": "Ganado 1", "lat": -7.172180, "lng": -78.480811, "zIndex": 5},
        {"nombreGanado": "Ganado 1", "lat": -7.172202, "lng": -78.480650, "zIndex": 5},
        {"nombreGanado": "Ganado 1", "lat": -7.172196, "lng": -78.480473, "zIndex": 5}];
    var ubicaciones2 = [
        {"nombreGanado": "Ganado 2", "lat": -7.172329, "lng": -78.47969, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172404, "lng": -78.479223, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172532, "lng": -78.479175, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172611, "lng": -78.479111, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172500, "lng": -78.478934, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172409, "lng": -78.478800, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172276, "lng": -78.478687, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172186, "lng": -78.478601, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.171898, "lng": -78.478403, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.171829, "lng": -78.478258, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.171749, "lng": -78.478161, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.171797, "lng": -78.478016, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172037, "lng": -78.478000, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172175, "lng": -78.477984, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172281, "lng": -78.477968, "zIndex": 4},
        {"nombreGanado": "Ganado 2", "lat": -7.172281, "lng": -78.477861, "zIndex": 4}];

    var ganado = document.getElementById("traza_ganado").value;
    if (ganado == "Ganado 1") {
        setUbicacion(map, ubicaciones1);
    } else {
        if (ganado == "Ganado 2") {
            setUbicacion(map, ubicaciones2);
        } else {
            setUbicacion(map, ubicaciones2);
        }
    }

}

function llenarTabla(data, contenido) {
    contenido.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var registro_alerta = data[i];
        contenido.innerHTML += `
        <tr>
            <th>${registro_alerta.nombreGanado}</th>                       
            <th>${registro_alerta.fechaAlerta}</th>                       
        </tr>`
    }
}