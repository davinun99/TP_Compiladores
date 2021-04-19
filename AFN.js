class AFN{
    estadoInicial;
    constructor( estadoInicial ){
        this.estadoInicial = estadoInicial;
    }
}
class Estado{
    nombre;
    transiciones = [];
    esFinal = false;
    esInicial = false;
    constructor( nombre ){
        this.nombre = nombre;
    }
    agregarTransicion( transicion ){
        this.transiciones.push( transicion );
    }
    crearTransicionSobreMi( nodoFinal, simbolo ){
        return new Transicion( this, nodoFinal, simbolo);
    }
    setEsFinal( esFinal ){
        this.esFinal = esFinal;
    }
    setEsInicial( esInicial ){
        this.esInicial = esInicial;
    }
}
class Transicion{
    nodoInicial;
    nodoFinal;
    simbolo;
    constructor( nodoInicial, nodoFinal, simbolo ){
        this.nodoInicial = nodoInicial;
        this.nodoFinal = nodoFinal;
        this.simbolo = simbolo;
    }
}
export {AFN, Estado, Transicion};