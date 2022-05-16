/*
В Node.js есть возможность запустить файл с определёнными аргументами командной строки. 
При запуске файла аргументы передаются после его имени. Например, при запуске
node test 1 2 3
1, 2, 3 - это аргументы. Как внутри кода получить доступ к переданным при запуске файла аргументам? 
Для этого используется свойство глобального объекта process - process.argv
*/
// console.log(process.argv.slice(2));

/*
Флаги
Чтобы иметь возможность отправлять аргументы в любом порядке или пропускать какие-то из них, 
аргументы командной строки можно пометить. Для этого используются флаги - слова или символы, 
которые указывают, что за ними следует аргумент командной строки. 
Перед флагами, как правило, ставят один или два дефиса, чтобы не перепутать их с аргументами.
 Например,
node test -m Hello
Чтобы получить аргумент с указанным флагом, напишем код:

const flagIndex = process.argv.indexOf('-m');
if (flagIndex !== -1) {
  const message = process.argv[flagIndex + 1];
  console.log(message);
}

Можно этот код преобразовать в функцию, получающую флаг аргумента и возвращающую его значение

function getValue(flag) {
    const flagIndex = process.argv.indexOf(flag);
    return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}
const message = getValue('-m');
console.log(message);

Практическое применение
На практике в случае, если вы пишете код для работы с аргументами командной строки самостоятельно, 
необходимо корректно обработать всевозможные ситуации — аргумент может отсутствовать, 
флаг может быть не передан, либо передан без значения, либо само наличие флага является булевым значением и т.д.
Для повышения удобства работы с аргументами командной строки, 
а также минимизации вероятности возникновения ошибок удобно использовать готовые решения, такие как minimist, commander, yargs и другие.

CLI options
Помимо пользовательских аргументов командной строки, можно передавать опции командной строки (CLI options). 
Опции командной строки передаются до пути к запускаемому файлу и модифицируют поведение Node.js. 
Например, можно отключить использование свойства __proto__. Так, запуск файла со следующим содержимым:

// test.js
const protoObj = {
    sayHi() {
        console.log('Hi!');
    }
};
const obj = {};
obj.__proto__ = protoObj;
obj.sayHi();
с опцией --disable-proto=throw

node --disable-proto=throw test
приведет к ошибке. Полный список опций можно посмотреть в документации - https://nodejs.org/dist/latest-v14.x/docs/api/cli.html#cli_options

Переменные окружения
Иногда нам нужно снаружи передать в код некое значение, которое будет использоваться нашим приложением. 
Например, мы хотим реализовать различное поведение приложения при запуске на "боевом" сервере и в процессе разработки. 
В этом нам могут помочь переменные окружения. Переменные окружения имеют синтаксис вида variable_name=variable_value и размещаются перед node ... 
Вот так при использовании терминала Bash можно передать переменную, которая будет показывать, в каком режиме сейчас запущено приложение:

PRODUCTION=false node test
А так при использовании терминала Powershell

$env:PRODUCTION="false"; node test
Доступ к таким переменным внутри кода можно получить через process.env:

const productionMode = process.env.PRODUCTION === "true";
if (productionMode) {
  console.log('Application is running in production mode');
  // do production things
} else {
  console.log('Application is running in development mode');
  // do dev things
}
*/

/*
Задание
Напишите программу, которая просит у пользователя ввести два числа, складывает эти числа, 
если запускается с флагом -s, или перемножает, если запускается с флагом -m, после чего завершает свою работу. 
Для ввода и вывода информации используйте стандартные потоки ввода/вывода. 
Пример работы (пользовательский ввод начинается с >)
*/

const { stdin, stdout, exit } = process;
const flag = process.argv[2];
const allowedFlags = ['-s', '-m'];

if (!allowedFlags.includes(flag)) {
  stdout.write('Pleace try again write with correct flags')
  exit();
}

stdout.write('Write two numbers with space\n')
stdin.on('data', data => {
  const string = data.toString();
  const arrStr = string.split(' ');
  const hasIncorrectLength = arrStr.length !== 2;
  const hasIncorrectValues = arrStr.some(numStr => Number.isNaN(+numStr));

  if (hasIncorrectLength || hasIncorrectValues) {
    stdout.write('Please write only numbers with spaces')
    exit();
  }

  const [num1, num2] = arrStr.map(num => +num);

  if (flag === '-s') {
    const sum = num1 + num2;
    stdout.write(`${num1} + ${num2} = ${sum}`)
  } else {
    const mult = num1 * num2;
    stdout.write(`${num1} * ${num2} = ${mult}`)
  }
  exit();
});



