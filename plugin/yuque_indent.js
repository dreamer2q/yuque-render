
import { visit, SKIP } from 'unist-util-visit'
import util from '../util/util.js'

/// fix yuque <li> indent
/// by wrapping in ul/ol
function yuque() {
    return transformer;
    function transformer(tree) {
        visit(tree, (node) => node.tagName == 'ul', visitor);
        visit(tree, (node) => node.tagName == 'ol', visitor);
        // visit(tree, (node) => node.tagName == 'ol', visitor);
        function visitor(node, index, parent) {
            var attr = node.properties;
            var indent = attr['dataLakeIndent'];
            if (indent) {
                indent = parseInt(indent, 10)
                node.children = buildIndent(
                    indent,
                    node.children,
                    node.tagName,
                    node.properties,
                );
                return SKIP;
            }
        }
    }
}

function buildIndent(intent, children, tagName, properties) {
    if (intent == 0) {
        return children;
    }
    return [
        util.Element({
            tagName: tagName,
            properties: properties,
            children: buildIndent(
                intent - 1,
                children,
                tagName,
                properties,
            ),
        })
    ];
}

// module.exports = yuque;
export default yuque;