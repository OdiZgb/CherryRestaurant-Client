import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode-generator',
  template: `<div #barcodeContainer></div>`,
  styleUrls: ['./barcode-generator.component.scss']
})
export class BarcodeGeneratorComponent implements AfterViewInit, OnChanges {
  @Input() value!: string;
  @ViewChild('barcodeContainer', { static: false }) barcodeContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.generateBarcode();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.generateBarcode();
    }
  }

  generateBarcode() {
    const container = this.barcodeContainer.nativeElement;
    container.innerHTML = ''; // Clear previous barcode if any
    if (this.value) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      container.appendChild(svg);
      JsBarcode(svg, this.value, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,  // Adjust width as needed
        height: 60,  // Adjust height as needed
        displayValue: true
      });
    }
  }
}
