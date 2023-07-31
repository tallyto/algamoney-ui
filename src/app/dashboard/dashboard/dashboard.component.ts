import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  pieChartData: any;
  lineChartData: any;

  constructor() {
    this.generatePieChartData();
    this.generateLineChartData();
  }

  generatePieChartData() {
    this.pieChartData = {
      labels: ['Despesas', 'Receitas'],
      datasets: [
        {
          data: [this.getRandomNumber(1000, 5000), this.getRandomNumber(2000, 8000)],
          backgroundColor: ['red', 'blue'],
        },
      ],
    };
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
