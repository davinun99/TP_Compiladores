export default function AFDMinimization(alphabet, matrix){
    
    const getNoFinalStates = () => {
        return matrix.reduce(
            (curr, _, i) =>  (i < matrix.length -1 ? curr.concat(i) : curr), [] 
        );
    }
    const PI = [
        [matrix.length-1],
        getNoFinalStates()
    ];
    const getGroup = (PI, state) =>{
        for (let i = 0; i < PI.length; i++) {
            if(PI[i].includes(state)){
                return i;
            }
        }
    }
    let oldPILength = 0;
    while( oldPILength !== PI.length ){ //While PI doesnt change go around the array
        oldPILength = PI.length; //oldPI checks if PI doesnt change
        for(let i = 0; i < PI.length; i++){
            let stateToChange = null;
            if( PI[i].length > 1){
                for( let j = 0; j < alphabet.length; j++ ){
                    const firstState = PI[i][0];
                    const targetGroup = getGroup(PI, matrix[firstState][j]);
                    for(let k = 1; k < PI[i].length; k++){
                        const state = PI[i][k];
                        if( targetGroup !== getGroup( PI, matrix[state][j] ) ){
                            //do the change
                            stateToChange = state;
                        }
                    }
                }
            }
            if(stateToChange){
                PI.push( 
                    PI[i].filter(state => state !== stateToChange) 
                );
                PI[i] = [stateToChange];
            }
        }
    }
    //Now PI has the states possible, we should build the transition table:
    const transitionTable = [];
    //console.log(PI);
    for (const states of PI) {
        const newRow = [];
        for (let i = 0; i < alphabet.length; i++) {
            const firstState = states[0];
            newRow.push( getGroup(PI, matrix[firstState][i] ) );
        }
        transitionTable.push(newRow);
    }
    return transitionTable;
}