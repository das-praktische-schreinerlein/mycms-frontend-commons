import { marked } from 'marked/marked.min.js';
export var DefaultOptions = {
    getDefault: function () {
        return {
            // from ngx-md
            breaks: false,
            gfm: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            tables: true,
            async: false,
            baseUrl: null,
            headerIds: true,
            headerPrefix: '',
            highlight: null,
            langPrefix: 'language-',
            mangle: true,
            renderer: new marked.Renderer(),
            sanitizer: null,
            silent: false,
            tokenizer: new marked.Tokenizer(),
            walkTokens: null,
            xhtml: false,
            // from marked for syntax
            /**
             highlight: function(code, lang) {
                      const hljs = require('highlight.js');
                      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                      return hljs.highlight(code, { language }).value;
                  },
             langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
             **/
            appBaseVarName: 'jshAppBase',
            stylePrefix: undefined
        };
    }
};
//# sourceMappingURL=options.js.map