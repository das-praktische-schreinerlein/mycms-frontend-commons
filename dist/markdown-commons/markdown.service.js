import { marked } from 'marked/marked.min.js';
import { DefaultOptions } from './options';
import { Renderer } from './renderer';
var MarkdownService = /** @class */ (function () {
    function MarkdownService(extensions) {
        var options = DefaultOptions.getDefault();
        var renderer = new Renderer(options);
        renderer.initStylesClassesForTags(options.stylePrefix);
        options.renderer = renderer;
        marked.setOptions(options);
        if (extensions) {
            extensions.forEach(function (extension) {
                marked.use({ extensions: [extension] });
            });
        }
        var walkTokens = function (token) {
            //console.error("token", token);
        };
        marked.use({ walkTokens: walkTokens });
    }
    MarkdownService.prototype.renderMarkdown = function (markdown) {
        var html = '';
        try {
            html = marked.parse(markdown);
            var tokens = marked.lexer(markdown);
            //console.error(tokens);
        }
        finally {
            // NOOP
        }
        return html;
    };
    return MarkdownService;
}());
export { MarkdownService };
//# sourceMappingURL=markdown.service.js.map