import { Mailer } from 'denali-mailer';

export default class HelloWorld extends Mailer {

  from = 'support@example.com';

  subject = 'Hello World!';

}
