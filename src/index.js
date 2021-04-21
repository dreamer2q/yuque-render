const unified = require('unified');
// const stream = require('unified-stream')
// const markdown = require('remark-parse')
// const slug = require('remark-slug')
// const toc = require('remark-toc')
// const remark2rehype = require('remark-rehype')
// const doc = require('rehype-document')
// const html = require('rehype-stringify')
// const format = require('rehype-format');
const vfile = require('to-vfile');
const report = require('vfile-reporter')

// const visit = require('unist-util-visit');
const rehypeParse = require('rehype-parse');
// const rehype = require('rehype');
const rehypeStringify = require('rehype-stringify');

const testPlugin = require('../plugin/test');
const toVfile = require('to-vfile');

const processor = unified()
    .use(rehypeParse)
    .use(testPlugin)
    .use(rehypeStringify, {
        closeSelfClosing: true,
    })

// process.stdin.pipe(stream(processor)).pipe(process.stdout);

console.log('1111');
processor.process(vfile.readSync('assets/test.html'),
    function (err, file) {
        // console.log(file);
        if (err) throw (err);
        console.error(report(file));
        file.path = './dist/a'
        file.extname = '.html';
        vfile.writeSync(file);
    }
);
