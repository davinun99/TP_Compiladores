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
    const printMat = mat =>{
        let toPrint = '';
        for( let i = 0; i < mat.length; i++ ){
            for( let j = 0; j < mat[j].length; j++ ){
                const el = mat[i][j];
                if(el)
                    toPrint = `${toPrint}\t${el}`;
                else
                    toPrint = `${toPrint}\t_`;
            }
            toPrint = `${toPrint}\n`;
        }
        console.log(toPrint);
    }
    const START = "__START__";
    const END = "__END__";
    const alphabetA = "baaa";
    const alphabet = Array.from(
        new Set(
            alphabetA.split('').sort()
        )
    ).join('');
    console.log('Alphabet: ' + alphabet);
    let mat = [[]];
    mat[0] = new Array(alphabet.length);
    const input = "abba";
    let currentIndexMatrix = 0;
    for( let i = 0; i < input.length; i++ ){
        const car = input[i]; //character
        const colN = alphabet.indexOf(car);//what position of the alphabet is the carac
        if( colN !== -1){
            mat[currentIndexMatrix][colN] = currentIndexMatrix + 1;
            currentIndexMatrix++;
            if( i != input.length - 1 )
                mat[currentIndexMatrix] = new Array(alphabet.length);
        }else if ( car === '|' ){
            
        }
        
    }
    printMat(mat);
})()