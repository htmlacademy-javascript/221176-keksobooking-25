const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min - max >= 0) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomFloat = (min, max, digits) => {
  if (min < 0 || max < 0 || digits < 0 || min - max >= 0) {
    return null;
  }
  const multiplier = 10 ** digits;
  // если количество знаков после запятой меньше чем у исходных значений,
  // то случайное число будет получатся всегда вне заданного диапазона
  if (!Number.isInteger(min * multiplier) || !Number.isInteger(max * multiplier)) {
    return null;
  }
  return Math.floor((Math.random() * (max - min) + min) * multiplier) / multiplier;
};

getRandomInt(1, 2);
getRandomFloat(1.1, 1.2, 2);
