import Thompson from './utils/Thompson.js';
import AFDConvertion from './utils/AFDConvertion.js';
import AFDMinimization from './utils/AFDMinimization.js';
import Simulation from './utils/Simulation.js';
import AFNJoining from './utils/AFNJoining.js';
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
const generateAFD = ()=>{
    const definitions = []
    const textArea = document.getElementById('lexycalDefinition').value;
    const alphaInput = document.getElementById('alphabet').value;
    const definitionLines = textArea.split('\n');
    definitionLines.forEach(line => {
        const definition = line.split('->');
        definitions.push({
            "name":definition[0],
            "regex":definition[1],
        })
    });
    /***/
    alphabet = getAlphabet(alphaInput);
    printAlphabet(alphabet);    
    const joinedAFN = AFNJoining(alphabet, definitions );
    const bigAFD = AFDConvertion(alphabet, joinedAFN);
    const minimizatedAFD = AFDMinimization(alphabet, bigAFD);
    printMat(minimizatedAFD);
    afd = minimizatedAFD;
}
const simulate = () =>{
    const stringToSimulate = document.getElementById('stringInput').value;
    if(afd){
        const result = Simulation(afd, alphabet,stringToSimulate);
        document.getElementById("result").innerHTML = result;
    }
}
document.getElementById('regexInputButton').addEventListener('click', generateAFD);
document.getElementById('simulate').addEventListener('click', simulate);



const xd = () => {
    const input = "(a|b)*abb"; //Test input
    const alphabetA = "ab"; //Test alphabet
    const toSimulate = "abb"; //Test simulation

    
    console.log('Lexical: ' + input);
    console.log('TestInput: ' + toSimulate);
    console.log('Alphabet: ' + alphabet);
    const definitions = [
        {
            "name":"rexx",
            "regex":"(a|b)*abb"
        },
    ]
    printAlphabet(alphabet);
    const joinedAFN = AFNJoining(alphabet, definitions );
    const AFD = AFDConvertion(alphabet, joinedAFN);
    printMat(AFD);
    const minimizatedAFD = AFDMinimization(alphabet, AFD);
    printMat(minimizatedAFD);
    Simulation(minimizatedAFD, alphabet,toSimulate);
    document.getElementById('result').innerHTML = result;
};