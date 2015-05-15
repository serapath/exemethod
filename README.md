# exemethod
require('exemethod')(); // => npm | script | globalcli | localcli | required | browserify

It will tell your code how it was executed.

## Usage
```js
// [myscript.js]
function customlogger (msg, method) { return method; }

var exemethod = require('exemethod');

var method = exemethod(customlogger);

console.log(method);
```
will result in:
* `npm run myscript` => **npm**
  * (assumes myscript.js is executed in a [package.json].script)
* `./myscript.js` => **script**
  * (assumes `chmod +x myscript.js`)
* `npm install myscript -g` + `myscript` => **globalcli**
  * (assumes [package.json].bin field)
* `node usemyscript.js` => **required**
  * (assumes something like `require('./myscript.js')` in "usemyscript.js")
* `node ./myscript.js` => **localcli**
* `browserify myscript.js > b.js` => **browserify**
  * (assumes you load "b.js" in an html page (e.g. via *script tag*))
