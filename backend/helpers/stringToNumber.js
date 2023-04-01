function stringToNumber(s) {
  return [...s].reduce((hashValue, char) => {
    const charCode = char.charCodeAt(0);
    return ((hashValue << 5) + hashValue) + charCode;
  }, 5381);
}

module.exports = stringToNumber;
