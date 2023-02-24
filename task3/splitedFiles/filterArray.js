/**
 * Filter array of `Product` using `filter`
 * 
 * @param {string} string Filter string (Cannot be empty)
 * @param {Array} array Contains `Product` (Cannot be empty)
 * @returns {Array} Filtered array of `Product`
 */
export function filterArray(string, array) {
    if (!string || !array.length) {
        //return -1;                              //Либо код ошибки
        throw new Error("String or array is empty")   //Либо exception
    }

    let tasksArray = string.split("&").map(item => item.split("-"));

    for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].length > 3) {
            throw new Error(`Syntax error: "${string}"`);
        }

        if (array.length == 0) {
            return array;
        }

        switch (tasksArray[i][0]) {
            case "name":
                array = array.filter(item => item.getName().match(createRegForStringOperation(tasksArray[i][1], tasksArray[i][2])));
                break;

            case "price":
                array = array.filter(item => createOperationForNumber(tasksArray[i][1], item.getPrice()));
                break;

            case "quantity":
                array = array.filter(item => createOperationForNumber(tasksArray[i][1], item.getQuantity()));
                break;

            case "description":
                array = array.filter(item => item.getDescription().match(createRegForStringOperation(tasksArray[i][1], tasksArray[i][2])));
                break;
            default:
                throw new Error(`Unknown filter: "${string}"`);
        }
    }
    return array;

    /**
    * Check and create right RegExp for filter strings
    * 
    * @param {string} operation Operation `(contains, starts, ends)` as string
    * @param {string} reg Reg as string
    * @returns {RegExp} RegExp for filter
    */
    function createRegForStringOperation(operation, reg) {
        let methodString = {
            "contains": new RegExp(reg),
            "ends": new RegExp(reg + "$"),
            "starts": new RegExp("^" + reg)
        };
        if (methodString.hasOwnProperty(operation)) {
            return methodString[operation];
        }
        throw new Error(`Cant find operation: "${operation}"`);
    };

    /**
    * Check and create function for `array.filter()`
    * 
    * @param {Array} array Input array which has to be filtered
    * @param {number} numberFromArray Number using for filtering
    * @returns {Function} Function for `array.filter()`
    */
    function createOperationForNumber(array, numberFromArray) {
        let methodNumber = {
            ">": (a, b) => a > b,
            ">=": (a, b) => a >= b,
            "<": (a, b) => a < b,
            "<=": (a, b) => a <= b,
            "=": (a, b) => a == b
        };
        let operation = "";
        let tmpNumber = "";

        for (const item of array) {
            if (isNaN(item)) {
                operation += item;
            } else {
                tmpNumber += item;
            }
        }

        if (tmpNumber == "" || tmpNumber.includes(" ")) {
            throw new Error(`Number for searching can not be empty or has spaces`);
        }
        if (methodNumber.hasOwnProperty(operation)) {
            return methodNumber[operation](numberFromArray, tmpNumber);
        }
        throw new Error(`Cant find operation: "${operation}"`);
    };
}