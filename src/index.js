const unified = require('unified');
const vfile = require('to-vfile');
const report = require('vfile-reporter');

const parse = require('@starptech/rehype-webparser');
const toHtml = require('hast-util-to-html');

const yuquePlugin = require('../plugin/yuque_render');
const yueuqIndent = require('../plugin/yuque_indent');
const yuqueLakeId = require('../plugin/yuque_lakeid');
const toVfile = require('to-vfile');

function stringify() {
    this.Compiler = compiler;

    function compiler(tree) {
        return toHtml(tree);
    }
}

const processor = unified()
    .use(parse)
    .use(yuqueLakeId)
    .use(yueuqIndent)
    .use(yuquePlugin)
    .use(stringify);


// process.stdin.pipe(stream(processor)).pipe(process.stdout);

console.log('1111');
processor.process(vfile.readSync('assets/test2.html'),
    function (err, file) {
        // console.log(file);
        if (err) throw (err);
        console.error(report(file));
        file.path = './dist/a';
        file.extname = '.html';
        vfile.writeSync(file);
    }
);
