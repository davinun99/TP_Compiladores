export default function Simulation(matrix, alphabet, stringInput){
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
}