/**
 * Transforms string. Sets first letter in uppercase. Others - in lowercase.
 * 
 * @param {string} string Input data
 * @returns {string} Returns string
 */
export function transformStringFirstLetterUpOtherLow(string) {

    if (!string) {
        return string;
    }
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
/**
 * Transforms string for setting spaces in right positions.
 * 
 * @param {string} string Input data
 * @returns {string} Returns string
 */
export function transformStringWithRightSpaces(string) {
    if (!string) {
        return string;
    }
    return string.replace(/(\s{2})|(\s(?=\p{P}))/gu, "").replace(/(\p{P}(?=\S))/gui, '$1 ');
}
/**
 * Shows count of words in string
 * 
 * @param {string} string Input data
 * @returns {number} Returns count of words or `-1` as error
 */
export function showCountOfWords(string) {                               //Если в строке есть числа и прочий мусор     
    if (!string) {
        return -1;
    }
    let result = 0;
    let tmpArray = string.replace(/(\p{P})|(\d+)|([+])/gu, " ").split(" ");
    for (const key of tmpArray) {
        if (key == "") {
            continue;
        }
        result++;
    }
    return result;
}
// /**
//  * Show count of words in string
//  * 
//  * @param {string} string Input data
//  * @returns {number} Returns count of words
//  */
// export function showCountOfWords(string) {                                //Если в строке только слова и правильная пунктуация
//     let tmpArray = string.split(" ");
//     return tmpArray.length;
// }
/**
 * Shows count of unique words in string
 * 
 * @param {string} string Input data
 * @returns {Array[]} Returns sorted array of arrays with `[word, number]` where firsts are not unique words
 */
export function showCountOfUniqueWords(string) {
    let resultObject = {};
    let array = string.replace(/(\p{P})|(\d+)|([-+/*]+)/gu, "").toLowerCase().split(" ");
    for (const item of array) {
        if (item == "") {
            continue;
        }
        if (!resultObject[item]) {
            resultObject[item] = 1;
        } else {
            resultObject[item] += 1;
        }
    }

    // Оставил несколько возвратов, потому что фраза "уникальные слова" и пример немного не сходятся в голове, потому что уникальные слова - это слова, встречающиеся 1 раз
    // + Красивый вывод, как в примере.

    //return resultObject;                         //Не отсортированный объект, в котором просто лежат слова, как "ключи" и количество раз сколько встретилось, как значения.

    return Object.entries(resultObject).sort((a, b) => b[1] - a[1]);          //Отсортированный массив, в котором лежат [word, times]

    //return Object.entries(resultObject).filter((item) => item[1] == 1);         //Массив, в котором лежат ТОЛЬКО уникальные [word, times]

    /*let result = "";                                                                          // Если нужен красивый вывод, как в примере ввиде строки
    for (const item of Object.entries(resultObject).sort((a, b) => b[1] - a[1])) {
        result+= `${item[0]} - ${item[1]} times, `;
    }
    
    return result.slice(0, -2);*/
}