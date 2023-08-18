var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AbstractHtmlRender } from './html.renderer';
import mermaid from 'mermaid';
import { Injectable } from '@angular/core';
var HtmlMermaidRenderer = /** @class */ (function (_super) {
    __extends(HtmlMermaidRenderer, _super);
    function HtmlMermaidRenderer() {
        var _this = _super.call(this, 'HtmlMermaidRenderer') || this;
        _this.configureMermaid();
        return _this;
    }
    HtmlMermaidRenderer.prototype.configureMermaid = function () {
        var config = {
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
    };
    HtmlMermaidRenderer.prototype.postProcessHtml = function (parentSelector, args) {
        mermaid.init({ noteMargin: 10 }, parentSelector + ' .mermaid');
    };
    HtmlMermaidRenderer = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], HtmlMermaidRenderer);
    return HtmlMermaidRenderer;
}(AbstractHtmlRender));
export { HtmlMermaidRenderer };
//# sourceMappingURL=html-mermaid.renderer.js.map