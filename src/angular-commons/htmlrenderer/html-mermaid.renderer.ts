import {AbstractHtmlRender} from './html.renderer';
import mermaid from 'mermaid';
import {Injectable} from '@angular/core';

@Injectable()
export class HtmlMermaidRenderer extends AbstractHtmlRender {
    name: string;

    constructor() {
        super('HtmlMermaidRenderer');
        this.configureMermaid();
    }

    protected configureMermaid() {
        const config = {
            theme: 'default',
            logLevel: 'fatal',
            securityLevel: 'strict',
            startOnLoad: false,
            arrowMarkerAbsolute: false,
            er: {
                diagramPadding: 20,
                layoutDirection: 'TB',
                minEntityWidth: 100,
                minEntityHeight: 75,
                entityPadding: 15,
                stroke: 'gray',
                fill: 'honeydew',
                fontSize: 12,
                useMaxWidth: true
            },
            flowchart: {
                diagramPadding: 8,
                htmlLabels: true,
                curve: 'basis'
            },
            sequence: {
                diagramMarginX: 50,
                diagramMarginY: 10,
                actorMargin: 50,
                width: 150,
                height: 65,
                boxMargin: 10,
                boxTextMargin: 5,
                noteMargin: 10,
                messageMargin: 35,
                messageAlign: 'center',
                mirrorActors: true,
                bottomMarginAdj: 1,
                useMaxWidth: true,
                rightAngles: false,
                showSequenceNumbers: false
            },
            gantt: {
                titleTopMargin: 25,
                barHeight: 20,
                barGap: 4,
                topPadding: 50,
                leftPadding: 75,
                gridLineStartPadding: 35,
                fontSize: 11,
                fontFamily: '"Open-Sans", "sans-serif"',
                numberSectionStyles: 4,
                axisFormat: '%Y-%m-%d',
                topAxis: false
            },
        };
        mermaid.initialize(config);
    }

    public postProcessHtml(parentSelector: string, args: {}): void {
        mermaid.init({noteMargin: 10}, parentSelector + ' .mermaid');
    }
}


