function makeDiagonalRed(table) {
  let rows = table.rows;
  let len = rows.length - 1;
  for (let i = 0; i < len + 1; i++) {
    let cell = rows[i].cells;
    cell[i].style.backgroundColor = 'red';
    cell[len - i].style.backgroundColor = 'red';
  }
}
