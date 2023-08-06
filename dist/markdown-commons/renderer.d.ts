import { marked } from 'marked/marked.min.js';
import { MarkedOptions } from './options';
/**
 * Renderer
 */
export declare class Renderer extends marked.Renderer {
    options: MarkedOptions;
    allTagStyles: {};
    constructor(options: MarkedOptions);
    /**
      if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }
  
      code = code.replace(/\n$/, '') + '\n';
  
      if (!lang) {
        return '<pre><code>'
            + (escaped ? code : escape(code, true))
            + '</code></pre>\n';
      }
  
      return '<pre><code class="'
          + this.options.langPrefix
          + escape(lang)
          + '">'
          + (escaped ? code : escape(code, true))
          + '</code></pre>\n';
    }
  
    blockquote(quote) {
      const styleClass = this.genStyleClassAttrForTag('blockquote');
      return `<blockquote${styleClass}>\n${quote}</blockquote>\n`;
    }
  
    html(html) {
      return html;
    }
  
    heading(text, level, raw, slugger) {
      const styleClass = this.genStyleClassAttrForTag('h');
      if (this.options.headerIds) {
        const id = this.options.headerPrefix + slugger.slug(raw);
        return `<h${level} id="${id}"${styleClass}>${text}</h${level}>\n`;
      }
  
      // ignore IDs
      return `<h${level}${styleClass}>${text}</h${level}>\n`;
    }
  
    hr() {
      const styleClass = this.genStyleClassAttrForTag('hr');
      return this.options.xhtml ? '<hr${styleClass}/>\n' : '<hr${styleClass}>\n';
    }
  
    list(body, ordered, start) {
      const type = ordered ? 'ol' : 'ul',
          startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
      const styleClass = this.genStyleClassAttrForTag(type);
      return '<' + type + startatt + '${styleClass}>\n' + body + '</' + type + '>\n';
    }
  
    listitem(text) {
      const styleClass = this.genStyleClassAttrForTag('li');
      return `<li${styleClass}>${text}</li>\n`;
    }
  
    checkbox(checked) {
      return '<input '
          + (checked ? 'checked="" ' : '')
          + 'disabled="" type="checkbox"'
          + (this.options.xhtml ? ' /' : '')
          + '> ';
    }
  
    paragraph(text) {
      const styleClass = this.genStyleClassAttrForTag('p');
      return `<p${styleClass}>${text}</p>\n`;
    }
  
    table(header, body) {
      if (body) {
        const styleClass = this.genStyleClassAttrForTag('tbody');
        body = `<tbody${styleClass}>${body}</tbody>`;
      }
  
      const tablestyleClass = this.genStyleClassAttrForTag('table');
      const theadstyleClass = this.genStyleClassAttrForTag('thead');
      return '<table${tablestyleClass}>\n'
          + '<thead${theadstyleClass}>\n'
          + header
          + '</thead>\n'
          + body
          + '</table>\n';
    }
  
    tablerow(content) {
      const styleClass = this.genStyleClassAttrForTag('tr');
      return `<tr${styleClass}>\n${content}</tr>\n`;
    }
  
    tablecell(content, flags) {
      const type = flags.header ? 'th' : 'td';
      const styleClass = this.genStyleClassAttrForTag(type);
      const tag = flags.align
          ? `<${type} align="${flags.align}"${styleClass}>`
          : `<${type}${styleClass}>`;
      return tag + content + `</${type}>\n`;
    }
  
    strong(text) {
      const styleClass = this.genStyleClassAttrForTag('strong');
      return `<strong${styleClass}>${text}</strong>`;
    }
  
    em(text) {
      const styleClass = this.genStyleClassAttrForTag('em');
      return `<em${styleClass}>${text}</em>`;
    }
  
    codespan(text) {
      const styleClass = this.genStyleClassAttrForTag('code');
      return `<code${styleClass}>${text}</code>`;
    }
  
    br() {
      const styleClass = this.genStyleClassAttrForTag('br');
      return this.options.xhtml ? `<br${styleClass}/>` : `<br${styleClass}>`;
    }
  
    del(text) {
      const styleClass = this.genStyleClassAttrForTag('del');
      return `<del${styleClass}>${text}</del>`;
    }
  
    link(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }
      let out = '<a href="' + href + '"' + this.genStyleClassAttrForTag('a');
      if (title) {
        out += ' title="' + title + '"';
      }
      out += '>' + text + '</a>';
      return out;
    }
  
    image(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }
  
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${title}"`;
      }
      out += this.genStyleClassAttrForTag('img') + this.options.xhtml ? '/>' : '>';
      return out;
    }
  
    text(text) {
      return text;
    }
  
  **/
    genStyleClassesForTag(tag: any): string;
    genStyleClassAttrForTag(tag: any): string;
    initStylesClassesForTags(prefix: any): void;
    _renderExtendedMarkdownBoxhtmlStart(type: any, param: any): string;
    _renderExtendedMarkdownBoxStart(type: any, param: any): string;
    _renderExtendedMarkdownBoxEnd(type: any, param: any): string;
    _renderExtendedMarkdownToggler(type: any, attr: any): string;
    _renderExtendedMarkdownTogglerAppend(type: any, attr: any): string;
    _renderExtendedMarkdownTOC(type: any, attr: any): string;
    _renderExtendedMarkdownSplitter(type: any, attr: any, first: any, second: any): string;
}
