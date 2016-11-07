import ApplicationAction from './application';

export default class SendMailAction extends ApplicationAction {

  serializer = false;

  respond(params) {
    let mailer = this.service('mailer');
    return mailer.send('hello-world', params);
  }

}
