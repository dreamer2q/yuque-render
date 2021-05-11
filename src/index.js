import unified from 'unified'
import { reporter } from 'vfile-reporter'
import parse from '@starptech/rehype-webparser'
import toHtml from 'hast-util-to-html'
import { toVFile } from 'to-vfile'

import yuquePlugin from '../plugin/yuque_render.js'
import yuqueIndent from '../plugin/yuque_indent.js'
import yuqueLakeId from '../plugin/yuque_lakeid.js'

import fs from 'fs';


function stringify() {
    this.Compiler = compiler;

    function compiler(tree) {
        return toHtml(tree);
    }
}

const processor = unified()
    .use(parse)
    .use(yuqueLakeId)
    .use(yuqueIndent)
    .use(yuquePlugin)
    .use(stringify);


console.log('1111');
processor.process(
    toVFile.readSync('assets/test2.html'),
    function (err, file) {
        // console.log(file);
        if (err) throw (err);
        console.error(reporter(file));
        // file.path = './dist/a';
        // file.extname = '.html';
        // console.log(file.contents);
        // toVFile.writeSync(file);

        fs.writeFileSync("dist/a.html", file.contents);
    },
);
