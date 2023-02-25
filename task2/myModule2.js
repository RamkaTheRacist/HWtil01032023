//4 метода: сложения, умножения, вычитания и деления.
function sumNumbersV1(...args) {        //Using BigInt
    if (args.length == 0) {
        //Не уверен, лучше Exception выбросить или бросить null
        //throw new Error("No arguments");
        return null;
    }
    let result = BigInt(0);

    for (let item of args) {
        result += BigInt(item);
    }

    //return result;                  // return BigInt
    return String(result);            // return string
}

function differenceNumbersV1(...args) {        //Using BigInt
    if (args.length == 0) {
        //Не уверен, лучше Exception выбросить или бросить null
        //throw new Error("No arguments");
        return null;
    }
    let result = BigInt(args[0]);

    for (let index = 1; index < args.length; index++) {
        result -= BigInt(args[index]);
    }

    //return result;                  // return BigInt
    return String(result);            // return string
}

function divisionNumbersV1(...args) {        //Using BigInt
    if (args.length == 0) {
        //Не уверен, лучше Exception выбросить или бросить null
        //throw new Error("No arguments");
        return null;
    }
    let result = BigInt(args[0]);

    for (let index = 1; index < args.length; index++) {
        result /= BigInt(args[index]);
    }

    //return result;                  // return BigInt
    return String(result);            // return string
}

function multiplyNumbersV1(...args) {        //Using BigInt
    if (args.length == 0) {
        //Не уверен, лучше Exception выбросить или бросить null
        //throw new Error("No arguments");
        return null;
    }
    let result = BigInt(1);

    for (let item of args) {
        result *= BigInt(item);
    }

    //return result;                  // return BigInt
    return String(result);            // return string
}


//////////////////////////////////////////////////////////////////////////////////////////////////////


function sumNumbersV2(...args) {        //Without BigInt    //Строка проверна на пробелы, неправильные символы
    if (args.length == 0) {
        //Не уверен, лучше Exception выбросить или бросить null
        //throw new Error("No arguments");
        return null;
    }
    // let result = args[0].split("");
    // for (let i = 1; i < args.length; i++) {
    //     let nextNumber = args[i].split("");
    //     let tmpLength = nextNumber.length;
    //     if (result.length > nextNumber.length) {
    //         tmpLength = result.length;
    //     }
    //     let nextDigit = 0;
    //     let tmpResult = [];
    //     for (let index = 0; index < tmpLength; index++) {
    //         let resultTmpNumber = result[result.length - 1 - index];
    //         let nextNumberTmpNumber = nextNumber[nextNumber.length - 1 - index];
    //         let currentDigit = 0;
    //         if (resultTmpNumber == undefined) {
    //             resultTmpNumber = 0;
    //         } else if (nextNumberTmpNumber == undefined) {
    //             nextNumberTmpNumber = 0;
    //         }
    //         if (+resultTmpNumber + +nextNumberTmpNumber + nextDigit > 9) {
    //             currentDigit = (+resultTmpNumber + +nextNumberTmpNumber + nextDigit) % 10;
    //             nextDigit = 1;
    //         } else {
    //             currentDigit = +resultTmpNumber + +nextNumberTmpNumber + nextDigit;
    //             nextDigit = 0;
    //         }
    //         tmpResult.push(currentDigit);
    //     }
    //     result = tmpResult.reverse();
    // }
    // return result.join("");




}

const sameBigint = "1234567890123456789012345678901234567890";      //max 15 for int
const sameBigint2 = "1234567890123456789012345678901234567890";
//console.log(sumNumbersV2(sameBigint, sameBigint2));
// console.log(sumNumbersV1(sameBigint, sameBigint2));

// let array = ["1","2"," ","","4"];
// console.log(array);