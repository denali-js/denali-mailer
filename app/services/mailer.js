import { Service } from 'denali';

export default class MailerService extends Service {

  send(name, data) {
    let Mailer = this.container.lookup(`mailer:${ name }/mailer`);
    let mailer = new Mailer(name, this.container);
    mailer.send(data);
  }

}
