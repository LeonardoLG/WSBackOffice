function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        center: {lat: -7.162959, lng: -78.472325}
    });    
}

function setUbicacion(map, ubicaciones) {
    var image = {
        url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(32, 32),
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
        if (flag.fechaAlerta !== null) {
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
            center: {lat: -7.162959, lng: -78.472325}
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
        center: {lat: -7.162959, lng: -78.472325}
    });
     var ganado = document.getElementById("traza_ganado").value;
    $.ajax({
        url: "http://localhost:8090/WSCore/resources/service/listarCaminoGanado?ganado=" + ganado,
        dataType: 'json'
    }).then(function (trazado) {
        setUbicacionTrazado(map, trazado);
    });
}

function llenarTabla(data, contenido) {
    contenido.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var registro_alerta = data[i];
        contenido.innerHTML += `
        <tr>
            <th>${registro_alerta.nombreGanado}</th>                       
            <th>${registro_alerta.fechaAlerta}</th>
            <th><a href='https://maps.google.com/?q=${registro_alerta.lat},${registro_alerta.lon}&z=24&t=h'>Ver en Google Maps</a></th>
        </tr>`
    }
}

function setUbicacionTrazado(map, ubicaciones) {
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    for (var i = 0; i < ubicaciones.length; i++) {
        var flag = ubicaciones[i];
        var marker = new google.maps.Marker({
            position: {lat: flag.lat, lng: flag.lng},
            map: map,
            icon: obtenerImagenGPS(i, ubicaciones.length),
            shape: shape,
            title: flag.nombreGanado,
            zIndex: flag.zindex
        });
    }
}
function obtenerImagenGPS(nroUbicacion, totalUbicaciones) {
    //posicion inicial
    if (nroUbicacion == 0) {
        var image = {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };
    } else if (nroUbicacion == totalUbicaciones - 1) {
        var image = {
            //posicion final
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };
    } else {
        var image = {
            url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };
    }
    return image;
}