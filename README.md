# Denali Mailer

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

An awesome addon built on the Denali framework.

## Usage

Install within your app:

```
npm install --save denali-mailer
```

Create a mailer you'd like to use:

```js
// app/mailers/welcome/mailer.js
import { Mailer } from 'denali-mailer';

export default WelcomeMailer extends Mailer {
  from = 'myemail@something.com';

  to(data) {
    return data.email;
  }
}
```

And define your templates in `app/mailers/welcome/tempalte.{html,txt}`
which get access to the data via ejs.

Use in your action via `this.service('mailer')`:

```js
import ApplicationAction from './application';

export default class IndexAction extends ApplicationAction {

  serializer = false;

  respond() {
    let mailer = this.service('mailer');
    let data = { email: 'hello@user.com' };
    
    mailer.send('welcome', data);
    
    return { message: 'Welcome to Denali!' };
  }

}
```


## Developing

1. Clone the repo down
2. `npm install`
3. `denali server`
4. Hit [localhost:3000](http://localhost:3000)


## Tests

```sh
$ denali test
```

[npm-url]: https://npmjs.org/package/denali-mailer
[npm-image]: https://img.shields.io/npm/v/denali-mailer.svg?style=flat-square

[travis-url]: https://travis-ci.org/denali-js/denali-mailer
[travis-image]: https://img.shields.io/travis/denali-js/denali-mailer/master.svg?style=flat-square