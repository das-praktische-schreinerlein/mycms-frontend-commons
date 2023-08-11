/* tslint:disable:no-unused-variable */
import {MarkdownService} from './markdown.service';
import {MarkdownDefaultExtensions} from './extensions/markdown.extensions';

describe('MarkdownService', () => {
    const service = new MarkdownService(MarkdownDefaultExtensions);

    it('should parse render default-markdown', done => {
         const src = `# Markdown

## Syntax

### list

- li1
- li2

### table

|*bla*|*bla*|
|-|-|
|bla|bla|
|bla|bla|
         `;
        const rendered = `<h1 id="markdown" class="md-h1">Markdown</h1>
<h2 id="syntax" class="md-h2">Syntax</h2>
<h3 id="list" class="md-h3">list</h3>
<ul class="md-ul">
<li class="md-li">li1</li>
<li class="md-li">li2</li>
</ul>
<h3 id="table" class="md-h3">table</h3>
<table class="md-table">
<thead class="md-thead">
<tr class="md-tr">
<th class="md-th"><em class="md-em">bla</em></th>
<th class="md-th"><em class="md-em">bla</em></th>
</tr>
</thead>
<tbody class="md-tbody"><tr class="md-tr">
<td class="md-td">bla</td>
<td class="md-td">bla</td>
</tr>
<tr class="md-tr">
<td class="md-td">bla</td>
<td class="md-td">bla</td>
</tr>
</tbody></table>
`;
        expect(service.renderMarkdown(src)).toBe(rendered);
        done();
    });


    it('should parse render dl-markdown', done => {
        const src = `# Markdown

## Syntax

### dl

A Description List:
:   Topic 1   :  Description 1
: **Topic 2** : *Description 2*

         `;
        const rendered = `<h1 id="markdown" class="md-h1">Markdown</h1>
<h2 id="syntax" class="md-h2">Syntax</h2>
<h3 id="dl" class="md-h3">dl</h3>
<p class="md-p">A Description List:</p>
<dl>
<dt>Topic 1</dt><dd>Description 1</dd>
<dt><strong class="md-strong">Topic 2</strong></dt><dd><em class="md-em">Description 2</em></dd>
</dl>`;
        expect(service.renderMarkdown(src)).toBe(rendered);
        done();
    });


    it('should parse render box-markdown', done => {
        const src = `# Markdown

## Syntax

### box

<!---BOX.INFO blimblam --->
- li3
- li4

<!---/BOX.INFO blimblam --->

`;
        const rendered = `<h1 id="markdown" class="md-h1">Markdown</h1>
<h2 id="syntax" class="md-h2">Syntax</h2>
<h3 id="box" class="md-h3">box</h3>
<div class="md-infobox"><div class="md-infobox-ue">blimblam</div><div class="md-infobox-container"><ul class="md-ul">
<li class="md-li">li3</li>
<li class="md-li">li4</li>
</ul>
</div></div>`;
        expect(service.renderMarkdown(src)).toBe(rendered);
        done();
    });

    it('should parse render splitter-markdown', done => {
        const src = `# Markdown

## Syntax

### splitter

- ubla :|: blum
- bla2 :|: blum2`;
        const rendered = `<h1 id="markdown" class="md-h1">Markdown</h1>
<h2 id="syntax" class="md-h2">Syntax</h2>
<h3 id="splitter" class="md-h3">splitter</h3>
<ul class="md-ul">
<li class="md-li"><label class="md-splitter1">ubla</label><span class="md-splitter2">blum</span></li>
<li class="md-li"><label class="md-splitter1">bla2</label><span class="md-splitter2">blum2</span></li>
</ul>
`;
        expect(service.renderMarkdown(src)).toBe(rendered);
        done();
    });

    it('should parse render toggler-markdown', done => {
        const src = `# Markdown

## Syntax

### toggler

nblimtext1
mblimtext2
<!---TOGGLER blim,icon --->
blimtext3
`;
        const rendered = `<h1 id="markdown" class="md-h1">Markdown</h1>
<h2 id="syntax" class="md-h2">Syntax</h2>
<h3 id="toggler" class="md-h3">toggler</h3>
<p class="md-p">nblimtext1
mblimtext2</p>
<div class="md-togglerparent md-togglerparent-blim" id="md-togglerparent-blim"></div><script>jshAppBase.get('UIToggler').appendToggler(".md-togglerparent-blim", ".md-container-blim", "icon");</script><p class="md-p">blimtext3</p>
`;
        expect(service.renderMarkdown(src)).toBe(rendered);
        done();
    });

});
