import Thompson from './utils/Thompson.js';
import AFDConvertion from './utils/AFDConvertion.js';
import AFDMinimization from './utils/AFDMinimization.js';

//document.getElementById('regexInputButton').addEventListener('click', hola);

(() => {
    const input = "(a|b)*abb"; //Test input
    const alphabetA = "baaa"; //Test alphabet
    const printMat = mat =>{// This just print the matrix
        let toPrint = '';
        for( let i = 0; i < mat.length; i++ ){
            toPrint = `${toPrint} State ${i}:\t`;
            for( let j = 0; j < mat[i].length; j++ ){
                const el = mat[i][j];
                if(el)
                    toPrint = `${toPrint}\t${el}`;
                else
                    toPrint = `${toPrint}\t_`;
            }
            toPrint = `${toPrint}\n`;
        }
        toPrint = `${toPrint} State ${mat.length}:\t\t  FINAL`;
        console.log(toPrint);
    }
    const alphabet = Array.from(
        new Set(
            alphabetA.split('').sort()
        )
    ).join('');//Extract the unique characters and sort them
    console.log('Input: ' + input);
    console.log('Alphabet: ' + alphabet);
    const mt = Thompson(alphabet, input);
    printMat(mt);
    const dTran = AFDConvertion(alphabet,mt);
    printMat(dTran);
    AFDMinimization(alphabet, dTran);
    document.getElementById('result').innerHTML = result;
})()