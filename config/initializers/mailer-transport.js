import nodemailer from 'nodemailer';

export default {
  name: 'mailer-transport',
  initialize(application) {
    // You can define the configuration object at config.mailer.transport,
    // and rely on nodemailer's dynamic plugin loading. The config.mailer.transport
    // is a function it will be executed and it's return value used.
    // See https://github.com/nodemailer/nodemailer#send-using-a-transport-plugin
    let mailConfig = application.container.config.mailer;
    let transport = nodemailer.createTransport(result(mailConfig, 'transport'));
    application.container.register('mailer-transport:application', transport);
  }
};

function result(obj, prop, ...args) {
  let value = obj[prop];
  if (typeof value === 'function') {
    value = value.call(obj, ...args);
  }
  return value;
}
