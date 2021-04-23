
class DEstadosContainer{
    estados = [];
    constructor(){
        
    }
    hasSet(set){
        return false;
    }
    get(index){
        return this.estados[index];
    }
    add(set){
        this.estados = this.estados.concat(set);
    }
}

export default function AFDConvertion(alphabet, matrix){
    
    const closeClosure = (stateNumber, character) => {
        if(matrix.length === stateNumber){
            return [];
        }else if(character === ''){//IF VACIO CHARACTER
            const lastIndex = matrix[stateNumber].length -1;
            if(matrix[stateNumber][lastIndex] && matrix[stateNumber][lastIndex].length){
                let nextStates = [];
                matrix[stateNumber][lastIndex].forEach(state => {
                    nextStates = nextStates.concat(closeClosure(state, character));
                });
                return matrix[stateNumber][lastIndex].concat(nextStates);
            }else{
                return [];
            }
        }
    }
    //Initialize DEstates
    const dEstates = new DEstadosContainer( );
    let dEstatesCount = 0;
    const dTran = [[]];
    console.log(closeClosure(0, ''));
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