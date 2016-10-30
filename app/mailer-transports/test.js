export default class TestTransport {

  name = 'Test';

  sentMails = [];

  isIdle() {
    return true;
  }

  verify(callback) {
    setImmediate(() => {
      return callback(null, true);
    });
  }

  send(mail, callback) {
    if (this.options.keepBcc) {
      mail.message.keepBcc = true;
    }

    let message = mail.message.createReadStream();
    let chunks = [];
    let envelope = mail.data.envelope || mail.message.getEnvelope();

    this.emit('envelope', envelope);

    message.on('error', (err) => {
      setImmediate(() => {
        callback(err);
      });
    });

    message.on('data', (chunk) => {
      chunks.push(chunk);
      this.emit('data', chunk);
    });

    message.on('end', () => {
      setImmediate(() => {
        let messageId = (mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
        let bufferedMessage = Buffer.concat(chunks);
        let info = {
          envelope: mail.data.envelope || mail.message.getEnvelope(),
          messageId,
          message: bufferedMessage
        };
        this.sentMails.push(info);
        callback(null, info);
      });
    });

  }

}
