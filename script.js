
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