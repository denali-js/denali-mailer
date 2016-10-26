import Builder from 'denali/cli/builder';
import Funnel from 'broccoli-funnel';
import MergeTrees from 'broccoli-merge-trees';
import Filter from 'broccoli-filter';
import ejs from 'ejs';
import path from 'path';

class TemplateCompiler extends Filter {
  processString(contents) {
    let options = { client: true };
    return `export default ${ ejs.compile(contents, options).toString() }`;
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
  treeForApp() {
    let projectPath = path.join(this.project.dir, 'app');
    let textTemplates = new Funnel(projectPath, {
      include: [ 'app/mailers/*/template.txt' ]
    });
    let htmlTemplates = new Funnel(projectPath, {
      include: [ 'app/mailers/*/template.html' ]
    });
    let compiledTextTemplates = new TextTemplateCompiler(textTemplates);
    let compiledHtmlTemplates = new HtmlTemplateCompiler(htmlTemplates);

    return new MergeTrees([ projectPath, compiledTextTemplates, compiledHtmlTemplates ], { overwrite: true });
  }
}
