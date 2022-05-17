/*
Для ввода и вывода информации (I/O - input/output) в Node.js существуют стандартные потоки ввода и вывода:

process.stdin - поток ввода
process.stdout - поток вывода
process.stderr - поток ошибки как разновидность потока вывода
Например, уже известный нам console.log() для вывода информации использует process.stdout.
*/

// standart output
/** const { stdout } = process; */
// stdout.write('Node.js');
// Метод stdout.write() принимает в качестве аргумента строку и выводит её в консоль.
//В отличие от console.log() он не добавляет автоматический перенос в конце строки. 
//При необходимости перенос строки \n можно добавить вручную.

// =====

// standart input
// const { stdin, stdout } = process;
// stdin.on('data', data => stdout.write(data));
/*
При помощи метода .on() мы подписываемся на событие 'data' объекта stdin.
Метод .on() принимает два параметра - название события 'data' и 
стрелочную функцию-обработчик data => stdout.write(data), которая выводит в консоль переданные данные.
*/

// Метод process.exit()
// Остановить выполнение программы можно нажав комбинацию славиш Ctrl + C или использовав метод process.exit().
// process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));
/*
process.exit() принимает необязательный аргумент exitCode, представленный целым числом. 
По умолчанию данный метод запускается с параметром exitCode === 0. 
Такое завершение процесса означает, что программа выполнена успешно и отработала без ошибок. 
Завершение процесса с любым другим exitCode, что работа программы завершилась ошибкой. 
Благодаря этому можно передать разные сообщения на выходе в зависимости от того, сработала программа как нужно, или нет.
*/
// process.on('exit', code => {
//   if (code === 0) {
//     stdout.write('Всё в порядке');
//   } else {
//     stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
//   }
// });

/*
Напишите программу, которая спрашивает у пользователя его имя, 
после ввода имени приветствует его, указывая имя, 
а затем прекращает свою работу и прощается с пользователем.
*/

const { stdin, stdout } = process;
// stdout.write('How is your name?\n');
// stdin.on('data', data => {
//   stdout.write('Hello ');
//   stdout.write(data);
//   process.on('exit', exitCode => {
//     if (exitCode === 0) stdout.write('Good luck!');
//     else stdout.write('Some thing is going wrong...');
//   })
//   process.exit();
// });

// Buffer

/*
Несмотря на то, что в предыдущем примере параметр data обработчика одноименного события похож на строку,
на самом деле он не является строкой.
При попытке воспользоваться методами строки мы получим ошибку:
stdin.on('data', data => {
    // После ввода текста в консоль и нажатия Enter получим TypeError: data.toUpperCase is not a function
    stdout.write('Cообщение в верхнем регистре: ');
    stdout.write(data.toUpperCase());
});

Если мы выведем в консоль тип переменной data, мы увидим object. 
Применив трюк со специальным свойством [[Class]] мы получим для data [object Uint8Array]. 
Поскольку process.stdin — это поток, он работает с данными в двоичном формате. 
Для работы с таким форматом данных в Node.js есть специальный объект Buffer, который и является подклассом Uint8Array(типизированный массив, хранящий 8-битные целые беззнаковые значения).
Данные, содержащиеся в буфере, можно привести к строке:
*/
// создадим буфер из строки, вторым параметром передав кодировку (по умолчанию будет использована utf-8)
// const myBuffer = Buffer.from('Hi Node.js!', 'utf-8');
// получим <Buffer 48 69 20 4e 6f 64 65 2e 6a 73 21>
// console.log(myBuffer);
// приведем к строке
// const bufferStringified = myBuffer.toString();
// Hi Node.js!
// console.log(bufferStringified);

// stdout.write('How is your name?\n');
// stdin.on('data', data => {
//   const dataStringified = data.toString();
//   stdout.write('Cообщение в верхнем регистре: ');
//   stdout.write(dataStringified.toUpperCase());
//   process.exit();
// });

// Задание
// Напишите программу, которая спрашивает у пользователя его имя, 
// после ввода имени возвращает указанное пользователем имя наоборот и прекращает работу.

// function exitHandler(options, exitCode) {
//   if (options.cleanup) console.log('clean');
//   if (exitCode || exitCode === 0) console.log(' I pressed crl + c\n');
//   if (options.exit) process.exit();
// }
// process.stdin.resume();
stdout.write('How is your name?\n');
stdin.on('data', data => {
  const dataReverse = data.toString().split('').reverse().join('')
  stdout.write('The name will be reverse: \n')
  stdout.write(dataReverse);
  process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
  });
  process.exit();
})


process.on('SIGINT', (code) => {
  console.log('Process exit event with code: ', code);
});
// process.on('SIGINT', exitHandler.bind(null, { exit: true }));
