
const visit = require('unist-util-visit');
const visitp = require('unist-util-visit-parents');
const util = require('../util/util')

function yuque() {
    return transformer;
    function transformer(tree) {
        visit(tree, (node) => node.tagName == 'card', visitor);
        function visitor(node, index, parent) {
            console.log(`type=>${node.type}, ${node.tagName}, index=>${index}, parent=>${parent.type}, ${parent.tagName}`); //,parent);

            var children = [];
            // var child;
            // if (node.children.length == 0) {
            // 使用properties
            // child = propertyHandler(node.properties);
            // } else {
            // var element = node.children[0];
            var child = cardHandler(node.properties);
            // }
            // children = [child];
            // node.children = children;
            parent.children[index] = child;
            return visit.SKIP;
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
    switch (type) {
        case 'inline':
            if (name == 'checkbox') {
                // return Element('input', [], {
                // "type": "checkbox",
                // "checked": data,
                // });
                return util.Element({
                    tagName: "input",
                    properties: {
                        type: "checkbox",
                        checked: data,
                    },
                });
            }
            break;
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

module.exports = yuque
