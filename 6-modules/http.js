/*
const http = require('http');

const PORT = 3000;

const requestHandler = (request, response) => {
		const { method, url } = request;
		console.log(`Получен ${method}-запрос на ${url}`);
		response.write('Hello Node.js');
		response.end('Bye!');
};

const server = http.createServer(requestHandler);

server.listen(PORT, 'localhost', () => {
		console.log(`Сервер запущен на порту ${PORT}`);

		В качестве колбэка данный метод получает функцию requestHandler с двумя параметрами request и response (имена могут быть любыми другими)

request хранит информацию о запросе
response отвечает за отправку ответа
Наш requestHandler выводит в консоль метод запроса и адрес запрашиваемого ресурса, а также в ответ отправляет сообщения Hello from Node.js и Bye!.
response.write() пишет в тело ответа сообщение, а respone.end() сообщает серверу, что заголовки и тело ответа записаны и его можно отправлять.
NB! response.end() должен завершать каждый ответ. Без этого обработка запроса "зависнет" — запрос будет получен, но не будет до конца обработан.
});
Метод listen сервера запускает его и он начинает прослушивать определенный порт в ожидании соединений.
Он имеет несколько сигнатур, в нашем случае он принимает три параметра:
локальный порт, локальный адрес и колбэк-функцию, которая запускается при начале прослушивания подключений.

Запустите файл с кодом, откройте браузер и перейдите по адресу localhost:3000/some/page. NB! Для того, чтобы запустить сервер с другим кодом, его нужно остановить и запустить заново.
Мы уже знаем, как завершить процесс Node.js. На одном порту одновременно можно запустить только один сервер.
*/
// const http = require('http');

// const PORT = 3000;

// const requestHandler = (request, response) => {
//     const { method, url } = request;
//     const heading = `<h1 style="color: red">${url} page</h1>`;
//     const content = `<div style="background-color: green; width: 100px; height: 100px">Green block 100px x 100px</div>`;
//     console.log(`Получен ${method}-запрос на ${url}`);
//     response.write(heading);
//     response.end(content);
// };

// const server = http.createServer(requestHandler);

// server.listen(PORT, 'localhost', () => {
//     console.log(`Сервер запущен на порту ${PORT}`);
// });

const http = require('http');
const fs = require('fs');
// now we put the data throw chunks
http.createServer((req, res) => {

	const fileStream = fs.createReadStream('./test.txt', 'utf-8');

	fileStream.on('open', () => {
		fileStream.pipe(res);
	})

	fileStream.on('error', (err) => {
		res.end(err)
	})

}).listen(3000)
