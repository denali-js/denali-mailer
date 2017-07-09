import Promise from 'bluebird';

export default class Mailer {

  get logger() {
    return this.container.lookup('app:logger');
  }

  to(data) {
    return data.to;
  }

  from(data) {
    return data.from || this.container.config.mailer.from || null;
  }

  subject(data) {
    return data.subject || null;
  }

  html(data) {
    let template = this.container.lookup(`mailer:${ this.name }/template.html.js`);
    return template ? template(data) : null;
  }

  text(data) {
    let template = this.container.lookup(`mailer:${ this.name }/template.txt.js`);
    return template ? template(data) : null;
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
    if (!options.html && !options.text) {
      throw new Error(`No templates found for "${ this.name }" mailer.`);
    }
    let transport = this.container.lookup('mailer-transport:application');
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
