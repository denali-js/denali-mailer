import Funnel from 'broccoli-funnel';
import MergeTrees from 'broccoli-merge-trees';
import Filter from 'broccoli-filter';
import ejs from 'ejs';

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

export default function build(appTree) {
  let textTemplates = new Funnel(appTree, {
    include: [ 'app/mailers/*/template.txt' ]
  });
  let htmlTemplates = new Funnel(appTree, {
    include: [ 'app/mailers/*/template.html' ]
  });
  let compiledTextTemplates = new TextTemplateCompiler(textTemplates);
  let compiledHtmlTemplates = new HtmlTemplateCompiler(htmlTemplates);
  return new MergeTrees([ appTree, compiledTextTemplates, compiledHtmlTemplates ], { overwrite: true });
}
