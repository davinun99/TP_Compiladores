import Thompson from './utils/Thompson.js';
import AFDConvertion from './utils/AFDConvertion.js';
import AFDMinimization from './utils/AFDMinimization.js';
import Simulation from './utils/Simulation.js';
import AFNJoining from './utils/AFNJoining.js';
import {printMat, printAlphabet} from './utils/printing.js';

//document.getElementById('regexInputButton').addEventListener('click', hola);

(() => {
    const input = "(a|b)*abb"; //Test input
    const alphabetA = "12+-"; //Test alphabet
    const toSimulate = "abba"; //Test simulation

    const alphabet = Array.from(
        new Set(
            alphabetA.split('').sort()
        )
    ).join('');//Extract the unique characters and sort them
    console.log('Lexical: ' + input);
    console.log('TestInput: ' + toSimulate);
    console.log('Alphabet: ' + alphabet);
    const definitions = [
        {   
            "name":"number",
            "regex":"12"
        },
        {
            "name":"operator",
            "regex":"+|-"
        },
    ]
    const finalTable = [];
    printAlphabet(alphabet);
    const joinedAFN = AFNJoining(alphabet, definitions );
    printMat(joinedAFN);
    const AFD = AFDConvertion(alphabet, joinedAFN);
    printMat(AFD);
    const minimizatedAFD = AFDMinimization(alphabet, AFD);
    
    //Simulation(tTable, alphabet,toSimulate);
    document.getElementById('result').innerHTML = result;
})()