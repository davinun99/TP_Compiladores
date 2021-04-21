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
            for( let j = 0; j < mat[i].length; j++ ){
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
    const alphabetA = "baaa";
    const alphabet = Array.from(
        new Set(
            alphabetA.split('').sort()
        )
    ).join('');
    console.log('Alphabet: ' + alphabet);
    let mat = [[]];
    mat[0] = new Array(alphabet.length);
    const input = "ab*";
    
    const recursiveGetMatrix = (regex, currStateNumber) => {
        const orPos = regex.indexOf('|');
        const cleanPos = regex.indexOf('*');
        if(orPos !== -1){

        }else if(cleanPos !== -1){
            const sMat = recursiveGetMatrix( regex.substring(0, cleanPos), currStateNumber + 1);//load the matrix with the nexts states
            const statesQuant = sMat.length;
            let lastStateNumber = statesQuant + currStateNumber;
            sMat[statesQuant-1][alphabet.length].push(lastStateNumber+1);//The end of s has to point to the new end
            sMat[statesQuant-1][alphabet.length].push(currStateNumber+1);//The end of s has to the start of s
            
            let newState = new Array(alphabet.length + 1);//create new state that will point to s
            console.log(newState);
            newState[alphabet.length] = [currStateNumber + 1, lastStateNumber+1];//The start has to point to the end
            console.log(newState);
            return [newState].concat(sMat);
        }else if(regex.length === 1){
            let currRow = new Array(alphabet.length + 1);
            currRow[alphabet.length] = [];
            const colN = alphabet.indexOf(regex);
            currRow[colN] = currStateNumber + 1;
            return [currRow];
        }else if(regex.length > 1){
            return recursiveGetMatrix(regex[0], currStateNumber).concat(
                recursiveGetMatrix(regex.substring(1), currStateNumber+1)
            );
        }
    }
    printMat(recursiveGetMatrix(input, 0));
})()