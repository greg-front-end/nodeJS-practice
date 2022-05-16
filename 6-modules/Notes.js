class Notes {
  constructor([title, content] = process.argv.slice(2)) {
    this.command = command;
    this.title = title;
    this.content = content;
    this.fs = require('fs');
    this.path = require('path');
  }

  init = () => {
    if (!this.fs.existsSync(this.path.resolve(__dirname, 'notes.json'))) {
      this.fs.writeFile(
        this.path.join(__dirname, 'notes.json'),
        JSON.stringify([]),
        (err) => console.error(err)
      )
    }
  }

  create = () => {
    this.init()
    this.fs.readFile(
      this.path.resolve(__dirname, 'notes.json'),
      (err, data) => {
        if (err) return console.error(err)
        const notes = JSON.parse(data)
        notes.push({ title: this.title, content: this.content })
        const json = JSON.parse(notes)

        this.fs.writeFile(
          this.path.join(__dirname, 'notes.json'),
          json,
          (err) => {
            if (err) return console.error(err)
            console.log('The note was created')
          }
        )
      }
    )
  }
}