export default function AFDConvertion(alphabet, matrix){
    const getNoFinalStates = () => {
        return matrix.reduce((result, _, index )=> result.concat(index), []);
    }
    const PI = [[matrix.lenght], getNoFinalStates()];
    
}