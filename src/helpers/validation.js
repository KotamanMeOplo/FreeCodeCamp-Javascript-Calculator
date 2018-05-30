const isNumber = val => /^\d$/.test(val)
const isOperator = val => /^\/|\*|-|\+$/.test(val)

const checkForErrors = val => {
  const isTooBig = parseFloat(val, 10) > 999999999;
  const isNotANumberOrAnOperator = isNaN(val) && !isOperator(val);
  const includesLetterE = /e/.test(val)

  return isTooBig || isNotANumberOrAnOperator || includesLetterE ? 'Error' : val
};

export { isNumber, isOperator, checkForErrors };