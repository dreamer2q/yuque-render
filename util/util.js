const { stack } = require("vfile-message");

module.exports = {
    Element: function ({ tagName, children, properties }) {
        return {
            'type': "element",
            'tagName': tagName || "div",
            'children': children || [],
            'properties': properties || {},
        };
    },
    // 普通的文本块
    Text: function (text) {
        return {
            'type': 'text',
            'value': text,
        };
    },
    // 超链接卡片
    Link: function ({ src, children }) {
        return Element({
            tagName: 'a',
            children: children,
            properties: {
                'src': src,
            },
        });
    },
}
