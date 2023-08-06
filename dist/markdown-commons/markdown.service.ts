import {marked} from 'marked/marked.min.js';
import {MarkdownExtension} from './extensions/markdown.extension';
import {DefaultOptions} from './options';
import {Renderer} from './renderer';

export class MarkdownService {
    constructor(extensions?: MarkdownExtension[]) {

        const options = DefaultOptions.getDefault();
        const renderer = new Renderer(options)
        renderer.initStylesClassesForTags(options.stylePrefix);
        options.renderer = renderer;
        marked.setOptions(options);

        if (extensions) {
            extensions.forEach(extension => {
                marked.use({ extensions: [extension] });
            })
        }
    }

    renderMarkdown(markdown: string): string {
        let html = '';
        try {
            html = marked.parse(markdown);
        } finally {
            // NOOP
        }

        return html;
    }
}
