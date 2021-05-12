import { visit, SKIP, CONTINUE } from 'unist-util-visit'

import util from '../util/util.js'
import lakeParser from './yuque.js'


function yuque() {
    return transformer;
    function transformer(tree) {
        visit(tree, (node) => node.tagName == 'card', visitor);
        function visitor(node, index, parent) {
            console.log(`type=>${node.type}, ${node.tagName}, index=>${index}, parent=>${parent.type}, ${parent.tagName}`); //,parent);

            const child = cardHandler(node.properties);
            parent.children[index] = child;
            return SKIP;
        };
        console.log('good');
    }
}

function cardHandler(card) {
    if (card.name == 'hr') {
        return util.Element({
            tagName: 'hr',
        });
    }
    var valueStr = card.value.substring(5);
    var jsonStr = decodeURIComponent(valueStr);
    var json = JSON.parse(jsonStr);
    return customBuilder(card.type, card.name, json);
}

function customBuilder(type, name, data) {
    switch (name) {
        case 'table':
            return lakeParser(data.html);
        case 'checkbox':
            return util.Element({
                tagName: "input",
                properties: {
                    type: "checkbox",
                    checked: data,
                },
            });
        case 'image':
            return util.Element({
                tagName: "img",
                properties: {
                    src: data.src,
                },
            });
        case 'bilibili':
            return util.Element({
                tagName: "iframe",
                properties: {
                    src: data.url,
                    width: "95%",
                    height: data.height,
                },
            });
        case 'thirdparty':
            if (data['entrance'] == 'bilibili') {
                return util.Element({
                    tagName: "iframe",
                    properties: {
                        src: data.url,
                        width: "95%",
                        height: data.height,
                    },
                });
            }
        case 'localdoc':
            return util.Element({
                tagName: "iframe",
                properties: {
                    src: data.src,
                    width: "95%",
                    height: "600",
                },
            });
        case 'codeblock':
            return util.Element({
                tagName: "pre",
                children: [
                    util.Text(data.code),
                ],
                properties: {},
            });
        case 'math':
        case 'mindmap':
        case 'flowchart2':
        case 'diagram':
            return util.Element({
                tagName: "img",
                properties: data,
            });
        default:
            return util.Text(`NOT SUPPORTED: ${name}`);
    }
    return util.Text(`Not supported card: ${type}->${name}`);
}

export default yuque;