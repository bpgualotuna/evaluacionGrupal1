movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");

}
ejecutarFiltro=function(){
    let elemento=recuperarTexto("txtMovimiento");
    filtrarMovimientos(elemento);
    mostrarTextoEnCaja("txtMovimiento","");
}
filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    //Se barre el arreglo de movimientos
    for(let i=0;i<movimientos.length;i++){
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
        if(numeroCuenta==movimientos[i].numeroCuenta){
            movimientosCuenta.push(movimientos[i]);
        }
    }
    mostrarMovimientos(movimientosCuenta);
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    let elemento=document.getElementById("tablaMovimientos");
    let estructuraTabla="<table><tr>"+
    "<th>NUMERO CUENTA</th>"+
    "<th>MONTO</th>"+
    "<th>TIPO</th></tr>";
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
    for(let i=0;i<misMovimientos.length;i++){
        movimiento=misMovimientos[i];
        estructuraTabla+="<tr><td>"+movimiento.numeroCuenta+"</td>";
        if(movimiento.tipo=="D"){
         estructuraTabla+="<td>"+((movimiento.monto)*-1)+"</td>";
    }else{
         estructuraTabla+="<td>"+movimiento.monto+"</td>";
    }
    estructuraTabla+= "<td>"+movimiento.tipo+"</td></tr>";
    }
    estructuraTabla+="</table>";
    elemento.innerHTML=estructuraTabla;
    
}




