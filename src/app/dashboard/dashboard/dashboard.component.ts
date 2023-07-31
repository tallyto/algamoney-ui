import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../dashboard.service";

interface LancamentoCategoria {
  categoria: {
    codigo: number;
    nome: string;
  };
  total: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  lineChartData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria().subscribe({
      next: (value: any) => {
        this.pieChartData = {
          labels: value.map((result: LancamentoCategoria) => result.categoria.nome),
          datasets: [
            {
              data: value.map((dado: LancamentoCategoria) => dado.total),
              backgroundColor: this.generateBeautifulRandomColors(value.length),
            },
          ],
        };
      }
    });
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia().subscribe({
      next: (apiData: any) => {
        const processedData = this.processData(apiData);

        this.lineChartData = {
          labels: processedData.dates,
          datasets: [
            {
              label: 'Total Despesa',
              data: processedData.despesaTotals,
              fill: false,
              borderColor: 'rgb(255, 0, 0)',
              tension: 0.1
            },
            {
              label: 'Total Receita',
              data: processedData.receitaTotals,
              fill: false,
              borderColor: 'rgb(0, 128, 0)',
              tension: 0.1
            }
          ]
        };
      }
    });
  }

  processData(apiData: any) {
    const chartDataMap = new Map();
    const dates: any = [];
    const despesaTotals: any = [];
    const receitaTotals: any = [];

    apiData.forEach((entry: any) => {
      const date = new Date(entry.dia).toLocaleDateString();

      if (!chartDataMap.has(date)) {
        chartDataMap.set(date, {
          despesaTotal: 0,
          receitaTotal: 0
        });
        dates.push(date);
      }

      const chartData = chartDataMap.get(date);

      if (entry.tipoLancamento === 'DESPESA') {
        chartData.despesaTotal += entry.total;
      } else if (entry.tipoLancamento === 'RECEITA') {
        chartData.receitaTotal += entry.total;
      }
    });

    dates.forEach((date: any) => {
      const chartData = chartDataMap.get(date);
      despesaTotals.push(chartData.despesaTotal);
      receitaTotals.push(chartData.receitaTotal);
    });

    return {
      dates,
      despesaTotals,
      receitaTotals
    };
  }



  generateBeautifulRandomColors(numColors: number): string[] {
    const colors: string[] = [];

    for (let i = 0; i < numColors; i++) {
      const hue = Math.floor(Math.random() * 360); // Valor de 0 a 359 para representar o matiz (cor).
      const saturation = 70 + Math.random() * 30; // Valores de saturação entre 70 e 100.
      const lightness = 50 + Math.random() * 10; // Valores de luminosidade entre 50 e 60.

      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      colors.push(color);
    }

    return colors;
  }
}
