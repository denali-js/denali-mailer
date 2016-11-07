import nodemailer from 'nodemailer';
import Promise from 'bluebird';

export default class Mailer {

  get logger() {
    return this.container.logger;
  }

  to(data) {
    return data.to;
  }

  from(data) {
    return data.from || this.container.config.mailer.from || null;
  }

  subject = null;

  html(data) {
    let template = this.container.lookup(`mailer:${ this.name }/template.html`);
    return template(data);
  }

  text(data) {
    let template = this.container.lookup(`mailer:${ this.name }/template.txt`);
    return template(data);
  }

  constructor(name, container) {
    this.name = name;
    this.container = container;
  }

  async send(data) {
    let options = await Promise.props({
      to: result(this, 'to', data),
      from: result(this, 'from', data),
      subject: result(this, 'subject', data),
      html: result(this, 'html', data),
      text: result(this, 'text', data)
    });
    let transport = this.container.lookup('mailer-transport:application');
    if (!transport) {
      // You can define the configuration object at config.mailer.transport,
      // and rely on nodemailer's dynamic plugin loading. The config.mailer.transport
      // is a function it will be executed and it's return value used.
      // See https://github.com/nodemailer/nodemailer#send-using-a-transport-plugin
      let mailConfig = this.container.config.mailer;
      transport = nodemailer.createTransport(result(mailConfig, 'transport'));
      this.container.register('mailer-transport:application', transport);
    }
    let response = await Promise.fromNode((cb) => transport.sendMail(options, cb));
    this.logger.info(`mailer:${ this.name } sent to ${ options.to }`);
    return response;
  }

  modelFor(type) {
    return this.container.lookup(`model:${ type }`);
  }

}

function result(obj, prop, ...args) {
  let value = obj[prop];
  if (typeof value === 'function') {
    value = value.call(obj, ...args);
  }
  return value;
}
