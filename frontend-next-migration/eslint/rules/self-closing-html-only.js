module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Require self-closing for HTML tags only",
            category: "Best Practices",
            recommended: false
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {
            JSXOpeningElement(node) {
                const tagName = node.name.name;
                if (tagName && /^[a-z]/.test(tagName)) {
                    if (!node.selfClosing && node.parent && node.parent.children.length === 0) {
                        context.report({
                            node,
                            message: `HTML tag <${tagName}> should be self-closing.`,
                            fix(fixer) {
                                const startTag = context.getSourceCode().getText(node);
                                return fixer.replaceText(node, startTag.replace(/>$/, " />"));
                            }
                        });
                    }
                }
            }
        };
    }
};
