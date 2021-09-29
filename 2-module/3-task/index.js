let calculator = {
  a: 0,
  b: 0,
  read(a, b) {
    self.a = a;
    self.b = b;
  },

  sum() {
    return self.a + self.b;
  },

  mul() {
    return self.a * self.b;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
