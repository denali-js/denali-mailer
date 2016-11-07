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
    let message = mail.message.createReadStream();
    let chunks = [];

    message.on('error', (err) => {
      setImmediate(() => {
        callback(err);
      });
    });

    message.on('data', (chunk) => {
      chunks.push(chunk);
    });

    message.on('end', () => {
      setImmediate(() => {
        let messageId = (mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
        let bufferedMessage = Buffer.concat(chunks);
        let info = {
          messageId,
          envelope: mail.data.envelope || mail.message.getEnvelope(),
          subject: bufferedMessage.toString().match(/Subject: (.+)/)[1],
          rawMessage: bufferedMessage,
          htmlContent() {
            return this._extractMessagePart('text/html');
          },
          textContent() {
            return this._extractMessagePart('text/plain');
          },
          _parseMessage() {
            if (!this.parts) {
              let messageString = bufferedMessage.toString();
              let boundary = messageString.match(/boundary="(.+)"/)[1];
              this.parts = messageString.split(`\n--${ boundary }`).slice(1);
            }
          },
          _extractMessagePart(type) {
            this._parseMessage();
            let part = this.parts.find((p) => p.includes(`Content-Type: ${ type }`));
            let headerSeparator = '\r\n\r\n';
            return part ? part.split(headerSeparator).slice(1).join(headerSeparator) : null;
          }
        };
        this.sentMails.push(info);
        callback(null, info);
      });
    });

  }

}
