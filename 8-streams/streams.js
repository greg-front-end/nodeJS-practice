/*
  Поток чтения (Readable stream)
Поток чтения, как понятно из его названия, используется для чтения данных. Источником данных может быть что угодно: ввод пользователя, файл, входящий запрос пользователя при обработке на сервере, другой поток, асинхронный итератор и т.д.

Создадим программу, которая будет читать достаточно большой файл и выводить его содержимое в консоль. Для этого используем модуль fs, но вместо метода readFile() используем метод createReadStream(), параметром которого укажем название файла source.txt, из которого будем читать информацию. Так как файл лежит в той же директории, что и файл с кодом, путь к файлу прописывать не обязательно.

const fs = require('fs');
const readableStream = fs.createReadStream('source.txt');
У потока чтения есть событие data, которое генерируется, когда стрим прочитал порцию данных и готов отдать ее потребителю этих данных. При наступлении этого события выведем поступившую часть данных в консоль:

const fs = require('fs');
const readableStream = fs.createReadStream('source.txt');
readableStream.on('data', chunk => console.log(chunk));
В консоли вместо текста объекты Buffer. Раньше эту проблему мы решали при помощи метода data.toString(), но преобразовать Buffer в строку можно и другим способом, указав вторым параметром метода createReadStream() кодировку 'utf-8'.

Как убедиться, что данные приходят по частям?
Выведем в консоль не сами данные, а длину каждой пришедшей части данных

const fs = require('fs');
const readableStream = fs.createReadStream('source.txt');
readableStream.on('data', chunk => console.log(chunk.length));
Если файл с данными достаточно большой, видно, что приходят они частями (чанками) размером 64кБ.

Чтобы все эти части собрать вместе, определим переменную datа. Её значением укажем пустую строку. Каждую пришедшую часть данных будем присоединять к datа.

const fs = require('fs');
const stream = fs.createReadStream('source.txt', 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
Так как мы имеем дело с потоком данных, нам нужно знать когда поток завершится. Для этого у стрима есть событие 'end'. Это событие срабатывает когда все данные уже переданы.
При наступлении события 'end' выведем в консоль сообщение и длину полученных данных:

const fs = require('fs');

const stream = fs.createReadStream('source.txt', 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log('End', data));
Обработаем возможную ошибку. При возникновении ошибки будет сгенерировано событие error. При наступлении ошибки выведем в консоль сообщение и текст ошибки. Чтобы вызвать ошибку, укажем несуществующее имя файла

const fs = require('fs');

const stream = fs.createReadStream('source2.txt', 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log('End', data));
stream.on('error', error => console.log('Error', error.message));

  Поток записи (Writable stream)
Поток записи, является противоположностью потока чтения. Он используется для записи данных. Записывать данные можно, к примеру: в стандартный поток вывода, файл, response при обработке на сервере, другой поток и т.д.

Если мы читаем данные по частям, логично записывать их тоже по частям.
Для этого создадим поток записи output

const fs = require('fs');
const output = fs.createWriteStream('destination.txt');
Если не создать файл, который указан в качестве пункта назначения наших данных, destination.txt, перед началом записи он будет создан автоматически.
Поток чтения назовём input и каждую часть данных, которую он отдает, будем записывать в файл при помощи метода output.write()

Сравните полученный код потока записи с кодом потока чтения - они создаются и используются сходным образом.

const fs = require('fs');

const input = fs.createReadStream('source.txt', 'utf-8');
const output = fs.createWriteStream('destination.txt');

input.on('data', chunk => output.write(chunk));
input.on('error', error => console.log('Error', error.message));

  Объединение потоков чтения-записи
Код из предыдущей части можно сделать ещё проще и лучше:

const fs = require('fs');

const input = fs.createReadStream('source.txt', 'utf-8');
const output = fs.createWriteStream('destination.txt');

input.pipe(output);
Несмотря на то, что кода стало меньше, работает он точно так же, как прежде.
Метод pipe(), имеющийся у каждого потока, можно использовать для объединения одних потоков с другими. Такие цепочки могут объединять несколько потоков.

Эту особенность метода pipe() используют, например, для сжатия файлов.

Импортируем zlib, и используем ее стандартный метод, который отвечает за сжатие файлов. Поток gzip является трансформирующим потоком: получает одни данные, преобразует их и возвращаёт другие данные.
После создания потока чтения создадим поток, который отвечает за сжатие файла:

const gzip = zlib.createGzip();
затем чего соединим поток сжатия и поток вывода:

input.pipe(gzip).pipe(output);
Полный код примера:

const fs = require('fs');
const zlib = require('zlib');

const input = fs.createReadStream('source.txt', 'utf-8');
const output = fs.createWriteStream('destination.txt.gz');
const gzip = zlib.createGzip();

input.pipe(gzip).pipe(output);
Есть довольно удобный способ объединения нескольких потоков, позволяющий использовать один обработчик ошибок — функция pipeline:

const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

const input = fs.createReadStream('source.txt', 'utf-8');
const output = fs.createWriteStream('destination.txt.gz');
const gzip = zlib.createGzip();

pipeline(
    input,
    gzip,
    output,
    err => {
        if (err) {
            // обрабатываем ошибки
        }
    }
);
*/
const fs = require('fs');
// const zlib = require('zlib');
// const { pipeline } = require('stream');

// const input = fs.createReadStream('source.txt', 'utf-8');
// const output = fs.createWriteStream('destination.txt.gz');
// const gzip = zlib.createGzip();

// pipeline(
//   input,
//   gzip,
//   output,
//   err => {
//     if (err) {
//       // обрабатываем ошибки
//     }
//   }
// );

const stream = fs.createReadStream('/source.txt');

stream.on('data', (data) => {
  console.log(data);
})
stream.on('error', (err) => console.log(err))
