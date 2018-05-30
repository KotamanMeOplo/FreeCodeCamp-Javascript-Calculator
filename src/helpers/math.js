const round = strNum => {
  let numParts = strNum.split('.');
  let allowedDecimals = 9 - numParts[0].length;

  return (Math.round(parseFloat(strNum, 10) * Math.pow(10, allowedDecimals)) / Math.pow(10, allowedDecimals)).toString();
}
    
const mathOperations = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y
};

export { round, mathOperations };