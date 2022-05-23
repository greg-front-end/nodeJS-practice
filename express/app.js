const http = require('http');
const { readFile } = require('fs/promises');
const path = require('path');

const getFile = async (paths) => {
  try {
    return await readFile(path.join(__dirname, paths), { encoding: 'utf-8' })
  } catch (error) {
    console.log(error)
  }
};
const server = http.createServer((req, res) => {
  // here we say browser what we are sending back 
  // we can send text, plain, html, css, json, img...
  const url = req.url;

  switch (url) {
    case '/':
      getFile('navbar-app/index.html')
        .then(home => {
          res.writeHead(200, { 'content-type': 'text/html' })
          res.write(home);
          // Every response should be end so it is IMPORTANT
          res.end();
        })
        .catch(err => {
          return err
        })
      break;
    case '/about':
      res.writeHead(200, { 'content-type': 'text/html' })
      res.write('<h1>It\'s about page</h1>')
      res.end();
      break;
    case '/styles.css':
      getFile('navbar-app/styles.css')
        .then(home => {
          res.writeHead(200, { 'content-type': 'text/css' })
          res.write(home);
          // Every response should be end so it is IMPORTANT
          res.end();
        })
        .catch(err => {
          return err
        })
      break;
    case '/browser-app.js':
      getFile('navbar-app/browser-app.js')
        .then(home => {
          res.writeHead(200, { 'content-type': 'text/js' })
          res.write(home);
          // Every response should be end so it is IMPORTANT
          res.end();
        })
        .catch(err => {
          return err
        })
      break;
    case '/logo.svg':
      getFile('navbar-app/logo.svg')
        .then(home => {
          res.writeHead(200, { 'content-type': 'image/svg+xml' })
          res.write(home);
          // Every response should be end so it is IMPORTANT
          res.end();
        })
        .catch(err => {
          return err
        })
      break;
    default:
      res.writeHead(404, { 'content-tyep': 'text/html' })
      res.write(`<h1>The page don\'t found...</h1>
                <a href="/">Go back home page</a>
                `)
      res.end();
  }
})

server.listen(3000);