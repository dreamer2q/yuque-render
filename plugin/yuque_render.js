import { visit, SKIP, CONTINUE } from 'unist-util-visit'

import util from '../util/util.js'


function yuque() {
    return transformer;
    function transformer(tree) {
        visit(tree, (node) => node.tagName == 'card', visitor);
        function visitor(node, index, parent) {
            console.log(`type=>${node.type}, ${node.tagName}, index=>${index}, parent=>${parent.type}, ${parent.tagName}`); //,parent);

            // var children = [];
            const child = cardHandler(node.properties);
            parent.children[index] = child;
            return SKIP;
        };
        console.log('good');
    }
}

function propertyHandler(prop) {
    return {
        'type': 'text',
        'value': `${prop}`,
    };
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
        // case 'table':
        // console.log('table');
        // return lakeParser(data);
        // return util.Text('不支持的表格');
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
        case 'localdoc':
            return {
                "type": "text",
                "value": "localdoc",
            };
    }
    // return Text(`当前暂时不支持的标签: ${type}->${name}`);
    return util.Text(`Not supported card: ${type}->${name}`);
}

// function Element(tagName, children, properties) {
//     return {
//         "type": 'element',
//         'tagName': tagName || 'div',
//         'properties': properties || {},
//         'children': children,
//     }
// }

// function Text(value) {
//     return {
//         "type": "text",
//         "value": value,
//     };
// }

// module.exports = yuque

export default yuque;