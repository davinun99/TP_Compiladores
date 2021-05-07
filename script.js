import Thompson from './utils/Thompson.js';
import AFNJoining from './utils/AFNJoining.js';
import AFDConvertion from './utils/AFDConvertion.js';
import AFDMinimization from './utils/AFDMinimization.js';
import Simulation from './utils/Simulation.js';
import {printMat, printAlphabet} from './utils/printing.js';
const getAlphabet = (letters) =>{
    const alphabet = Array.from(
        new Set(
            letters.split('').sort()
        )
    ).join('');//Extract the unique characters and sort them
    return alphabet;
}
let alphabet = '';//Alphabet sorted by string asc
let afDArray = []; //array of {token:'' afd:[]}
let symbolsTable = [];//array of {token:'', lexeme:''}
const definitions = [];

const generateAFDs = ()=>{
    const textArea = document.getElementById('lexycalDefinition').value;
    const alphaInput = document.getElementById('alphabet').value;
    const definitionLines = textArea.split('\n');
    definitionLines.forEach(line => {
        const definition = line.split('->');
        definitions.push({
            "token":definition[0],
            "lexeme":definition[1],
        })
    });
    /***/
    alphabet = getAlphabet(alphaInput);
    printAlphabet(alphabet);
    for(let i = 0; i < definitions.length; i++){
        const afn = Thompson(alphabet, definitions[i].lexeme, 0, definitions[i].token);//Generates the afn
        const bigAFD = AFDConvertion(alphabet, afn);//Convertion to afd
        const minimizatedAFD = AFDMinimization(alphabet, bigAFD);//Minimization
        afDArray[i] = {//Generates an object with the token and afd
            "token": definitions[i].token,
            "afd":minimizatedAFD
        };
    }
}
const simulateAll = ()=>{
    const textToSimulate = document.getElementById('stringInput').value;
    const arrayToSimulate = textToSimulate.split(' ');
    symbolsTable = [];
    arrayToSimulate.forEach(string =>{
        simulateOne(string);
    })
    showSymbolsTable();
    showTransitionTable();
}

const simulateOne = (stringToSimulate)=>{    
    if(afDArray.length){
        let afdUsed = -1;
        let i = 0;
        while( afdUsed === -1 && i < afDArray.length){
            if( Simulation(afDArray[i].afd, alphabet, stringToSimulate) ){
                symbolsTable.push({
                    token:  afDArray[i].token,
                    lexeme: stringToSimulate
                });
                afdUsed = i;
            }
            i++;
        }
        if(afdUsed === -1){
            console.error('Lexical error. Lexeme: ' + stringToSimulate);
        }
    }
}
const showSymbolsTable = () =>{
    const domTable = document.getElementById('symbolsTable');
    domTable.innerHTML = "<tr><th>Token</th><th>Lexeme</th></tr>" + symbolsTable.reduce( (acc, curr) => (`${acc}
        <tr>
            <td>${curr.token}</td>
            <td>${curr.lexeme}</td>
        </tr>`)
    , '' );
}
const generateTransitionTable = () => {
    if (alphabet && definitions.length) {
        const joinedAFN = AFNJoining(alphabet, definitions );
        const bigAFD = AFDConvertion(alphabet, joinedAFN);
        const minimizatedAFD = AFDMinimization(alphabet, bigAFD);
        return minimizatedAFD;    
    }
    return [];
}
const showTransitionTable = () => {
    const transitionTable = generateTransitionTable();
    const domTable = document.getElementById('transitionTable');
    const alphabetRow = '<tr><th></th>' + alphabet.split('').reduce((acc, curr)=>(`${acc}
        <th>${curr}</th>
    `),'') + '</tr>';
    let totalTable = '';
    for( let i = 0; i < transitionTable.length; i++ ){
        if( transitionTable[i][transitionTable[i].length - 2] ){//If its initial
            totalTable = `${totalTable}<tr style='background-color:#e5f993;'><td> State ${i}</td>`;
        }else if( transitionTable[i][transitionTable[i].length - 1] ){//If its final
            totalTable = `${totalTable}<tr style='background-color:#bf211e; color:white;'><td> State ${i}</td>`;
        }else{
            totalTable = `${totalTable}<tr><td> State ${i}</td>`;
        }
        
        for( let j = 0; j < transitionTable[i].length - 2; j++ ){
            const el = transitionTable[i][j];
            if(el===0 || el){
                totalTable = `${totalTable}<td>${el}</td>`;
            }else{
                totalTable = `${totalTable}<td></td>`;
            }
        }
        totalTable = `${totalTable}</tr>`;
    }
    domTable.innerHTML = alphabetRow + totalTable;
}
document.getElementById('regexInputButton').addEventListener('click', generateAFDs);
document.getElementById('simulate').addEventListener('click', simulateAll);