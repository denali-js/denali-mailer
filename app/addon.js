import { Addon } from 'denali';

export default class DenaliMailerAddon extends Addon {}

// Expose import API
export { default as Mailer } from './mailer';

