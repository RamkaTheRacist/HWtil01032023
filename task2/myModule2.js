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

/**
    * `[Service Function]`Parse array, make normal view and create string`
    * 
    * @param {Array} array Input array. Reversed.
    * @param {boolean} isNegative Flag, if need to set `"-"` first
    * @returns {string} Return beautiful `string`
    */
function concatResult(array, isNegative) {                                //service func

    array.reverse();
    let result = [];

    for (let index = 0; index < array.length; index++) {

        let tmpString = `${array[index]}`;

        if (index != 0 && isNegative) {
            tmpString = tmpString.slice(1);
        }

        if (tmpString.length < 10 && result.length > 0) {
            while (tmpString.length < 10) {
                tmpString = "0" + tmpString;
            }
        }

        if (array[index] == 0 && result.length > 0) {
            result.push(tmpString);
        }

        if (array[index] != 0) {
            result.push(tmpString);
        }
    }

    if (result.length == 0) {
        return "0";
    }

    return result.join("");
}
/**
    * `[Service Function]`Split string for pieces of a certain size
    * 
    * @param {string} string Input string for splitting
    * @param {number} countOfDigits Count of digits
    * @returns {number} Return array of numbers
    */
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

        result = (result[0] < 0) ? concatResult(tmpResult, true) : concatResult(tmpResult, false);
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
        result = (resultIsNegative) ? splitNumber(result.slice(1), 1) : splitNumber(result, 1);
        let nextNumber = (nextNumberIsNegative) ? splitNumber(args[i].slice(1), 1) : splitNumber(args[i], 1);
        let tmpResult = [];
        let tmpNumber = 0;
        let tmpDigit = 0;
        let tmpFirstIndex = 0;


        if (checkedFirstNumber) {

            let forSwitch = result;
            result = nextNumber;
            nextNumber = forSwitch;

        }
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