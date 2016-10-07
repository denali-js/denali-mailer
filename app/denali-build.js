import Funnel from 'broccoli-funnel';
import MergeTree from 'broccoli-merge-tree';
import Filter from 'broccoli-filter';
import ejs from 'ejs';

class TemplateCompiler extends Filter {
  extensions = [ 'txt', 'html' ];
  targetExtension = '.js';

  processString(contents) {
    return `export default ${ ejs.compile(contents).toString() }`;
  }
}

export default function build(appTree) {
  let templates = new Funnel(appTree, {
    include: [ 'app/mailers/*/template.{html,txt}' ]
  });
  let compiledTemplates = new TemplateCompiler(templates);
  return new MergeTree([ appTree, compiledTemplates ], { overwrite: true });
}
