export default function AFDConvertion(alphabet, matrix){
    const getNoFinalStates = () => {
        return matrix.reduce((result, _, index )=> index != matrix.length - 1 ? result.concat(index): result, []);
    }
    const getGroup = (PI, state) => {
        for (let i = 0; i < PI.length; i++) {
            if(PI[i].includes(state)){
                return i;
            }
        }
    }
    const PI = [[matrix.length - 1], getNoFinalStates()];
    let index = 0;
    while(index < PI.length){
        //correct this shit pls
        const states = PI[index];
        if(states.length > 1){
            for (let charInd = 0; charInd < alphabet.length; charInd++) {
                const targetGroup = getGroup(PI, matrix[0][charInd]);
                console.log(targetGroup);
                const toRemove = [];
                for (let i = 1; i < matrix.length; i++) {
                    if(getGroup(PI, matrix[i][charInd]) !== targetGroup){
                        toRemove.push(states[i]);
                    }
                }
                if(toRemove.length){ 
                    toRemove.forEach(element=>{
                        PI[index] = PI[index].filter(el => el!== element);
                        PI.push([element]);
                    });
                }else{
                    index++;
                }
                
            }
        }else{
            index++;
        }
    }
    //console.log(PI);
}