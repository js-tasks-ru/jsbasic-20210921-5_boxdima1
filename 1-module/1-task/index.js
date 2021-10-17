function factorial(n) {
  let res = 1;
  for (const i of Array(n).keys()) {
    res *= (i + 1);
  }
  return res;
}
