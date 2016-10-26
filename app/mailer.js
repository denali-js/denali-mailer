import nodemailer from 'nodemailer';

export default class Mailer {

  to = null;

  from() {
    return this.container.config.mailer.from || null;
  }

  subject = null;

  html(data) {
    let template = this.container.lookup(`mailer:${ this.name }/template.html.js`);
    return template(data);
  }

  text(data) {
    let template = this.container.lookup(`mailer:${ this.name }/template.txt.js`);
    return template(data);
  }

  constructor(name, container) {
    this.name = name;
    this.container = container;
  }

  send(data) {
    return Promise.props({
      to: result(this, 'to', data),
      from: result(this, 'from', data),
      subject: result(this, 'subject', data),
      html: result(this, 'html', data),
      text: result(this, 'text', data)
    }).tap((options) => {

      // In test mode, just add the details of this email to our "sent" list so
      // tests can assert against it.
      if (this.container.config.environment === 'test') {
        this.emailsSent = this.emailsSent || [];
        this.emailsSent.push(options);

      } else {
        // Nodemailer provides our unified SMTP interface. You can supply your
        // own transport plugin instance directly at `config/smtp-transport.js`,
        let smtpTransport = this.container.lookup('config:smtp-transport');

        // Or you can just define the configuration object at config.mailer.transport,
        // and rely on nodemailer's dynamic plugin loading.
        // See https://github.com/nodemailer/nodemailer#send-using-a-transport-plugin
        if (!smtpTransport) {
          let mailConfig = this.container.config.mailer;
          smtpTransport = nodemailer.createTransport(mailConfig.transport);
          this.container.register('config:smtp-transport', smtpTransport);
        }
        return smtpTransport.sendMail(options);
      }
    }).then((options) => {
      this.logger.info(`mailer:${ this.name } sent to ${ options.to }`);
    });
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
