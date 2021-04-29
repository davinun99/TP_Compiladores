export default function AFDMinimization(alphabet, matrix){
    
    const getNoFinalStates = () => {
        return matrix.reduce( (result, curr, i) => (curr[alphabet.length] === 0 ? result.concat(i): result), []);
        return matrix.reduce(
            (result, _, i) =>  (i < matrix.length -1 ? result.concat(i) : result), [] 
        );
    }
    const getFinalStates = () => {
        return matrix.reduce( (result, curr, i) => (curr[alphabet.length] === 1 ? result.concat(i): result), []);
        return matrix.reduce(
            (result, _, i) =>  (i < matrix.length -1 ? result.concat(i) : result), [] 
        );
    }
    const PI = [
        getFinalStates(),
        getNoFinalStates()
    ];
    console.log(PI[0]);
    console.log(PI[1]);
    const getGroup = (PI, state) =>{
        for (let i = 0; i < PI.length; i++) {
            if(PI[i].includes(state)){
                return i;
            }
        }
    }
    let oldPILength = 0;
    while( oldPILength !== PI.length ){ //While PI change process all again
        oldPILength = PI.length; //oldPI checks if PI doesnt change
        for(let i = 0; i < PI.length; i++){//Go around every element of PI
            let stateToChange = null; //this saves the element that has to move out the array
            if( PI[i].length > 1){ //If the element is alone, just advance
                for( let j = 0; j < alphabet.length; j++ ){//Go around the characters of the alphabet
                    const firstState = PI[i][0];//The first state of the array 
                    const targetGroup = getGroup(PI, matrix[firstState][j]); //The group of PI that contains the value pointed by the firstState
                    for(let k = 1; k < PI[i].length; k++){//Go around the next values of this element of PI
                        const state = PI[i][k];//Holds the value of the state...
                        if( targetGroup !== getGroup( PI, matrix[state][j] ) ){//If the value pointed by the current state doesnt belong to the target group remove
                            //do the change
                            stateToChange = state;
                        }
                    }
                }
            }
            if(stateToChange){//If we have something to remove
                PI.push( //Remove the element from this element of PI and PUSH it again
                    PI[i].filter(state => state !== stateToChange) 
                );
                PI[i] = [stateToChange];//Replace the current index with an array composed by the removed element
            }
        }
    }
    //Now PI has the states possible, we should build the transition table:
    const transitionTable = [];
    for (const states of PI) {//Go around each element of PI
        const newRow = [];
        for (let i = 0; i < alphabet.length; i++) {//Go around the alphabet
            const firstState = states[0];//Get the first state of this element (We just need one because all the elements point to the same state)
            newRow.push( getGroup(PI, matrix[firstState][i] ) );//Push the group pointed by the first state
        }
        if(states.includes(0)){//The alphabet.length column has 1 if is an initial state
            newRow.push(1);
        }else{
            newRow.push(0);
        }
        let flag = 0;
        for (const state of getFinalStates()) {
            if(states.includes(state)){
                flag = 1;
                break; 
            }
        }
        newRow.push(flag);
        transitionTable.push(newRow);//Add the generated new row to the transition table
    }
    return transitionTable;
}