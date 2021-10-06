function highlight(table) {
  let rows = table.getElementsByTagName('tbody')[0].rows;
  for (let i = 0; i < rows.length; i++) {
    let tr = rows[i];
    if (+tr.cells[1].innerText < 18) {
      tr.style.textDecoration = 'line-through';
    }
    if (tr.cells[2].innerText === 'f') {
      tr.classList.add('female');
    } else if (tr.cells[2].innerText === 'm') {
      tr.classList.add('male');
    }
    if (!tr.cells[3].hasAttribute('data-available')) {
      tr.hidden = true;
    } else if (tr.cells[3].dataset.available === 'true') {
      tr.classList.add('available');
    } else {
      tr.classList.add('unavailable');
    }
  }
}
