export default {
    idGen,
    getDayLettersByDate,
    cToF,
    fToC,
    isEnglishOnly,
    swapUnitType
}

function idGen() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// Get date string and return the day of the date by name.
function getDayLettersByDate(date) {
    let day = new Date(date);
    return _getDayByIndex(day.getDay());
}

function _getDayByIndex(index) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[index];
}

function cToF(celsius) {
    let number = celsius * 9 / 5 + 32;
    return  Math.round(number)
}

function fToC(fahrenheit) {
    let number = (fahrenheit - 32) * 5 / 9;
    return  Math.round(number) 
}

function swapUnitType(degrees, unitType) {
    if (unitType === 'c') {
        return fToC(degrees);
    } else {
        return cToF(degrees);
    }
}

function isEnglishOnly(string) {
    let isCharInEnglish = true;
    const englishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    string.replace(/ /g, '').split("").forEach(str => {
        if (!englishAlphabet.includes(str)) {
            isCharInEnglish = false;
        }
    });
    return isCharInEnglish;
}