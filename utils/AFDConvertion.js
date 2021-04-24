
class DEstatesContainer{
    statesSet = [];
    constructor(initialStateSet){
        this.statesSet.push(initialStateSet);
    }
    hasSet(set){
        for(const states of this.statesSet) {
            let flagHasStates = true;
            for (const state of states) {
                flagHasStates = flagHasStates && set.includes(state)
            }
            if(flagHasStates)
                return true;
        }
        return false;
    }
    get(index){
        return this.statesSet[index];
    }
    add(set){
        this.statesSet = this.statesSet.concat(set);
    }
    get length(){
        return this.statesSet.length;
    }
}

export default function AFDConvertion(alphabet, matrix){
    
    const closeClosure = (stateNumber, character) => {
        const indexOfChar = alphabet.indexOf(character);
        if(matrix.length === stateNumber){
            return [];
        }else if(character === ''){//IF VACIO CHARACTER
            const lastIndex = matrix[stateNumber].length -1;//VACIOS ARE SAVED IN THE LAST INDEX OF THE ROW
            if(matrix[stateNumber][lastIndex] && matrix[stateNumber][lastIndex].length){ //IF THE LAST INDEX OF THE ROW IS NOT EMPTY
                let nextStates = [];//VECTOR TO LOAD NEXT STATES TO VISIT
                matrix[stateNumber][lastIndex].forEach(state => {//FOR EACH STATE PENDING OF VISIT
                    nextStates = nextStates.concat(closeClosure(state, character));//LOAD THE NEXT STATES TO VISIT
                });
                return matrix[stateNumber][lastIndex].concat(nextStates); //RETURN ALL THE STATES TO VISIT OF THIS ROW + THE STATES VISITED ABOVE
            }else{
                return [];//IF NO STATES TO VISIT RETURN []
            }
        }else if(indexOfChar !== -1){//IF ALPHABET CHARACTER
            const nextStates = matrix[stateNumber][indexOfChar];
            if(nextStates){
                return [nextStates].concat(closeClosure(nextStates, character));//return the state + the next states possibles
            }else{
                return [];
            }
        }
    }
    //Initialize DEstates
    const initialStates = closeClosure(0, '');
    const dEstates = new DEstatesContainer(initialStates);
    let dEstatesIndex = 0;
    const dTran = [[]];

    while(dEstatesIndex < dEstates.length){ //while dEstates has unmarked states
        const tState = dEstates.get(dEstatesIndex);
        dEstatesIndex++;//mark T in dEstates
        for (const symbol of alphabet) {//for each symbol in alphabet
            const U = closeClosure(tState, symbol);//Implement closeClosure of an array
            if(!dEstates.hasSet(U)){//If u is not in dEstates already add it
                dEstates.add(U);
            }
            dTran[tState, element] = U;
        }
        
    }
};