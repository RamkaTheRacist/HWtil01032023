/**
    * `[Service Function]`Check if first string is same or bigger than second`
    * 
    * @param {string} first First string
    * @param {string} second Second string
    * @returns {boolean} Return true/false if `first` string more than `second` or strings are same
    */
function isFirstBiggerOrSame(first, second) {                             //service func

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
    * Count sum of any numbers. Get unlimited count of args separed by `","` but more than `0`
    * 
    * @param {string} args Input numbers as strings
    * @returns {string} Return string of summed numbers
    */
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

        let checkedFirstNumber = isFirstBiggerOrSame(result, args[i]);
        let resultIsNegative = (result[0] == "-") ? true : false;
        let nextNumberIsNegative = (args[i][0] == "-") ? true : false;
        result = (resultIsNegative) ? result.slice(1).split("") : result.split("");
        let nextNumber = (nextNumberIsNegative) ? args[i].slice(1).split("") : args[i].split("");
        let maxLength = (nextNumber.length > result.length) ? nextNumber.length : result.length;
        let tmpResult = [];
        let tmpNumber = 0;
        let tmpDigit = 0;

        if ((result.toString() === nextNumber.toString()) && (resultIsNegative ^ nextNumberIsNegative)) {

            result = "0";
            continue;
        }

        for (let index = 0; index < maxLength; index++) {

            let tmpFirstNumber = result[result.length - 1 - index];
            let tmpSecondNumber = nextNumber[nextNumber.length - 1 - index];

            if (tmpFirstNumber == undefined) {
                tmpFirstNumber = 0;
            } else if (tmpSecondNumber == undefined) {
                tmpSecondNumber = 0;
            }

            tmpFirstNumber = +tmpFirstNumber;
            tmpSecondNumber = +tmpSecondNumber;

            if (resultIsNegative ^ nextNumberIsNegative) {
                if (checkedFirstNumber) {
                    tmpNumber = tmpFirstNumber - tmpSecondNumber + tmpDigit;
                } else {
                    tmpNumber = tmpSecondNumber - tmpFirstNumber + tmpDigit;
                }
                if (tmpNumber < 0) {
                    tmpNumber += 10;
                    tmpDigit = -1;
                } else {
                    tmpDigit = 0;
                }

            } else {
                tmpNumber = tmpFirstNumber + tmpSecondNumber + tmpDigit;

                if (tmpNumber > 9) {
                    tmpNumber -= 10;
                    tmpDigit = 1;
                } else {
                    tmpDigit = 0;
                }
            }

            tmpResult.push(tmpNumber);

            if (index == maxLength - 1 && tmpDigit != 0) {
                tmpResult.push(tmpDigit);
            }

        }

        for (let i = tmpResult.length - 1; i >= 0; i--) {
            if ((tmpResult[i] == 0) || (tmpResult[i] == -1)) {
                tmpResult.pop();
            } else {
                break;
            }
        }

        result = tmpResult.reverse().join("");

        if (resultIsNegative && nextNumberIsNegative) {
            result = "-" + result;
        } else if (resultIsNegative ^ nextNumberIsNegative) {
            if ((checkedFirstNumber && resultIsNegative) || (!checkedFirstNumber && nextNumberIsNegative)) {
                result = "-" + result;
            }
        }
    }
    return result;
}


/**
    * Count difference between any numbers. Get unlimited count of args separed by `","` but more than `0`
    * 
    * @param {string} args Input numbers as strings
    * @returns {string} Return string of subtracted numbers
    */
function subtractionNumbers(...args) {       //Строка проверна на пробелы, неправильные символы

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


/**
    * Multiply numbers one after another. Get unlimited count of args separed by `","` but more than `0`
    * 
    * @param {string} args Input numbers as strings
    * @returns {string} Return string of multiply numbers
    */
function multiplyNumbers(...args) {       //Строка проверна на пробелы, неправильные символы

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

        let checkedFirstNumber = isFirstBiggerOrSame(result, args[i]);
        let resultIsNegative = (result[0] == "-") ? true : false;
        let nextNumberIsNegative = (args[i][0] == "-") ? true : false;
        result = (resultIsNegative) ? result.slice(1).split("") : result.split("")
        let nextNumber = (nextNumberIsNegative) ? args[i].slice(1).split("") : args[i].split("");
        let tmpResult = [];
        let tmpNumber = 0;
        let tmpDigit = 0;
        let tmpFirstIndex = 0;

        if (checkedFirstNumber) {

            let forSwitch = result;
            result = nextNumber;
            nextNumber = forSwitch;

        }

        result.reverse();
        nextNumber.reverse();

        for (let i = 0; i < result.length; i++) {

            let tmpArray = [];
            let tmpSecondIndex = 0;
            tmpFirstIndex = i;

            for (let j = 0; j < nextNumber.length; j++) {

                tmpNumber = result[i] * nextNumber[j] + tmpDigit;

                if (tmpNumber > 9) {
                    tmpDigit = parseInt(tmpNumber / 10);
                } else {
                    tmpDigit = 0;
                }

                tmpArray.push(tmpNumber % 10);

                if (j == nextNumber.length - 1 && tmpDigit != 0) {
                    tmpArray.push(tmpDigit);
                    tmpDigit = 0;
                }
            }
            

            tmpDigit = 0;

            while (tmpSecondIndex < tmpArray.length) {

                if (tmpResult.length == 0) {
                    tmpResult = [...tmpArray];
                    break;
                }

                if (tmpResult[tmpFirstIndex] == (undefined)) {
                    tmpResult.push(tmpArray[tmpSecondIndex]);
                } else {
                    tmpResult[tmpFirstIndex] = tmpResult[tmpFirstIndex] + tmpArray[tmpSecondIndex];
                }

                if (tmpResult[tmpFirstIndex] > 9) {
                    if (tmpResult[tmpFirstIndex + 1] == undefined) {
                        tmpResult.push(parseInt(tmpResult[tmpFirstIndex] / 10));
                    } else {
                        tmpResult[tmpFirstIndex + 1] += parseInt(tmpResult[tmpFirstIndex] / 10);
                    }
                    tmpResult[tmpFirstIndex] = tmpResult[tmpFirstIndex] % 10;
                }

                tmpSecondIndex++;
                tmpFirstIndex++;
            }
        }
        result = tmpResult.reverse().join("");

        if (resultIsNegative ^ nextNumberIsNegative) {
            result = "-" + result;
        }
    }
    return result;
}


/**
    * Divide first number by others numbers. Get unlimited count of args separed by `","` but more than `0`
    * 
    * @param {string} args Input numbers as strings
    * @returns {string} Return string of multiply numbers
    */
function divideNumbers(...args) {       //Строка проверна на пробелы, неправильные символы

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

        if (result == "0") {
            return result;
        }

        let resultIsNegative = (result[0] == "-") ? true : false;
        let nextNumberIsNegative = (args[i][0] == "-") ? true : false;
        result = (resultIsNegative) ? result.slice(1) : result;
        let nextNumber = (nextNumberIsNegative) ? args[i].slice(1) : args[i];
        let currentNumber = result.slice(0, nextNumber.length);
        let tmpResult = [];
        let checkIndex = nextNumber.length - 1;

        if (!isFirstBiggerOrSame(currentNumber, nextNumber)) {

            currentNumber += result[checkIndex];
            checkIndex++;
        }


        if (result === nextNumber) {
            if (resultIsNegative ^ nextNumberIsNegative) {
                result = "-" + "1";
            } else {
                result = "1";
            }
            continue;
        }

        if (result.length < nextNumber.length) {
            return "0";
        }

        while (checkIndex < result.length) {

            let tmpNumber = "";
            let indexOfMultiply = 1;

            if (isFirstBiggerOrSame(currentNumber, nextNumber)) {

                while (true) {

                    tmpNumber = multiplyNumbers(nextNumber, String(indexOfMultiply));

                    if (isFirstBiggerOrSame(currentNumber, tmpNumber)) {
                        indexOfMultiply++;
                    } else {
                        tmpResult.push(indexOfMultiply - 1);
                        currentNumber = subtractionNumbers(currentNumber, multiplyNumbers(nextNumber, String(indexOfMultiply - 1)));
                        break;
                    }
                }
                currentNumber += result[checkIndex];
                checkIndex++;
            }
            else {
                tmpResult.push(0);
                currentNumber += result[checkIndex];
                checkIndex++;
            }
        }

        result = tmpResult.join("");

        if (resultIsNegative ^ nextNumberIsNegative) {
            result = "-" + result;
        }

    }
    return result;
}


let a = "199987534980909090999";
let b = "80901";

console.log(divideNumbers(a, b));
console.log(BigInt(a) / BigInt(b));