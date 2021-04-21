//document.getElementById('regexInputButton').addEventListener('click', hola);

(() => {
    const input = "a(b*)"; //Test input
    const alphabetA = "baaa"; //Test alphabet
    const printMat = mat =>{// This just print the matrix
        let toPrint = '';
        for( let i = 0; i < mat.length; i++ ){
            toPrint = `${toPrint} State ${i+1}:\t`;
            for( let j = 0; j < mat[i].length; j++ ){
                const el = mat[i][j];
                if(el)
                    toPrint = `${toPrint}\t${el}`;
                else
                    toPrint = `${toPrint}\t_`;
            }
            toPrint = `${toPrint}\n`;
        }
        toPrint = `${toPrint} State ${mat.length+1}:\t\t  FINAL`;
        console.log(toPrint);
    }
    const alphabet = Array.from(
        new Set(
            alphabetA.split('').sort()
        )
    ).join('');//Extract the unique characters and sort them
    console.log('Alphabet: ' + alphabet);
    const recursiveGetMatrix = (regex, currStateNumber) => {//Function to consume regex and return the Matrix
        const orPos = regex.indexOf('|');
        const cleanPos = regex.indexOf('*');
        const openPar = regex.indexOf('(');
        const closePar = regex.lastIndexOf(')');

        if(closePar !== -1 && openPar !== -1){
            const newRegex = regex.substring(openPar+1, closePar);
            if(closePar === regex.length-1){
                return recursiveGetMatrix(newRegex, currStateNumber);
            }else if(cleanPos === closePar + 1){
                //clean the newRegex
            }else if(
                regex[orPos+1] === '(' &&
                regex[orPos-1] === ')'
            ){
                //Or in between
            }
            
        }else if(orPos !== -1){
            const sMat = recursiveGetMatrix(regex.substring(0, orPos), currStateNumber +1); //load the S mat with the things left to the '|'
            const sMatStatesQuant = sMat.length;
            let lastStateNumberS = sMatStatesQuant + currStateNumber;
            const tMat = recursiveGetMatrix(regex.substring(orPos + 1), lastStateNumberS +2);//loat the T mat with the things right to the '|'
            const tMatStatesQuant = tMat.length;
            let lastStateNumber = lastStateNumberS + tMatStatesQuant + 3;
            
            let lastSState = new Array(alphabet.length+1); //new END for S
            lastSState[alphabet.length] = [lastStateNumber]; //Make THE NEW end of S point to new last state
            sMat.push(lastSState);//push the new END
            
            let lastTState = new Array(alphabet.length+1);//new END fot T
            lastTState[alphabet.length] = [lastStateNumber] //Make the NEW end of T point to new last state
            tMat.push(lastTState); //Push the new END into T

            let newState = new Array(alphabet.length+1);
            newState[alphabet.length] = [currStateNumber+1, lastStateNumberS+2];//make the new state point to the S and T mats
            return [newState].concat(sMat).concat(tMat);

        }else if(cleanPos !== -1){
            const sMat = recursiveGetMatrix( regex.substring(0, cleanPos), currStateNumber + 1);//load the matrix with the nexts states
            const statesQuant = sMat.length;
            let lastStateNumber = statesQuant + currStateNumber + 2;

            let lastSState = new Array(alphabet.length+1); //new END for S
            lastSState[alphabet.length] = [lastStateNumber, currStateNumber+1]; //The end of s has to point to the new end and start of S
            sMat.push(lastSState);//push the new END

            let newState = new Array(alphabet.length + 1);//create new state that will point to s
            newState[alphabet.length] = [currStateNumber + 1, lastStateNumber];//The start has to point to the end
            return [newState].concat(sMat);
        }else if(regex.length === 1){
            let currRow = new Array(alphabet.length + 1);//new array for the new state
            currRow[alphabet.length] = [];//the last element of the array is another array with VACIO pointers
            const colN = alphabet.indexOf(regex);//The column to load is determined by the position of the character in the alphabet
            currRow[colN] = currStateNumber + 1;//The end should point to the next state
            return [currRow];
        }else if(regex.length > 1){
            return recursiveGetMatrix(regex[0], currStateNumber).concat(
                recursiveGetMatrix(regex.substring(1), currStateNumber+1)
            );
        }
    }
    printMat(recursiveGetMatrix(input, 1));//Print the generated matrix
})()