import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-booking-chart',
  standalone: true,
  template: '<canvas #chartCanvas></canvas>',
  styles: ['canvas { width: 100%; height: 300px; }']
})
export class BookingChartComponent implements OnInit, OnChanges {
  @Input() data: { date: string; bookings: number }[] = [];
  @Input() selectedMonth: string = '';
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  private chart: Chart | undefined;

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['selectedMonth']) {
      this.updateChart();
    }
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Bookings',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          }
        },
        elements: {
          point: {
            radius: (context) => {
              const index = context.dataIndex;
              return index === 0 || index === this.data.length - 1 ? 6 : 0;
            },
            backgroundColor: 'white',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          }
        }
      }
    });

    this.updateChart();
  }

  private updateChart() {
    if (!this.chart) return;

    const filteredData = this.data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleString('default', { month: 'long' }) === this.selectedMonth;
    });

    this.chart.data.labels = filteredData.map(item => new Date(item.date).getDate().toString());
    this.chart.data.datasets[0].data = filteredData.map(item => item.bookings);
    this.chart.update();
  }
}