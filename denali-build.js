const { Builder } = require('denali-cli');
const path = require('path');
const fs = require('fs');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const Filter = require('broccoli-filter');
const ejs = require('ejs');

class TemplateCompiler extends Filter {
  processString(contents) {
    let options = { client: true };
    return `module.exports = ${ ejs.compile(contents, options).toString() }`;
  }
}

class TextTemplateCompiler extends TemplateCompiler {
  constructor() {
    super(...arguments);
    this.extensions = [ 'txt' ];
    this.targetExtension = 'txt.js';
  }
}

class HtmlTemplateCompiler extends TemplateCompiler {
  constructor() {
    super(...arguments);
    this.extensions = [ 'html' ];
    this.targetExtension = 'html.js';
  }
}

module.exports = class DenaliMailerBuilder extends Builder {

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

};
