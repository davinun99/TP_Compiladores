
class DEstatesContainer{
    statesSet = [];
    constructor(initialStateSet){
        this.statesSet.push(initialStateSet);
    }
    hasSet(set){
        
        for(const states of this.statesSet) {
            if(set.length !== states.length)
                continue;
            let flagHasStates = true;
            for (const state of set) {
                flagHasStates = flagHasStates && states.includes(state)
            }
            if(flagHasStates)
                return true;
        }
        return false;
    }
    getSetIndex(set){
        let indexToReturn = null;
        this.statesSet.forEach((states, index)=>{
            if(set.length !== states.length)
                return;
            let flagHasStates = true;
            for (const state of set) {
                flagHasStates = flagHasStates && states.includes(state)
            }
            if(flagHasStates)
                indexToReturn = index;
        });
        return indexToReturn;
    }
    get(index){
        return this.statesSet[index];
    }
    add(set){
        this.statesSet.push(set);
    }
    get length(){
        return this.statesSet.length;
    }
    print(){
        let toPrint = '';
        this.statesSet.forEach( (stateSet, index) => {
            toPrint = `${toPrint}{`;
            stateSet.forEach((state, index) => {
                if(index !== stateSet.length - 1)
                    toPrint = `${toPrint} ${state},`;
                else
                    toPrint = `${toPrint} ${state}`;
            })
            if(index !== this.statesSet.length - 1)
                toPrint = `${toPrint}}, `;
            else
                toPrint = `${toPrint}}`;
            
        })
        console.log(toPrint);
    }
}

export default function AFDConvertion(alphabet, matrix){
    const VACIO_COLUMN = alphabet.length;
    const move = (stateNumber, character) => {
        const indexOfChar = alphabet.indexOf(character);
        if(matrix.length === stateNumber){
            return [];
        }else if(character === ''){//IF VACIO CHARACTER
            if(matrix[stateNumber][VACIO_COLUMN] && matrix[stateNumber][VACIO_COLUMN].length){ //IF THE LAST INDEX OF THE ROW (vacio container)IS NOT EMPTY
                let nextStates = [];//VECTOR TO LOAD NEXT STATES TO VISIT
                matrix[stateNumber][VACIO_COLUMN].forEach(state => {//FOR EACH STATE PENDING OF VISIT
                    nextStates = nextStates.concat(move(state, character));//LOAD THE NEXT STATES TO VISIT
                });
                return matrix[stateNumber][VACIO_COLUMN].concat(nextStates).sort(); //RETURN ALL THE STATES TO VISIT OF THIS ROW + THE STATES VISITED ABOVE
            }else{
                return [];//IF NO STATES TO VISIT RETURN []
            }
        }else if(indexOfChar !== -1){//IF ALPHABET CHARACTER
            const nextStates = matrix[stateNumber][indexOfChar];
            if(nextStates){
                return [nextStates].sort();//return the next states possibles sorted
            }else{
                return [];
            }
        }
    }
    const arrayClosure = (array, character) =>{
        let result = [];
        array.forEach(element => {
            result = result.concat( move(element, character) );
        });
        if(character === '')
            result = result.concat(array);
        result.sort();
        return result;
    }
    //Initialize DEstates
    const initialStates = move(0, '');
    initialStates.unshift(0);
    const dEstates = new DEstatesContainer(initialStates);
    let dEstatesIndex = 0;
    let dTran = [];
    const T_STATE_INITIAL_LENGTH = alphabet.length;
    while(dEstatesIndex < dEstates.length){ //while dEstates has unmarked states
        const tState = dEstates.get(dEstatesIndex);
        
        dEstatesIndex++;//mark T in dEstates
        let newState = new Array(T_STATE_INITIAL_LENGTH); //generate a new state for dTrans
        for (const symbol of alphabet) {//for each symbol in alphabet
            let U = arrayClosure(tState, symbol);//Implement closeClosure of an array
            U = arrayClosure(U, '');//Do the vacio closure
            if(U.length){
                if(!dEstates.hasSet(U)){//If u is not in dEstates already add it
                    dEstates.add(U);
                }
                newState[alphabet.indexOf(symbol)] = dEstates.getSetIndex(U);//the new state moves to the U index with the current symbol.
            }else{
                newState[alphabet.indexOf(symbol)] = null;
            }
        }
        dTran.push(newState);
    }
    for (let i = 0; i < dTran.length; i++) {
        if(dEstates.get(i).includes(matrix.length)){//If includes final state
            dTran[i].push(1);
        }else{
            dTran[i].push(0);
        }
    }
    //dEstates.print();
    return dTran;
};