
module.exports = {

    Element: function (tagName, children, properties) {
        return {
            'type': "element",
            'tagName': tagName || "div",
            'children': children || [],
            'properties': {},
        };
    },

    // 普通的文本块
    Text: function (params) {
        return Element(
            
        );
    },
    Link: function () {

    },



}
