function getMinMax(str) {
  let filteredArray = str.split(' ').filter(item => isFinite(item));
  return {
    min: Math.min(...filteredArray),
    max: Math.max(...filteredArray)
  };
}
