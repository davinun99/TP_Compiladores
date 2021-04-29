export function printMat(mat){
    if(!mat){
        return;
    }
    let toPrint = '';
    for( let i = 0; i < mat.length; i++ ){
        toPrint = `${toPrint} State ${i}:\t`;
        for( let j = 0; j < mat[i].length; j++ ){
            const el = mat[i][j];
            if(el===0 || el)
                toPrint = `${toPrint}\t${el}`;
            else
                toPrint = `${toPrint}\t_`;
        }
        toPrint = `${toPrint}\n`;
    }
    toPrint = `${toPrint} State ${mat.length}:\t\t  FINAL`;
    console.log(toPrint);
}
export function printAlphabet (alphabet){
    let toPrint = "Alphabet:\t\t";
    for (const char of alphabet) {
        toPrint = `${toPrint}${char}\t`;
    }
    console.log(toPrint);
}