import Thompson from './Thompson.js';
export default function AFNJoining(alphabet, definitions){
    let joinedAfn = [
        new Array(alphabet.length + 1)
    ];
    let initialState = 1;
    let finalPointers = [];
    let initialPointers = [];
    for(let i=0; i<definitions.length; i++){
        const definition = definitions[i].lexeme;
        initialPointers.push(initialState);
        const afn = Thompson(alphabet, definition, initialState);
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