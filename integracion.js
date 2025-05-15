cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/
cargaInicial = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    resetCuentas();
}

cargarTransacciones = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("txtCantidad");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    resetTransacciones();
}

cargarMovimientos = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
}

resetTransacciones = function () {
    mostrarTextoEnCaja("txtCuentaT", "");
    mostrarTexto("Datos", "");
}

resetCuentas = function () {
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtCuenta", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTexto("inferior", "");
}
//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos

// Cuentas.js
mostrarCuentas = function () {
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
    let cmpTabla = document.getElementById("inferior");
    let contenidoTabla = "<table><tr>" +
        "<th>NUMERO CUENTA</th>" +
        "<th>NOMBRE</th>" +
        "<th>SALDO</th>" +
        "</tr>"
    let elementoCuentas;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuentas = cuentas[i];
        contenidoTabla += "<tr>" +
            "<td>" + elementoCuentas.numeroCuenta + "</td>" +
            "<td>" + elementoCuentas.nombre + " " + elementoCuentas.apellido + "</td>" +
            "<td>" + elementoCuentas.saldo + "</td>" +
            "</tr>";
    }
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let cuentaEncontrada = null;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            cuentaEncontrada = cuentas[i];
            break;
        }
    }
    return cuentaEncontrada;
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta = function (cuenta) {
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
    cuentaExiste = buscarCuenta(cuenta.numeroCuenta);
    if (cuentaExiste != null) {
        alert("CUENTA EXISTENTE");
    } else {
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA");
    }
}

agregar = function () {
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas
    let cedula = recuperarTexto("txtCedula");
    let numeroCuenta = recuperarTexto("txtCuenta");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");
    let saldo = 0;
    let cuenta = [];
    cuenta.numeroCuenta = numeroCuenta;
    cuenta.cedula = cedula;
    cuenta.nombre = nombre;
    cuenta.apellido = apellido;
    cuenta.saldo = saldo;
    agregarCuenta(cuenta);
    mostrarCuentas();
}
//--------------------------------------------------

// Transacciones.js

//--------------------------------------------------

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
/*buscarCuenta=function(numeroCuenta){
    let cuentaEncontrada = null;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta === numeroCuenta) {
            cuentaEncontrada = cuentas[i];
            break;
        }
    }
    return cuentaEncontrada;
}*/

ejecutarBusqueda = function () {
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert

    let numCuenta = recuperarTexto("txtCuentaT");
    let cuenta = buscarCuenta(numCuenta);
    if (cuenta == null) {
        alert("No existe la cuenta");
    } else {
        mostrarTexto("Datos", "Numero de Cuenta: " + cuenta.numeroCuenta + "\n" +
            "Cedula: " + cuenta.cedula + "\n" +
            "Nombre: " + cuenta.nombre + "\n" +
            "Apellido: " + cuenta.apellido + "\n" +
            "Saldo: " + cuenta.saldo);
        mostrarComponente("txtCantidad");
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
    }
}



ejecutarDeposito = function () {
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    numCuenta = recuperarTexto("txtCuentaT");
    monto = recuperarFloat("txtCantidad");
    let cuenta = buscarCuenta(numCuenta);
    depositar(numCuenta, monto);
    let movimiento = {};
    movimiento.numeroCuenta = numCuenta;
    movimiento.monto = monto;
    movimiento.tipo = "C";
    movimientos.push(movimiento);
    alert("TRANSACCION EXITOSA");
    mostrarTexto("Datos", "Numero de Cuenta: " + cuenta.numeroCuenta + "\n" +
        "Cedula: " + cuenta.cedula + "\n" +
        "Nombre: " + cuenta.nombre + "\n" +
        "Apellido: " + cuenta.apellido + "\n" +
        "Saldo: " + cuenta.saldo);

}

ejecutarRetiro = function () {
    numCuenta = recuperarTexto("txtCuentaT");
    monto = recuperarFloat("txtCantidad");
    retirar(numCuenta, monto);

}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada = buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo += monto;
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
    cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada.saldo >= monto) {
        cuentaAfectada.saldo -= monto;
        alert("TRANSACCION EXITOSA");
        mostrarTexto("Datos", "Numero de Cuenta: " + cuentaAfectada.numeroCuenta + "\n" +
            "Cedula: " + cuentaAfectada.cedula + "\n" +
            "Nombre: " + cuentaAfectada.nombre + "\n" +
            "Apellido: " + cuentaAfectada.apellido + "\n" +
            "Saldo: " + cuentaAfectada.saldo);
        let movimiento = {};
        movimiento.numeroCuenta = numCuenta;
        movimiento.monto = monto;
        movimiento.tipo = "D";
        movimientos.push(movimiento);

    } else {
        alert("SALDO INSUFICIENTE");
    }
}

//-----------------------------------

// Movimientos.js

//-----------------------------------

ejecutarFiltro = function () {
    let elemento = recuperarTexto("txtMovimiento");
    filtrarMovimientos(elemento);
    mostrarTextoEnCaja("txtMovimiento","");
}

filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];
    //Se barre el arreglo de movimientos
    for (let i = 0; i < movimientos.length; i++) {
        //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
        //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
        //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
        if (numeroCuenta == movimientos[i].numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    mostrarMovimientos(movimientosCuenta);
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos = function (misMovimientos) {
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    let elemento = document.getElementById("tablaMovimientos");
    let estructuraTabla = "<table><tr>" +
        "<th>NUMERO CUENTA</th>" +
        "<th>MONTO</th>" +
        "<th>TIPO</th></tr>";
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
    for (let i = 0; i < misMovimientos.length; i++) {
        movimiento = misMovimientos[i];
        estructuraTabla += "<tr><td>" + movimiento.numeroCuenta + "</td>";
        if (movimiento.tipo == "D") {
            estructuraTabla += "<td>" + ((movimiento.monto) * -1) + "</td>";
        } else {
            estructuraTabla += "<td>" + movimiento.monto + "</td>";
        }
        estructuraTabla += "<td>" + movimiento.tipo + "</td></tr>";
    }
    estructuraTabla += "</table>";
    elemento.innerHTML = estructuraTabla;

}
