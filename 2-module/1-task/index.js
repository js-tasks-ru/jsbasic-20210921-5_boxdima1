function sumSalary(salaries) {
  let total = 0;
  for (let salary of Object.values(salaries)) {
    if (isFinite(salary)) {
      total += salary;
    }
  }
  return total;
}
