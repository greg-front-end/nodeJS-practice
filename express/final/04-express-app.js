const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../navbar-app')))

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../navbar-app/index.html'))
})

app.get('/about', (req, res) => {
  res.status(200).send('<h1>About page</h1>')
})

app.get('*', (req, res) => {
  res.status(404).send('<h1>The page do not found...</h1> <a href="/">Go back home page</a>')
})

app.listen(3000, () => {
  console.log('The browser is listening on port 3000...');
})