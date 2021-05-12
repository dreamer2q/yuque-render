
import unified from 'unified'
import parse from '@starptech/rehype-webparser'

import yuquePlugin from '../plugin/yuque_render.js'
import yuqueIndent from '../plugin/yuque_indent.js'
import yuqueLakeId from '../plugin/yuque_lakeid.js'

export default function lakeParser(input) {
    let processor = unified()
        .use(parse)
        .use(yuqueLakeId)
        .use(yuqueIndent)
        .use(yuquePlugin);

    let tree =  processor.parse(input);
    return tree.children[0];
}




