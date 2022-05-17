/*
Предположим, что мы хотим использовать наш объект user в других модулях. Для этого нам нужно экспортировать его из user.js. Для этого есть несколько способов:

1. Записать значение в качестве свойства объекта exports, либо module.exports:
// user.js
const user = {
    name: 'Ann',
    age: 23,
    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    }
};
// работает так же, как и module.exports.user = user;
exports.user = user;

// otherFile.js

то же самое, что и
const userModuleExport = require('./user.js');
const user = userModuleExport.user;

2. Перезаписать сам объект module.exports (в этом случае необходимо использовать именно module.exports, т.к. перезапись exports не приведет к желаемому результату):
// user.js
const user = {
    name: 'Ann',
    age: 23,
    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    }
};
// exports = user не сработает 
module.exports = user;

// otherFile.js
const user = require('./user.js');
user.sayHi(); // Hi! My name is Ann

3. Также экспортируемое значение нет необходимости предварительно записывать в переменную, если оно не используется где-то еще:

// user.js
module.exports = {
    name: 'Ann',
    age: 23,
    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    }
};

// otherFile.js
const user = require('./user.js');
user.sayHi(); // Hi! My name is Ann

4. module.exports можно перезаписать не только объектом, но и примитивом:

// a.js
module.exports = 42;

// otherFile.js
const answer = require('./a.js');
console.log(answer); //42
*/
const { user } = require('./user.js');
user.sayHi(); // Hi! My name is Ann