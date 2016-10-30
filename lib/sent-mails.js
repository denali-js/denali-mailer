export default function sentMailsFor(applicationAcceptanceTest) {
  let transport = applicationAcceptanceTest.application.container.lookup('mailer-transport:application');
  return transport.sentMails;
}
