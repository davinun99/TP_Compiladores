export default function Simulation(matrix, alphabet, stringInput){
    const getFinalState = ()=>{
        for (let i = 0; i < matrix.length; i++) {//The alphabet.length+1 column is for the final states
            if( matrix[i][alphabet.length+1] === 1){//Return the index of the row with a 1 in the alphabet.length+1 column
                return i
            }
        }
        return 0;
    }
    const getInitialState = ()=>{
        for (let i = 0; i < matrix.length; i++) {//The alphabet.length column is for the initial states
            if( matrix[i][alphabet.length] === 1){//Return the index of the row with a 1 in the alphabet.length column
                return i
            }
        }
        return 0;
    }
    const mover = (currentState, character) => {//Just return the state that is pointed by the current state moved with the recieved character
        const col = alphabet.indexOf(character);
        if(col === -1){
            return currentState;
        }else{
            return matrix[currentState][col];
        }
    }
    let currentState = getInitialState();
    for (const character of stringInput) {//For each character that we have
        //console.log(currentState);
        currentState = mover(currentState, character);//The current state has to change according to the move function
    }
    if(currentState === getFinalState()){//If we end in a final state its OK
        console.log("Si");
        return "Si";
    }else{//If we end in a not final state its NOT OK
        console.log("No");
        return "No";
    }
}