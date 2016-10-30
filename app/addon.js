import { Addon } from 'denali';

export default class DenaliMailerAddon extends Addon {}

// Expose import API
export { default as Mailer } from '../lib/mailer';
export { default as sentMailsFor } from '../lib/sent-mails';
