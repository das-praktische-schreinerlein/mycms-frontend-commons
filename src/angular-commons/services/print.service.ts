import {Injectable} from '@angular/core';
import {LayoutUtils} from './layout.utils';

@Injectable()
export class PrintService {
    public printPreview(idRefFilter: string, classNameFilter ?: string, tagNameFilter ?: string,
                        width ?: number, height ?: number, printCssIdRegExp?: string): Window {
        const doc: Element = LayoutUtils.extractElementForFilter(document, idRefFilter, classNameFilter, tagNameFilter);
        if (!doc) {
            console.error('cant find printElement for print-preview (idRefFilter/classNameFilter/tagNameFilter)',
                idRefFilter, classNameFilter, tagNameFilter);
            return undefined;
        }

        const printWindow = this.openPrintPreviewWindow(width, height, 'print_preview');
        const printDocument = printWindow.document;
        const previewContainerId = 'printPreview';
        this.copyContentToPrintPreviewDocument(printDocument, doc, printCssIdRegExp, previewContainerId);

        const previewContainer: Element = LayoutUtils.extractElementForFilter(printDocument, previewContainerId);
        if (!previewContainer) {
            console.error('cant find copied printElement for print-preview (printPreview)', previewContainerId);
            return undefined;
        }

        const printElement: Element = LayoutUtils.extractElementForFilter(printDocument, idRefFilter, classNameFilter, tagNameFilter);
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', printElement);
            return undefined;
        }

        if (!this.preparePrintPreviewDocumentForPrint(printWindow, printDocument, previewContainer, printElement, width)) {
            console.error('error while preparing print-preview');
            return undefined;
        }

        return printWindow;
    }

    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element,
                                                  printElement: Element, width: number) {
        return true;
    }

    protected openPrintPreviewWindow(width: number, height: number, target: string) {
        const printPreviewWindow = window.open('about:blank', target);
        if (width || height) {
            console.log('resize print_preview x/y', width || window.innerWidth, height || window.innerHeight);
            printPreviewWindow.resizeTo(width || window.innerWidth, height || window.innerHeight);
        }

        return printPreviewWindow;
    }

    protected copyContentToPrintPreviewDocument(printDocument: Document, doc: Element,
                                                printCssIdRegExp: string, printId: string) {
        printDocument.open();
        printDocument.write('<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<base href="/" />' +
            '</head>' +
            '<body>' +
            '<div id="' + printId + '" class="container-print-preview">' +
            doc.outerHTML +
            '</div>' +
            '</body>' +
            '</html>');

        const printCssStyles: HTMLElement[] = [];
        console.log('copy links/styles');
        document.head.querySelectorAll('link, style').forEach(htmlElement => {
            if (htmlElement.id.match(new RegExp(printCssIdRegExp))) {
                printCssStyles.push(<HTMLElement>htmlElement.cloneNode(true));
                return;
            }

            printDocument.head.appendChild(htmlElement.cloneNode(true));
        });

        // put printCss to end override all other styles
        if (printCssStyles.length > 0) {
            for (const printCss of printCssStyles) {
                console.log('append matching printCss-links/styles at the end', printCssIdRegExp, printCss.id);
                printDocument.head.appendChild(printCss);
                printCss.setAttribute('media', 'all');
            }
        }
    }

}
