const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min - max >= 0) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max, digits) => {
  if (min < 0 || max < 0 || digits < 0 || min - max >= 0) {
    return null;
  }
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(digits);
};

export {getRandomInt, getRandomFloat};
