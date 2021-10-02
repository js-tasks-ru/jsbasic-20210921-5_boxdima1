function camelize(str) {
  return str.split('-').map((item, index) => {
    if (index !== 0) {
      return item[0].toUpperCase() + item.slice(1);
    } else {
      return item;
    }
  }).join('');
}


console.log(camelize('-webkit-transition'));
