import Thompson from './utils/Thompson.js';
import AFDConvertion from './utils/AFDConvertion.js';
//document.getElementById('regexInputButton').addEventListener('click', hola);

(() => {
    const input = "(ab)*b"; //Test input
    const alphabetA = "baaa"; //Test alphabet
    const printMat = mat =>{// This just print the matrix
        let toPrint = '';
        for( let i = 0; i < mat.length; i++ ){
            toPrint = `${toPrint} State ${i+1}:\t`;
            for( let j = 0; j < mat[i].length; j++ ){
                const el = mat[i][j];
                if(el)
                    toPrint = `${toPrint}\t${el}`;
                else
                    toPrint = `${toPrint}\t_`;
            }
            toPrint = `${toPrint}\n`;
        }
        toPrint = `${toPrint} State ${mat.length+1}:\t\t  FINAL`;
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
    AFDConvertion(alphabet,mt);
    document.getElementById('result').innerHTML = result;
})()