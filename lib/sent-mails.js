export default function sentMailsFor(applicationAcceptanceTest) {
  let transport = applicationAcceptanceTest.lookup('mailer-transport:application');
  return transport.transporter.sentMails;
}
