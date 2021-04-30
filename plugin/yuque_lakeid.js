const visit = require('unist-util-visit');
const util = require('../util/util')

function yuque() {
    return transform;
    function transform(tree) {
        visit(tree, visitor);

        function visitor(node, index, parent) {
            var attr = node.properties;
            if (attr) {
                delete attr["dataLakeId"];
            }
            return visit.CONTINUE;
        }
    }
}

module.exports = yuque;
