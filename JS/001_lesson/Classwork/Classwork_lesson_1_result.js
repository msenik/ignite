//Задача 1. Мини-задача на синтаксис объектов. Напишите код, по строке на каждое действие.
//Создайте пустой объект user.
var user = {};

//Добавьте свойство name со значением Вася.
user.name = "Вася";

//Добавьте свойство surname со значением Петров.
user.surname = "Петров";

//Поменяйте значение name на Сергей.
user.name = "Сергей";

//Удалите свойство name из объекта.
delete user.name;



/* Задача 2.
Создайте функцию isEmpty(obj), которая возвращает true, если в объекте нет свойств
и false – если хоть одно свойство есть.
*/
function isEmpty(obj){
  return !(Object.getOwnPropertyNames(obj).length > 0);
}



//Задача 3. Дан массив чисел: [1,2,31,24,-67,5,3,555,79,-4,21,33,89,-90].
var arr = [1,2,31,24,-67,5,3,555,79,-4,21,33,89,-90];

//1) Найдите максимальное и минимальное значение массива.
var maxNumber = Math.max.apply(null, arr);
var minNumber = Math.min.apply(null, arr);
document.write('Найбільше число: '+maxNumber+'; Найменше число: '+minNumber+'<br>');
//Синтаксис ES6
const maxNum = Math.max(...arr);
const minNum = Math.min(...arr);
document.write(`Найбільше число: ${maxNum}; Найменше число: ${minNum}<br>`);

//2) Все положительные и четные числа запишите в другой массив.
const newArr = arr.filter( n => n>0 && n%2 == 0 );
document.write(`Позитивні та парні числа: ${newArr}`);
//Результаты выведите на экран.
