//4 метода: сложения, умножения, вычитания и деления.
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

function isFirstBigger(first, second) {                             //service func
    first = (first[0] == "-") ? first.slice(1) : first;
    second = (second[0] == "-") ? second.slice(1) : second;
    if (second.length > first.length) {
        return false;
    }
    if (first.toString() === second.toString()) {
        return true;
    }
    if (second.length == first.length) {
        for (let index = 0; index < first.length; index++) {
            if (+first[index] < +second[index]) {
                return false;
            } else if (+first[index] > +second[index]) {
                return true;
            }
        }
    }
    return true;
}

function concatResult(array) {                                  //service func
    let result = [];

    for (let index = array.length - 1; index >= 0; index--) {
        let tmpString = `${array[index]}`;
        if (index == array.length - 1) {
            if (array[index] != 0) {
                result.push(tmpString);
            }
            continue;
        }
        if (tmpString[0] == "-" && result.length > 0) {
            tmpString = tmpString.slice(1);
        }
        if (tmpString.length < 10 && result.length > 0) {
            while (tmpString.length < 10) {
                tmpString = "0" + tmpString;
            }
        }
        result.push(tmpString);
    }
    return result.join("");
}

function splitNumber(string, countOfDigits) {                                  //service func
    let result = [];
    let index = string.length;
    let isNegative = (string[0] == "-") ? true : false;
    while (index > 0) {
        if ((string.length <= (countOfDigits + 1) && string[0] == "-") || string.length < (countOfDigits + 1)) {
            result.push(+string);
            return result;
        }
        let tmpNumber = index - countOfDigits;
        if (tmpNumber < 0) {
            tmpNumber = 0;
        }
        let tmpString = string.slice(tmpNumber, index);
        if (string.slice(tmpNumber, index) == "-") {
            break;
        }
        if (isNegative) {
            if (tmpString[0] != "-") {
                tmpString = ("-" + tmpString);
            }
        }
        result.push(+tmpString);
        index -= countOfDigits;
    }
    return result;
}

function sumNumbers(...args) {       //Строка проверна на пробелы, неправильные символы
    if (args.length == 0) {
        //Не уверен, лучше Exception выбросить или бросить null
        //throw new Error("No arguments");
        return null;
    }
    if (args.length == 1) {
        return args[0];
    }
    let result = "";
    for (let i = 0; i < args.length; i++) {
        if (result.length == 0) {
            result = args[0];
            continue;
        }
        let checkedFirstNumber = isFirstBigger(result, args[i]);
        result = splitNumber(result, 10);
        let nextNumber = splitNumber(args[i], 10);
        let resultIsNegative = (result[0] < 0) ? true : false;
        let nextNumberIsNegative = (nextNumber[0] < 0) ? true : false;
        let maxLength = (nextNumber.length > result.length) ? nextNumber.length : result.length;
        let tmpResult = [];
        let tmpNumber = 0;
        let tmpDigit = 0;
        for (let index = 0; index < maxLength; index++) {
            let tmpFirstNumber = result[index];
            let tmpSecondNumber = nextNumber[index];
            if (tmpFirstNumber == undefined) {
                tmpFirstNumber = 0;
            } else if (tmpSecondNumber == undefined) {
                tmpSecondNumber = 0;
            }
            if (resultIsNegative ^ nextNumberIsNegative) {
                if (!checkedFirstNumber) {
                    let temp = tmpFirstNumber;
                    tmpFirstNumber = tmpSecondNumber;
                    tmpSecondNumber = temp;
                }
            }
            tmpNumber = tmpFirstNumber + tmpSecondNumber + tmpDigit;

            if (index != maxLength - 1) {
                if (tmpNumber >= 1e10) {
                    tmpNumber %= 1e10;
                    tmpDigit = 1;
                } else if (tmpNumber <= -1e10) {
                    tmpNumber %= 1e10;
                    tmpDigit = -1;
                } else if (tmpFirstNumber < 0 && tmpNumber > 0) {
                    tmpNumber -= 1e10;
                    tmpDigit = 1;
                } else if (tmpFirstNumber > 0 && tmpNumber < 0) {
                    tmpNumber += 1e10;
                    tmpDigit = -1;
                } else {
                    tmpDigit = 0;
                }
            }
            tmpResult.push(tmpNumber);
        }
        result = concatResult(tmpResult);
    }
    return result;
}

function differenceNumbers(...args) {       //Строка проверна на пробелы, неправильные символы
    if (args.length == 0) {
        //Не уверен, лучше Exception выбросить или бросить null
        //throw new Error("No arguments");
        return null;
    }
    if (args.length == 1) {
        return args[0];
    }
    let result = "";
    for (let i = 0; i < args.length; i++) {
        if (result.length == 0) {
            result = args[0];
            continue;
        }
        let firstNumberAsString = result;
        let secondNumberAsString = args[i];
        if ((firstNumberAsString[0] == "-" && secondNumberAsString[0] != "-") || (firstNumberAsString[0] != "-" && secondNumberAsString[0] != "-")) {
            secondNumberAsString = "-" + secondNumberAsString;
        } else if ((firstNumberAsString[0] == "-" && secondNumberAsString[0] == "-") || (firstNumberAsString[0] != "-" && secondNumberAsString[0] == "-")) {
            secondNumberAsString = secondNumberAsString.slice(1);
        }
        result = sumNumbers(firstNumberAsString, secondNumberAsString);             //Переиспользование кода это вроде хорошо)
    }
    return result;
}


const sameBigint = "-1999999999999999999099999999999999999999";      //max 15 for int
const sameBigint2 = "9999999999999999999999999999990999999909";
const sameBigint3 = "51234567890123456789012345678901234567890";

// console.log(sumNumbers(sameBigint, sameBigint3));
// console.log(t1(sameBigint, sameBigint3));

// console.log(differenceNumbers(sameBigint, sameBigint2));
// console.log(differenceNumbersV1(sameBigint, sameBigint2));
//console.log(1e10);