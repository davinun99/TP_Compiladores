
function Thompson(alphabet, input, initialState){
    const VACIO_COLUMN = alphabet.length;
    const ROW_LENGTH = alphabet.length+1;
    const doClean = (regex, cleanPos, currStateNumber) => {
        const sMat = recursiveGetMatrix( regex.substring(0, cleanPos), currStateNumber + 1);//load the matrix with the nexts states
        const statesQuant = sMat.length;
        let lastStateNumber = statesQuant + currStateNumber + 2;

        let lastSState = new Array(ROW_LENGTH); //new END for S
        lastSState[VACIO_COLUMN] = [lastStateNumber, currStateNumber+1]; //The end of s has to point to the new end and start of S
        sMat.push(lastSState);//push the new END

        let newState = new Array(ROW_LENGTH);//create new state that will point to s
        newState[VACIO_COLUMN] = [currStateNumber + 1, lastStateNumber];//The start has to point to the end
        return [newState].concat(sMat);
    }
    const doOr = (regex, orPos, currStateNumber) =>{
        const sMat = recursiveGetMatrix(regex.substring(0, orPos), currStateNumber +1); //load the S mat with the things left to the '|'
        const sMatStatesQuant = sMat.length;
        let lastStateNumberS = sMatStatesQuant + currStateNumber;
        const tMat = recursiveGetMatrix(regex.substring(orPos + 1), lastStateNumberS +2);//loat the T mat with the things right to the '|'
        const tMatStatesQuant = tMat.length;
        let lastStateNumber = lastStateNumberS + tMatStatesQuant + 3;
        
        let lastSState = new Array(ROW_LENGTH); //new END for S
        lastSState[VACIO_COLUMN] = [lastStateNumber]; //Make THE NEW end of S point to new last state
        sMat.push(lastSState);//push the new END
        
        let lastTState = new Array(ROW_LENGTH);//new END fot T
        lastTState[VACIO_COLUMN] = [lastStateNumber] //Make the NEW end of T point to new last state
        tMat.push(lastTState); //Push the new END into T

        let newState = new Array(ROW_LENGTH);
        newState[VACIO_COLUMN] = [currStateNumber+1, lastStateNumberS+2];//make the new state point to the S and T mats
        return [newState].concat(sMat).concat(tMat);
    }
    const doSequence = (regex, currStateNumber)=>{
        let currRow = new Array(ROW_LENGTH);//new array for the new state
        currRow[VACIO_COLUMN] = [];//the last element of the array is another array with VACIO pointers
        const colN = alphabet.indexOf(regex);//The column to load is determined by the position of the character in the alphabet
        currRow[colN] = currStateNumber + 1;//The end should point to the next state
        return [currRow];
    }
    const getParClosing = (regex, openParPos)=> {
        let checker = 1;//when checker is 0 again we can return
        for (let i = openParPos+1; i < regex.length; i++) {//go around regex starting from openParPos+1
            const element = regex[i];
            if(element === '(') checker++;
            if(element === ')') checker--;
            if(!checker){//when checker is 0 again we can return the position
                return i;
            }
        }
    }
    const recursiveGetMatrix = (regex, currStateNumber) => {//Function to consume regex and return the Matrix
        //console.log(regex);
        if(!regex){// If regex is comming null or empty return null
            return null;
        }
        const orPos = regex.indexOf('|');
        const cleanPos = regex.indexOf('*');
        const openPar = regex.indexOf('(');
        const closePar = getParClosing(regex, openPar);
        
        if(closePar !== -1 && openPar !== -1){
            const newRegex = regex.substring(openPar+1, closePar); //get the expression between the parenthesis
            if(closePar === regex.length-1 && openPar === 0 ){// if the parenthesis are just wrapping the whole expression, just return the whole expression
                return recursiveGetMatrix(newRegex, currStateNumber);
            }else if(closePar + 1 === orPos || openPar - 1 === orPos){//Or is already at max priority so just removing the parenthesis if their redundant
                const regexWithoutPar = regex.substring(0,openPar) + regex.substring(openPar+1, closePar) + regex.substring(closePar+1); //remove parenthesis
                return recursiveGetMatrix(regexWithoutPar, currStateNumber);
            }
            else if(cleanPos === closePar + 1){//If clean is after the parenthesis
                let cleanedMat = doClean(newRegex, cleanPos, currStateNumber); //Clean the regex
                const regexAfterC = regex.substring(cleanPos + 1); //substr the regex after 
                if(regexAfterC ){//If next characters exist
                    const lastState = cleanedMat.length + currStateNumber;
                    const nextMat = recursiveGetMatrix(regexAfterC, lastState);
                    cleanedMat = cleanedMat.concat(nextMat);
                }
                return cleanedMat;
            }else if( alphabet.indexOf(regex[openPar -1]) !== -1 ){//if before the parenthesis there are just more letters
                const regexBeforePar = regex.substring(0, openPar); //Get the expression before the parenthesis
                let afn = recursiveGetMatrix( regexBeforePar, currStateNumber );//Get the matrix for the expression before
                const lastState = afn.length + currStateNumber;//Get the next state with the new matrix lenght + the current state number
                const regexAfterPar = regex.substring(openPar); //Get the regex after the open parenthesis
                const afnAfter = recursiveGetMatrix( regexAfterPar, lastState );//Get the AFN for the expression after the parenthesis
                afn = afn.concat(afnAfter);
                return afn;
            }else if( alphabet.indexOf(regex[closePar + 1]) !== -1 ){//If after the parenthesis there are more letters
                const regexBeforeChar = regex.substring(0, closePar + 1); //Get the expression til the character
                let afn = recursiveGetMatrix( regexBeforeChar, currStateNumber );//Get the matrix for the expression before
                const lastState = afn.length + currStateNumber;//Get the next state with the new matrix lenght + the current state number
                const regexAfterChar = regex.substring(closePar + 1); //Get the regex after the closing parenthesis
                const afnAfter = recursiveGetMatrix( regexAfterChar, lastState );//Get the AFN for the expression after the char
                afn = afn.concat(afnAfter);
                return afn;
            }
            
        }else if(orPos !== -1){
            return doOr(regex, orPos, currStateNumber);

        }else if(cleanPos !== -1){
            return doClean(regex, cleanPos, currStateNumber);

        }else if(regex.length === 1){
            return doSequence(regex, currStateNumber);

        }else if(regex.length > 1){
            return recursiveGetMatrix(regex[0], currStateNumber).concat(
                recursiveGetMatrix(regex.substring(1), currStateNumber+1)
            );
        }
    }
    const table = recursiveGetMatrix(input, initialState);
    return table;
}
export default Thompson;