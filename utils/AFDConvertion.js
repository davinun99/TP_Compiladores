
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
        
    }
    //Initialize DEstates
    const dEstates = new DEstadosContainer();
    let dEstatesCount = 0;
    const dTran = [[]];
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