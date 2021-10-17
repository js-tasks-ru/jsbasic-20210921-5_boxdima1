function showSalary(users, age) {
  return users.map((user)=> {
    if (user.age <= age) {
      return `${user.name}, ${user.balance}\n`;
    }
  }).join('').slice(0, -1);
}
