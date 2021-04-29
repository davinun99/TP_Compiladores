import Thompson from './utils/Thompson.js';
import AFDConvertion from './utils/AFDConvertion.js';
import AFDMinimization from './utils/AFDMinimization.js';
import Simulation from './utils/Simulation.js';
import AFNJoining from './utils/AFNJoining.js';
import {printMat, printAlphabet} from './utils/printing.js';

//document.getElementById('regexInputButton').addEventListener('click', hola);

(() => {
    const input = "(a|b)*abb"; //Test input
    const alphabetA = "ab"; //Test alphabet
    const toSimulate = "abb"; //Test simulation

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
            "name":"rexx",
            "regex":"(a|b)*abb"
        },
    ]
    const finalTable = [];
    printAlphabet(alphabet);
    const joinedAFN = AFNJoining(alphabet, definitions );
    const AFD = AFDConvertion(alphabet, joinedAFN);
    printMat(AFD);
    const minimizatedAFD = AFDMinimization(alphabet, AFD);
    printMat(minimizatedAFD);
    Simulation(minimizatedAFD, alphabet,toSimulate);
    document.getElementById('result').innerHTML = result;
})()