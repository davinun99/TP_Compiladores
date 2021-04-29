import Thompson from './Thompson.js';
import AFDConvertion from './AFDConvertion.js';
import AFDMinimization from './AFDMinimization.js';
import {printMat} from './printing.js';
export default function AFNJoining(alphabet, definitions){
    let joinedAfn = [
        new Array(alphabet.length + 1)
    ];
    let initialState = 1;
    let finalPointers = [];
    let initialPointers = [];
    for(const definition of definitions){
        initialPointers.push(initialState);
        const afn = Thompson(alphabet, definition.regex, initialState);
        finalPointers.push(initialState+afn.length);
        const lastState = new Array(alphabet.length+1);//New array that will point to the real last state
        afn.push(lastState);
        joinedAfn = joinedAfn.concat(afn);
        initialState = joinedAfn.length;
    }
    const lastState = joinedAfn.length;
    for (let i = 0; i < finalPointers.length; i++) {
        joinedAfn[finalPointers[i]][alphabet.length] = [lastState];
    }
    joinedAfn[0][alphabet.length] = initialPointers;
    return joinedAfn;
}