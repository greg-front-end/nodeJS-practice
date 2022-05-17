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
