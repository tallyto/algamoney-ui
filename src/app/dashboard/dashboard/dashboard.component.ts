import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  lineChartData: any;

  constructor(private dashboardService: DashboardService) {
    this.generateLineChartData();
  }

  ngOnInit() {
    this.configurarGraficoPizza()
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
    })
  }

  generateRandomColors(numColors: number): string[] {
    const colors: string[] = [];
    const letters = '0123456789ABCDEF';

    for (let i = 0; i < numColors; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }

    return colors;
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


  generateLineChartData() {
    this.lineChartData = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Receitas',
          data: this.generateRandomData(6, 2000, 8000),
          borderColor: 'green',
          fill: false,
        },
        {
          label: 'Despesas',
          data: this.generateRandomData(6, 1000, 5000),
          borderColor: 'red',
          fill: false,
        },
      ],
    };
  }

  generateRandomData(count: number, min: number, max: number) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(this.getRandomNumber(min, max));
    }
    return data;
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

interface LancamentoCategoria {
  categoria: {
    codigo: number,
    nome: string
  },
  total: number
}
