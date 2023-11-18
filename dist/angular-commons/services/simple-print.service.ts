import {Injectable} from '@angular/core';
import {LayoutUtils} from './layout.utils';
import {PrintOptions, PrintService} from './print.service';
import {LayoutService} from './layout.service';

@Injectable()
export class SimplePrintService extends PrintService {

    public constructor(protected layoutService: LayoutService) {
        super();
    }

    public openPrintPreview(options: PrintOptions): Window {
        if (!options || !options.printElementFilter) {
            console.error('cant find printElement for print-preview - no printElementFilter applied', options);
        }

        const doc: Element = LayoutUtils.extractElementForFilter(document,
            options.printElementFilter.type,
            options.printElementFilter.value);
        if (!doc) {
            console.error('cant find printElement for print-preview (printElementFilter)', options.printElementFilter);
            return undefined;
        }

        const printWindow = this.openPrintPreviewWindow(options, 'print_preview');
        const printDocument = printWindow.document;
        const previewContainerId = 'printPreview';
        this.copyContentToPrintPreviewDocument(printDocument, doc, previewContainerId, options);

        const previewContainer: Element = LayoutUtils.extractElementForFilter(printDocument, 'ID',  previewContainerId);
        if (!previewContainer) {
            console.error('cant find copied printElement for print-preview (printPreview)', previewContainerId);
            return undefined;
        }

        const printElement: Element = LayoutUtils.extractElementForFilter(printDocument,
            options.printElementFilter.type,
            options.printElementFilter.value);
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', printElement);
            return undefined;
        }

        if (!this.preparePrintPreviewDocumentForPrint(printWindow, printDocument, previewContainer, printElement, options)) {
            console.error('error while preparing print-preview');
            return undefined;
        }

        return printWindow;
    }

    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element,
                                                  printElement: Element, options: PrintOptions) {
        return true;
    }

    protected openPrintPreviewWindow(options: PrintOptions, target: string) {
        const printPreviewWindow = window.open('about:blank', target);
        if (options.previewWindow && (options.previewWindow.width || options.previewWindow.height)) {
            console.log('resize print_preview x/y',
                options.previewWindow.width || window.innerWidth,
                options.previewWindow.height || window.innerHeight);
            printPreviewWindow.resizeTo(
                options.previewWindow.width || window.innerWidth,
                options.previewWindow.height || window.innerHeight);
        }

        return printPreviewWindow;
    }

    protected copyContentToPrintPreviewDocument(printDocument: Document, doc: Element,
                                                printId: string, options: PrintOptions) {
        printDocument.open();
        printDocument.write('<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<base href="' + document.baseURI + '" />' +
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
            if (options.printStyleIdFilter && htmlElement.id.match(options.printStyleIdFilter)) {
                printCssStyles.push(<HTMLElement>htmlElement.cloneNode(true));
                return;
            }

            printDocument.head.appendChild(htmlElement.cloneNode(true));
        });

        // put printCss to end override all other styles
        if (printCssStyles.length > 0) {
            for (const printCss of printCssStyles) {
                console.log('append matching printCss-links/styles at the end', options.printStyleIdFilter, printCss.id);
                printDocument.head.appendChild(printCss);
                printCss.setAttribute('media', 'all');
            }
        }
    }

    public isPrintAvailable(): boolean {
        return this.layoutService.isDesktop() && window.print !== undefined;
    }

}
