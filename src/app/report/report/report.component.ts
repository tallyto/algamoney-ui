import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service';
import { saveAs } from "file-saver";
import * as Papa from 'papaparse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  startDate: any;
  endDate: any;
  reportData: any[];

  constructor(private dasboardService: DashboardService) {}

  generateReport() {
    this.dasboardService.lancamentosPorPessoa(this.startDate, this.endDate).subscribe(
      {
        next: (data: any) => {
          this.reportData = data;
        },
        error: (error) => {
          console.error('Erro ao obter os dados do relatório:', error);
        }
      }
    );
  }

  exportToCsv() {
    const csvData = Papa.unparse(this.reportData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'report.csv');
  }

  exportToPdf() {
    const element: any = document.getElementById('report-table');
    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('report.pdf');
    });
  }
}
