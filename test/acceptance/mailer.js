import test from 'ava';
import { AppAcceptanceTest } from 'denali';
import { sentMailsFor } from 'denali-mailer';

test('Mailer > sends an email to the configured email transport', async (t) => {
  let app = new AppAcceptanceTest();
  await app.post('/send-mail', {
    to: 'foo@example.com'
  });

  let sentMails = sentMailsFor(app);
  t.is(sentMails.length, 1);
  t.is(sentMails[0].envelope.to[0], 'foo@example.com');
  t.is(sentMails[0].envelope.from, 'support@example.com');
  t.is(sentMails[0].subject, 'Hello World!');
  t.is(sentMails[0].htmlContent().trim(), '<p>Hello world!</p>');
  t.is(sentMails[0].textContent().trim(), 'Hello world!');
});

// subject: 'Hello world, my name is Dave',
// html: '<p>My name is Dave, what is yours?</p>',
// text: 'My name is Dave, what is yours?'