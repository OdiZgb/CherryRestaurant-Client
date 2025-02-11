import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { toCanvas } from 'qrcode';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-print-barcodes-page',
  templateUrl: './print-barcodes-page.component.html',
  styleUrls: ['./print-barcodes-page.component.scss']
})
export class PrintBarcodesPageComponent implements AfterViewInit {
  @ViewChild('barcodeContainer', { static: false }) barcodeContainer!: ElementRef<HTMLDivElement>;

  numRows: number = 1;  // Adjusted to ensure single QR code by default
  qrCodeValue: string = '';
  dpi: number = 203;
  widthInches: number = 3.36;
  heightInches: number = 1.9685;
  printLayout: string = 'single';
  separationSpace: number = 0.5;
  titleFontSize: number = 7;
  valueFontSize: number = 7;
  settingsLocked: boolean = false;

  private settingsChange = new Subject<void>();

  constructor() {
    this.loadSettings(); // Load profile settings by default
    this.qrCodeValue = localStorage.getItem("qrCodeValue") || "";
    this.settingsLocked = localStorage.getItem("settingsLocked") === 'true';
    this.printLayout = localStorage.getItem("printLayout") || 'single';
    const layout = this.printLayout;
    this.dpi = Number(localStorage.getItem(`${layout}_dpi`)) || 203;
    this.widthInches = Number(localStorage.getItem(`${layout}_widthInches`)) || 3.36;
    this.heightInches = Number(localStorage.getItem(`${layout}_heightInches`)) || 1.9685;
    this.separationSpace = Number(localStorage.getItem(`${layout}_separationSpace`)) || 0.5;
    this.titleFontSize = Number(localStorage.getItem(`${layout}_titleFontSize`)) || 7;
    this.valueFontSize = Number(localStorage.getItem(`${layout}_valueFontSize`)) || 7;
  
    this.settingsChange.pipe(debounceTime(300)).subscribe(() => {
      this.generateQRCode();
    });
  }

  ngAfterViewInit() {
    this.generateQRCode(); // Initial generation of the QR code
  }

  onSettingsChange() {
    if (!this.settingsLocked) {
      this.settingsChange.next();
    }
  }

  onLayoutChange() {
    if (!this.settingsLocked) {
      localStorage.setItem("printLayout", this.printLayout);
      this.loadSettings();
      this.generateQRCode();
    }
  }

  saveSettings() {
    const layout = this.printLayout;
    localStorage.setItem(`${layout}_dpi`, String(this.dpi));
    localStorage.setItem(`${layout}_widthInches`, String(this.widthInches));
    localStorage.setItem(`${layout}_heightInches`, String(this.heightInches));
    localStorage.setItem(`${layout}_separationSpace`, String(this.separationSpace));
    localStorage.setItem(`${layout}_titleFontSize`, String(this.titleFontSize));
    localStorage.setItem(`${layout}_valueFontSize`, String(this.valueFontSize));
    localStorage.setItem("settingsLocked", String(this.settingsLocked));
  }

  loadSettings() {
    const layout = this.printLayout;
    this.dpi = Number(localStorage.getItem(`${layout}_dpi`)) || 203;
    this.widthInches = Number(localStorage.getItem(`${layout}_widthInches`)) || 3.36;
    this.heightInches = Number(localStorage.getItem(`${layout}_heightInches`)) || 1.9685;
    this.separationSpace = Number(localStorage.getItem(`${layout}_separationSpace`)) || 0.5;
    this.titleFontSize = Number(localStorage.getItem(`${layout}_titleFontSize`)) || 7;
    this.valueFontSize = Number(localStorage.getItem(`${layout}_valueFontSize`)) || 7;
  }

  async generateQRCode() {
    const container: HTMLElement = this.barcodeContainer?.nativeElement;
    container.innerHTML = ''; // Clear previous content

    // Determine number of columns and rows based on the selected layout
    const numColumns = this.printLayout === 'double' ? 2 : 1;
    const numRows = 1; // Always one row for simplicity

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement('div');
      row.className = 'qr-code-row';
      row.style.display = 'flex';
      row.style.pageBreakInside = 'avoid';
      container.appendChild(row);

      for (let j = 0; j < numColumns; j++) {
        const index = i * numColumns + j;
        if (index >= numColumns) break; // Adjust the break condition

        const wrapper = document.createElement('div');
        wrapper.className = 'qr-code-wrapper';
        if (this.printLayout === 'double') {
          wrapper.classList.add('double-column');
          wrapper.style.marginRight = j < numColumns - 1 ? `${this.separationSpace}in` : '0';
        }

        const titleDiv = document.createElement('div');
        titleDiv.className = 'qr-code-title';
        titleDiv.style.fontSize = `${this.titleFontSize}px`;
        titleDiv.textContent = 'CherryRestaurant © Jericho';
        wrapper.appendChild(titleDiv);

        const img = document.createElement('img');
        img.className = 'qr-code-image';
        await this.renderQRCode(img, this.qrCodeValue);
        wrapper.appendChild(img);

        const valueDiv = document.createElement('div');
        valueDiv.className = 'qr-code-value';
        valueDiv.style.fontSize = `${this.valueFontSize}px`;
        valueDiv.textContent = this.qrCodeValue;
        wrapper.appendChild(valueDiv);

        row.appendChild(wrapper);
      }
    }
  }

  async renderQRCode(img: HTMLImageElement, value: string) {
    return new Promise<void>((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const width = this.widthInches * this.dpi; // inches * DPI

      toCanvas(canvas, value, { width: width }, (error) => {
        if (error) {
          reject(error);
        } else {
          img.src = canvas.toDataURL('image/png');
          img.style.width = `${this.widthInches}in`; // Set image width in inches
          img.style.height = `${this.heightInches}in`; // Set image height in inches
          resolve();
        }
      });
    });
  }

  async printQRCode() {
    // Save settings before generating and printing the QR code
    this.saveSettings();

    // Generate QR code to ensure the latest settings are applied
    await this.generateQRCode();

    // Open a new window for printing
    let newWindow: Window | null = window.open('', '_blank', 'toolbar=0,location=0,menubar=0,width=800,height=600');
    if (!newWindow) {
      console.error('Failed to open new window. It may have been blocked by a popup blocker.');
      return;
    }

    const css = `<style>
      body, html {
        margin: 0;
        padding: 0;
        background: #fff; /* Set a white background for the whole page */
        width: 100%;
        height: 100%;
      }
      canvas {
        background: #fff !important; /* Explicitly set white background for canvas */
      }
      .input-container, .generateQRCode {
        display: none; /* Hide non-relevant elements */
      }
      .qr-code-wrapper {
        page-break-inside: avoid; /* Ensure the wrapper is not split across pages */
        break-inside: avoid;
        width: ${this.widthInches}in;
        height: ${this.heightInches + 0.5}in; /* Include space for the title and value */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: ${this.separationSpace}in;
      }
      .double-column:last-child {
        margin-right: 0;
      }
      #barcodeContainer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      #barcodeContainer img {
        max-width: 100%;
        height: auto;
      }
      .qr-code-title {
        font-size: ${this.titleFontSize}px;
      }
      .qr-code-value {
        font-size: ${this.valueFontSize}px;
      }
    </style>`;

    newWindow.document.write(`<html><head><title>Print QR Codes</title>${css}</head><body><div id="barcodeContainer"></div></body></html>`);
    newWindow.document.close();

    const container = newWindow.document.getElementById('barcodeContainer');
    if (container) {
      const numColumns = this.printLayout === 'double' ? 2 : 1;
      const numRows = 1; // Always one row for simplicity

      for (let i = 0; i < numRows; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.pageBreakInside = 'avoid';
        container.appendChild(row);

        for (let j = 0; j < numColumns; j++) {
          const index = i * numColumns + j;
          if (index >= numColumns) break; // Adjust the break condition

          const wrapper = document.createElement('div');
          wrapper.className = 'qr-code-wrapper';
          if (this.printLayout === 'double') {
            wrapper.classList.add('double-column');
            wrapper.style.marginRight = j < numColumns - 1 ? `${this.separationSpace}in` : '0';
          }

          const titleDiv = document.createElement('div');
 
           titleDiv.className = 'qr-code-title';
          titleDiv.style.fontSize = `${this.titleFontSize}px`;
          titleDiv.textContent = 'CherryRestaurant © Jericho';
          wrapper.appendChild(titleDiv);

          const img = document.createElement('img');
          img.className = 'qr-code-image';
          await this.renderQRCode(img, this.qrCodeValue);
          wrapper.appendChild(img);

          const valueDiv = document.createElement('div');
          valueDiv.className = 'qr-code-value';
          valueDiv.style.fontSize = `${this.valueFontSize}px`;
          valueDiv.textContent = this.qrCodeValue;
          wrapper.appendChild(valueDiv);

          row.appendChild(wrapper);
        }
      }

      newWindow.document.body.appendChild(container);
      newWindow.focus();
      newWindow.print();
      newWindow.close();
    }
  }
  
  toggleSettingsLock() {
    this.settingsLocked = !this.settingsLocked;
    localStorage.setItem("settingsLocked", String(this.settingsLocked));
  }
}
