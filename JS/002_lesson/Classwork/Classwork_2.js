/* Задача 1
Результатом буде true.
Оскільки код виконується в два етапи: Parsing і Runtime.
На епапі парсингу в середині функції ініціалізується змінна value.
І хоча блок else ніколи не виконається, змінна обявленна в середині цього блоку буде доступна в області видимості функції.
Тому в блоці if значення присвоюється локальній змінній value, а не глобальній.
Глобальна змінна value при цьому не зміниться.
якщо в виразі var value = false забрати ключове слово var, змінна не буде ініціалізована в обєкті змінних функції.
І значення true буде присвоєно зовнішній змінній.
*/


// Задача 2. Напишите функцию, возвращающую количество собственных вызовов.
function executeCounter(){
  let counter = 0;
  return function(){
    return ++counter;
  }
}
const f = executeCounter();
f(); //1
f(); //2
f(); //3


/* Задача 3.
Следующий код создает массив функций-стрелков shoooters. По замыслу, каждый стрелок должен выводить свой номер:

function makeArmy() {
  var shooters = [];
  for (var i = 0; i< 10; i++) {
    var shooter = function() { // функция-стрелок
    alert(i); // выводит свой номер
  };
  shooters.push(shooter);
}
return shooters;
}
var army = makeArmy();
army[0](); // стрелок выводит 10, а должен 0
army[5](); // стрелок выводит 10, а должен 5.

Сейчас все функции-стрелки выводят 10 вместо своего номера. Поправьте код,
чтобы при вызове каждой из них она выводила свой номер(индекс в массиве).
Предложите несколько вариантов.
*/

//ES 6.
function makeArmy() {
  const shooters = [];
  for (let i = 0; i< 10; i++) {
    const shooter = function() { // функция-стрелок
      alert(i); // выводит свой номер
    };
  shooters.push(shooter);
  }
  return shooters;
}
const army = makeArmy();
army[0]();
army[5]();

//ES 5.
function makeArmy() {
  var shooters = [];
  for (var i = 0; i< 10; i++) {
    var shooter = function(i){
        return function() { // функция-стрелок
          alert(i); // выводит свой номер
        };
    }(i);
  shooters.push(shooter);
  }
  return shooters;
}
var army = makeArmy();
army[0](); // стрелок выводит 10, а должен 0
army[5](); // стрелок выводит 10, а должен 5.
