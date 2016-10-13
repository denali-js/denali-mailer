# Denali Mailer

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


## Developing

1. Clone the repo down
2. `npm install`
3. `denali server`
4. Hit [localhost:3000](http://localhost:3000)


## Tests

```sh
$ denali test
```
