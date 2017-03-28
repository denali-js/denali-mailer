import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { Blueprint } from 'denali-cli';

export default class MailerBlueprint extends Blueprint {
  static blueprintName = 'mailer';
  static description = 'Generate a basic mailer to customize';

  params = [ 'name' ];

  locals({ name }) {
    return {
      name,
      className: upperFirst(camelCase(name))
    };
  }
}
