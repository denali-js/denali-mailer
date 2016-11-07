import { Service } from 'denali';
import Mailer from '../../lib/mailer';

export default class MailerService extends Service {

  send(name, data) {
    let MailerClass = this.container.lookup(`mailer:${ name }/mailer`) || Mailer;
    let mailer = new MailerClass(name, this.container);
    return mailer.send(data);
  }

}
