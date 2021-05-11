
import { visit } from 'unist-util-visit'
// import { util } from '../util/util'
import util from '../util/util.js'

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

export default yuque
