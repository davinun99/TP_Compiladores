import Thompson from './Thompson.js';
import AFDConvertion from './AFDConvertion.js';
import AFDMinimization from './AFDMinimization.js';
import {printMat} from './printing.js';
export default function AFNJoining(alphabet, definitions){
    let joinedAfn = [];
    let initialState = 0;
    for( const definition of definitions){
        const afn = Thompson(alphabet, definition.regex, initialState);
        printMat(afn);
        joinedAfn = joinedAfn.concat(afn);
        initialState = afn.length + 1;
    }
    printMat(joinedAfn);
}