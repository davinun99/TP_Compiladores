import { AFN, Estado, Transicion } from "./AFN.js";
/*
function conversionAFNaAFD(){
    //iniciar dEstados con cerradura(s0)
    dEstados =  cerradura(s0);
    while(hayEstado){
        marcar(T);
        for( simbolo in entrada){
            U = cerradura( mover(T,a) );
            if( !dEstados.contains(U) ){
                dEstados.push(U); //agregar U como estado sin marcar a Destados
            }
            Dtran[T,a] = U;
        }
    }
}
*/
function hola(){
    console.log('hola')
}
document.getElementById('regexInputButton').addEventListener('click', hola);

(() => {
    const regex = "(a|b)*abb";
    
    const estadoInicial = new Estado('s0');
    const afn = new AFN(estadoInicial);

    for( let i = 0; i < regex.length; i++ ){
        const car = regex[i];
        if("|()*+".contains(car)){
        }else{
            
        }
        console.log(regex[i]);
    }
    /*
    const estadoInicial = new Estado('s0');
    const afn = new AFN(estadoInicial);
    const estado1 = new Estado('s1');
    const estado7 = new Estado('s7');
    const estado1Tr1 = estadoInicial.crearTransicionSobreMi( estado1, '' );
    const estado1Tr2 = estadoInicial.crearTransicionSobreMi( estado7, '' );
    */
})()