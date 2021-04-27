export default function Simulation(matrix, alphabet, stringInput){
    const getFinalState = ()=>{
        const lastRow = matrix[matrix.length - 1];
        if(lastRow.includes(matrix.length)){
            return matrix.length;
        }else{
            return matrix.length - 1;
        }
    }

    const mover = (currentState, character) => {
        const col = alphabet.indexOf(character);
        if(col === -1){
            return currentState;
        }else{
            return matrix[currentState][col];
        }
    }
    let currentState = 0;
    for (const character of stringInput) {
        currentState = mover(currentState, character);
    }
    if(currentState === getFinalState()){
        console.log("Si");
        return "Si";
    }else{
        console.log("No");
        return "No";
    }
}