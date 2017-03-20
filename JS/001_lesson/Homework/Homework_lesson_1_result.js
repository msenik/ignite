/*
Задача 1.
Создайте функцию find(arr, value), которая ищет в массиве arr значение value
и возвращает его номер, если найдено, или -1, если не найдено.
 */
//Спосіб 1:
function find(arr, value) {
  if (!Array.isArray(arr))
    throw new Error("Перший аргумент повинен бути масивом");
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

//Спосіб 2:
function find(arr, value) {
  return arr.indexOf(value);
}


/* Задача 2
var arr = [1, 90, 789, 56, 45, 34, 678, 78, -90, -6, 5, 3, 6];
Отсортируйте массив arr, используя алгоритм пузырьковой сортировки.
*/
var arr = [1, 90, 789, 56, 45, 34, 678, 78, -90, -6, 5, 3, 6];
var n = arr.length;
for (var i = 0; i < n - 1; i++) {
  for (var j = 0; j < n - 1 - i; j++) {
    if (arr[j + 1] < arr[j]){
      var t = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = t;
    }
  }
}
console.log(arr);


/*
Задача 3. Напишите функцию bigToSmall, которая будет принимать один аргумент arr (двухмерный массив). Ваше задание:
Привести двухмерный массив к одномерному.
Отсортировать массив в нисходящем порядке.
Использовать символ ‘>’ как разделитель при превращении массива в строку.
Например:
  bigToSmall([[1,2],[3,4],[5,6]])  "6>5>4>3>2>1"
  bigToSmall([[1,3,5],[2,4,6]])  "6>5>4>3>2>1"
  bigToSmall([[1,1],[1],[1,1]])  "1>1>1>1>1"
 */
function bigToSmall(arr) {
  var flatArr = arr.reduce(function(prevItem, item, i, arr) {
    return prevItem.concat(item);
  });
  return flatArr.sort(function(a, b) {
      return b - a;
    }).join(">");
}

//ES6 варіант
function bigToSmall(arr) {
  return arr
    .reduce((prevItem, item) => [...prevItem, ...item])
    .sort((a, b) => b - a)
    .join(">");
}
