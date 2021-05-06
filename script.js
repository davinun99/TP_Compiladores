import Thompson from './utils/Thompson.js';
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
let alphabet = '';
let afd = null;
let afDArray = [];
const generateAFDs = ()=>{
    const definitions = []
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
    const stringToSimulate = document.getElementById('stringInput').value;
    if(afDArray.length){
        let token = '';
        let i = 0;
        while( token === '' && i < afDArray.length){
            token = Simulation(afDArray[i].afd, alphabet,stringToSimulate) ? afDArray[i].token : '';
            i++;
        }
        document.getElementById("result").innerHTML = token === '' ? 'NAH': token;
    }
}
document.getElementById('regexInputButton').addEventListener('click', generateAFDs);
document.getElementById('simulate').addEventListener('click', simulateAll);