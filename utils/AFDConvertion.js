
class DEstatesContainer{
    statesSet = [];
    constructor(initialStateSet){
        this.statesSet.push(initialStateSet);
    }
    hasSet(set){
        for(const states of this.statesSet) {
            let flagHasStates = true;
            for (const state of set) {
                //if(states.length > 0)
                
                flagHasStates = flagHasStates && states.includes(state)
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
    
    const move = (stateNumber, character) => {
        const indexOfChar = alphabet.indexOf(character);
        if(matrix.length === stateNumber){
            return [];
        }else if(character === ''){//IF VACIO CHARACTER
            const lastIndex = matrix[stateNumber].length -1;//VACIOS ARE SAVED IN THE LAST INDEX OF THE ROW
            if(matrix[stateNumber][lastIndex] && matrix[stateNumber][lastIndex].length){ //IF THE LAST INDEX OF THE ROW IS NOT EMPTY
                let nextStates = [];//VECTOR TO LOAD NEXT STATES TO VISIT
                matrix[stateNumber][lastIndex].forEach(state => {//FOR EACH STATE PENDING OF VISIT
                    nextStates = nextStates.concat(move(state, character));//LOAD THE NEXT STATES TO VISIT
                });
                return matrix[stateNumber][lastIndex].concat(nextStates).sort(); //RETURN ALL THE STATES TO VISIT OF THIS ROW + THE STATES VISITED ABOVE
            }else{
                return [];//IF NO STATES TO VISIT RETURN []
            }
        }else if(indexOfChar !== -1){//IF ALPHABET CHARACTER
            const nextStates = matrix[stateNumber][indexOfChar];
            if(nextStates){
                return [nextStates].concat(move(nextStates, character)).sort();//return the state + the next states possibles
            }else{
                return [];
            }
        }
    }
    const arrayClosure = (array, character) =>{
        let result = [];
        array.forEach(element => {
            result = result.concat( closeClosure(element, character) );
        });
        result = result.concat(array);
        result.sort();
        return result;
    }
    //Initialize DEstates
    const initialStates = move(0, '');
    const dEstates = new DEstatesContainer(initialStates);
    let dEstatesIndex = 0;
    const dTran = [[]];
    while(dEstatesIndex < dEstates.length){ //while dEstates has unmarked states
        const tState = dEstates.get(dEstatesIndex);
        dEstatesIndex++;//mark T in dEstates
        for (const symbol of alphabet) {//for each symbol in alphabet
            const U = arrayClosure(tState, symbol);//Implement closeClosure of an array
            if(!dEstates.hasSet(U)){//If u is not in dEstates already add it
                dEstates.add(U);
            }
            //dEstates.print()
            //dTran[tState, alphabet] = U;
        }
        
    }
    dEstates.print();
};