
class DEstatesContainer{
    statesSet = [];
    constructor(){
        
    }
    hasSet(set){
        this.statesSet.forEach(states =>{
            states.forEach((state, index) =>{
                
            })
        })
        return false;
    }
    get(index){
        return this.statesSet[index];
    }
    add(set){
        this.statesSet = this.statesSet.concat(set);
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
    const dEstates = new DEstadosContainer( );
    let dEstatesCount = 0;
    const dTran = [[]];
    console.log(closeClosure(2, 'b'));
    return;
    while(true){ //while dEstates has unmarked states
        const tState = dEstates.get(dEstatesCount);
        dEstatesCount++;//mark T in dEstates
        for (let i = 0; i < alphabet.length; i++) {//for each symbol in alphabet
            const element = alphabet[i];
            const U = closeClosure();
            if(!dEstates.hasSet(U)){
                dEstates.add(U);
            }
            dTran[tState, element] = U;
        }
        
    }
};