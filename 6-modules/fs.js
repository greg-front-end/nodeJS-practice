/*
Модуль fs
Модуль fs (file system) нужен для работы с файлами и папками. 
Он умеет создавать и удалять файлы и папки, переименовывать их, записывать и считывать данные.

Импортируем fs:

const fs = require('fs')

Создадим папку. Для этого есть два метода:

асинхронный fs.mkdir
синхронный fs.mkdirSync

При работе с файловой системой рекомендуется использовать асинхронные методы, которые не блокируют поток выполнения.
Если папка или файл будут создаваться синхронно, выполнение кода остановится, пока они не будут созданы.
Такие паузы в выполнении кода нежелательны.

Создадим папку notes в текущей директории

const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'notes'), err => {
    if (err) throw err;
    console.log('Папка была создана');
});

Создадим файл mynotes.txt, содержащий текст Hello world внутри папки notes

const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    'Hello world',
    (err) => {
        if (err) throw err;
        console.log('Файл был создан');
    }
);

Дополним файл, записав в него ещё какую-то информацию

const fs = require('fs');
const path = require('path');

fs.appendFile(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    ' From append file',
    err => {
        if (err) throw err;
        console.log('Файл был изменен');
    }
);

Прочитаем информацию из файла

const fs = require('fs');
const path = require('path');

fs.readFile(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
);

Переименуем файл

const fs = require('fs');
const path = require('path');

fs.rename(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    path.join(__dirname, 'notes', 'notes.txt'),
    err => {
        if (err) throw err;
        console.log('Файл переименован');
    }
);
*/

/* 
  Task console notes
  Напишем простое консольное приложение Notes для работы с заметками.
  У приложения необходимо реализовать четыре метода

  create
  list
  view
  remove
  Метод create создаёт новую заметку в файле notes.json. У метода create два аргумента - название заметки и её содержание.
  Метод list выводит список заметок.
  Метод view выводит в консоль содержимое заметки, название которой передано в качестве аргумента.
  Метод remove удаляет заметку, название которой передано в качестве аргумента.
  Для вызова методов они указываются в качестве аргументов командной строки.
*/
const fs = require('fs');
const path = require('path');
const [command, title, content] = process.argv.slice(2);

const init = () => {
  if (!fs.existsSync(path.resolve(__dirname, 'notes.json'))) {
    fs.writeFile(
      path.join(__dirname, 'notes.json'),
      JSON.stringify([]),
      (err) => console.error(err)
    )
  }
}

const create = (title, content) => {
  init()
  fs.readFile(
    path.join(__dirname, 'notes.json'),
    (error, data) => {
      if (error) return console.error(error.message);
      const notes = JSON.parse(data);
      notes.push({ title, content });
      const json = JSON.stringify(notes);


      fs.writeFile(
        path.join(__dirname, 'notes.json'),
        json,
        (error) => {
          if (error) return console.error(error.message);
          console.log('Заметка создана');
        });
    },
  )
};

const list = () => {
  fs.readFile(
    path.resolve(__dirname, 'notes.json'),
    (err, data) => {
      if (err) return console.error(err)
      const notes = JSON.parse(data);
      notes.forEach((note, index) => console.log(`${index + 1} ${note.title}`))
    }
  )
}

const view = (title) => {
  fs.readFile(
    path.resolve(__dirname, 'notes.json'),
    (err, data) => {
      if (err) return console.error(err)
      const notes = JSON.parse(data)
      const note = notes.find(note => note.title === title)
      if (!note) console.log('Don\'t find the title')
      else console.log(note.content)
    }
  )
}

const remove = (title) => {
  fs.readFile(
    path.resolve(__dirname, 'notes.json'),
    (err, data) => {
      if (err) return console.error(err)
      let notes = JSON.parse(data)
      notes = notes.filter(note => note.title !== title)
      const json = JSON.stringify(notes)

      fs.writeFile(
        path.resolve(__dirname, 'notes.json'),
        json,
        (err) => {
          if (err) return console.error(err)
          console.log('The note was remove')
        }
      )
    }
  )
}

switch (command) {
  case 'list':
    list();
    break;
  case 'view':
    view(title);
    break;
  case 'create':
    create(title, content);
    break;
  case 'remove':
    remove(title);
    break;
  default: console.log('Неизвестная команда');
}

