//Задача 1. Почему первое равенство – неверно, а второе – верно?
//Какие преобразования происходят при вычислении?

/*
При порівнянні об'єктів, перетворення типів не відбувається. Об'єкти порівнюються по ссилці.
Порівняння об'ктів поверне true тільки в тому випадку, якщо ссилки ведуть на один
і той же об'єкт в пам'яті.
В даному випадку порівнюються різні об'єкти.
*/
alert( [] == [] ); // false

/*
В даному випадку "==!" містить два оператори:
"==" - оператор не суворої рівності,
"!" - логічне НЕ.
Спочатку оператор "!" перетворює другий масив в булеве "false".
Потім операто "==" здійснює перетворення операндів в числовий тип.
Перший операнд приводиться до примітиву методом Array.prototype.toString(),
в значенн "", потім порожній рядок перетворюється в 0.
Другий операнд з булевого false перетворюється в 0.
Потівняння 0 == 0 дає true.
*/
alert( [] ==! [] ); // true


/* Задача 2
Напишите функцию-конструктор Calculator, которая создает объект с тремя методами:
* Метод read() запрашивает два значения при помощи prompt и запоминает их в свойствах объекта.
* Метод sum() возвращает сумму двух значений принятых от пользователя.
* Метод mul() возвращает произведение двух значений принятых от пользователя.
Пример использования:
var calculator = new Calculator();
calculator.read();
alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );
*/
function Calculator(){
  this._val1 = null;
  this._val2 = null;
}
Calculator.prototype._isCorrectValues = function(){
  return !( isNaN(this._val1) || isNaN(this._val2) );
}
Calculator.prototype.read = function(){
  this._val1 = parseFloat( prompt('Введіть перше значення', 0) );
  this._val2 = parseFloat( prompt('Введіть друге значення', 0) );
}
Calculator.prototype.sum = function() {
  if( !this._isCorrectValues() ){
    alert('Одне з введени значень неправильне.\nВиконайте метод "read" заново')
    return undefined;
  }
  return +this._val1 + +this._val2;
}
Calculator.prototype.mul = function() {
  if( !this._isCorrectValues() ){
    alert('Одне з введени значень не коректне.\nВиконайте метод "read" заново')
    return undefined;
  }
  return this._val1 * this._val2;
}


var calculator = new Calculator();
calculator.read();
alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );


/* Задача 3
Напишите функцию-конструктор Summator, которая создает объект с двумя методами.
* Метод sum(a,b) возвращает сумму двух значений;
* Метод run() запрашивает два значения при помощи prompt и выводит их сумму, используя метод sum.
В итоге вызов new Summator().run() должен спрашивать два значения и выводить их сумму.
*/
function Summator(){
  this._val1 = null;
  this._val2 = null;
}
Summator.prototype._isCorrectValues = function(){
  return !( isNaN(this._val1) || isNaN(this._val2) );
}
Summator.prototype.sum = function(a,b) {
  return a+b;
}
Summator.prototype.run = function(){
  var v1 = this._val1 = parseFloat( prompt('Введіть перше значення', 0) );
  var v2 = this._val2 = parseFloat( prompt('Введіть друге значення', 0) );
  if( !(isNaN(v1) || isNaN(v2)) ){ //Якщо значення коректне
    alert( this.sum(v1,v2) );
  }else{
    alert( 'Одне з введени значень не коректне' );
  }
}
