import defaults from 'lodash/defaults';
import TestTransport from '../app/mailer-transports/test';

export default function environmentConfig(environment, appConfig) {
  if (environment === 'test') {
    appConfig.mailer = defaults(appConfig.mailer, {
      transport() {
        return new TestTransport();
      }
    });
  }
}
