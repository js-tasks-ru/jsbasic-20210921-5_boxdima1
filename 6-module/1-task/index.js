/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');
    this.render();
  }

  render() {
    for (let obj of this.rows) {
      const row = this.elem.insertRow();
      for (const value of Object.values(obj)) {
        const cell = row.insertCell();
        cell.innerText = value;
      }
      this.createBtn(row);
    }
    const thead = document.querySelector('thead');
    this.elem.insertAdjacentElement('afterbegin', thead);
  }

  createBtn(row) {
    const btn = document.createElement('button');
    btn.addEventListener('click', this.deleteRow);
    btn.innerText = 'X';
    const btnCell = row.insertCell();
    btnCell.append(btn);
  }

  deleteRow(event) {
    const selectedElem = event.target.parentNode.parentNode;
    selectedElem.remove();
  }
}
