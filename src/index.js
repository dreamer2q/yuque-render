// const unified = require('unified')
// const vfile = require('to-vfile')
// const report = require('vfile-reporter')
// const rehypeParse = require('rehype-parse')
// const rehypeStringify = require('rehype-stringify')
// import * as unified from 'unified'
import unified from 'unified'
import vfile from 'to-vfile'
import report from 'vfile-reporter'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'

// const yuquePlugin = require('../plugin/yuque_render');
// const yueuqIndent = require('../plugin/yuque_indent');

import yuquePlugin from '../plugin/yuque_render.js'
import yuqueIndent from '../plugin/yuque_indent.js'


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
