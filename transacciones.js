cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("txtCantidad");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    let cuentaEncontrada = null;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta === numeroCuenta) {
            cuentaEncontrada = cuentas[i];
            break;
        }
    }
    return cuentaEncontrada;
}

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    numCuenta = recuperarTexto("txtCuenta");
    let cuenta = buscarCuenta(numCuenta);
    if(cuenta == null){
        alert("No existe la cuenta");
    }else{
        mostrarTexto("Datos","Numero de Cuenta: " + cuenta.numeroCuenta + "\n" +
        "Cedula: " + cuenta.cedula + "\n" +
        "Nombre: " + cuenta.nombre + "\n" +
        "Apellido: " + cuenta.apellido + "\n" +
        "Saldo: " + cuenta.saldo); 
        mostrarComponente("txtCantidad");
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
    }
}



ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    numCuenta = recuperarTexto("txtCuenta");
    monto = recuperarFloat("txtCantidad");
    let cuenta = buscarCuenta(numCuenta);
    depositar(numCuenta,monto);
    alert("TRANSACCION EXITOSA");
    mostrarTexto("Datos","Numero de Cuenta: " + cuenta.numeroCuenta + "\n" +
        "Cedula: " + cuenta.cedula + "\n" +
        "Nombre: " + cuenta.nombre + "\n" +
        "Apellido: " + cuenta.apellido + "\n" +
        "Saldo: " + cuenta.saldo); 
        
}

ejecutarRetiro=function(){    
    numCuenta = recuperarTexto("txtCuenta");
    monto = recuperarFloat("txtCantidad");    
    retirar(numCuenta,monto);
}

depositar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada = buscarCuenta(numeroCuenta);    
    cuentaAfectada.saldo += monto;
}

retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
    cuentaAfectada = buscarCuenta(numeroCuenta);
    if(cuentaAfectada.saldo >= monto){
        cuentaAfectada.saldo -= monto;
        alert("TRANSACCION EXITOSA");
        mostrarTexto("Datos","Numero de Cuenta: " + cuentaAfectada.numeroCuenta + "\n" +
        "Cedula: " + cuentaAfectada.cedula + "\n" +
        "Nombre: " + cuentaAfectada.nombre + "\n" +
        "Apellido: " + cuentaAfectada.apellido + "\n" +
        "Saldo: " + cuentaAfectada.saldo); 

    }else{
        alert("SALDO INSUFICIENTE");
    }
}