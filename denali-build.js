import { Builder } from 'denali';
import path from 'path';
import fs from 'fs';
import Funnel from 'broccoli-funnel';
import MergeTrees from 'broccoli-merge-trees';
import Filter from 'broccoli-filter';
import ejs from 'ejs';

class TemplateCompiler extends Filter {
  processString(contents) {
    let options = { client: true };
    return `module.exports = ${ ejs.compile(contents, options).toString() }`;
  }
}

class TextTemplateCompiler extends TemplateCompiler {
  extensions = [ 'txt' ];
  targetExtension = 'txt.js';
}

class HtmlTemplateCompiler extends TemplateCompiler {
  extensions = [ 'html' ];
  targetExtension = 'html.js';
}

export default class DenaliMailerBuilder extends Builder {

  processParent(tree, dir) {
    if (fs.existsSync(path.join(dir, 'app', 'mailers'))) {
      let textTemplates = new Funnel(tree, {
        include: [ 'app/mailers/*/template.txt' ]
      });
      let htmlTemplates = new Funnel(tree, {
        include: [ 'app/mailers/*/template.html' ]
      });
      let compiledTextTemplates = new TextTemplateCompiler(textTemplates);
      let compiledHtmlTemplates = new HtmlTemplateCompiler(htmlTemplates);

      return new MergeTrees([ tree, compiledTextTemplates, compiledHtmlTemplates ], { overwrite: true });
    }
    return tree;
  }

}
