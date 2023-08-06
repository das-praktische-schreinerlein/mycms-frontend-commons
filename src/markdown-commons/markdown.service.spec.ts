/* tslint:disable:no-unused-variable */
import {MarkdownService} from './markdown.service';
import {MarkdownDefaultExtensions} from './extensions/markdown.extensions';

describe('MarkdownService', () => {
    const service = new MarkdownService(MarkdownDefaultExtensions);

    it('should parse render maarkdown', done => {
        // WHEN/THEN
        const src = `# Markdown

- li1
- li2

|*bla*|*bla*|
|-|-|
|bla|bla|
|bla|bla|

A Description List:
:   Topic 1   :  Description 1
: **Topic 2** : *Description 2*

<!---BOX.INFO blimblam --->
- li3
- li4

<!---/BOX.INFO blimblam --->

A Description List2:
:   Topic 2   :  Description 2
: **Topic 3** : *Description 3*

`;

        const rendered = `<h1 id="markdown">Markdown</h1>
<ul>
<li>li1</li>
<li>li2</li>
</ul>
<table>
<thead>
<tr>
<th><em>bla</em></th>
<th><em>bla</em></th>
</tr>
</thead>
<tbody><tr>
<td>bla</td>
<td>bla</td>
</tr>
<tr>
<td>bla</td>
<td>bla</td>
</tr>
</tbody></table>
<p>A Description List:</p>
<dl>
<dt>Topic 1</dt><dd>Description 1</dd>
<dt><strong>Topic 2</strong></dt><dd><em>Description 2</em></dd>
</dl><div class="md-infobox"><div class="md-infobox-ue">blimblam</div><div class="md-infobox-container"><ul>
<li>li3</li>
<li>li4</li>
</ul>
</div></div><p>A Description List2:</p>
<dl>
<dt>Topic 2</dt><dd>Description 2</dd>
<dt><strong>Topic 3</strong></dt><dd><em>Description 3</em></dd>
</dl>`;
        expect(service.renderMarkdown(src)).toBe(rendered);
        done();
    });

});
