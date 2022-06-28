import { DataService } from './../../../services/data/data.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public bar_chart_option: ChartConfiguration['options'] = {
    font: {
      family: 'Inter',
    },
    animation: {
      easing: 'easeInOutElastic',
      delay: 25,
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium'),
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500',
          },
        },
      },
      y: {
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium'),
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500',
          },
          callback: function (value, index, ticks) {
            return '$' + value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('dark'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('tertiary'),
        titleFont: {
          size: 14,
          weight: 'normal',
        },
        bodyFont: {
          size: 16,
          weight: 'bold',
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add currency format to tooltip
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  public bar_chart_data: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  public bar_chart_type: ChartType = 'bar';

  content_loaded: boolean = false;
  transactions;
  categories;
  constructor(
    private helperService: HelperService,
    private dataService: DataService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // Create bar chart
    this.createBarChart();
    this.categories = this.getCategories();
    console.log(this.categories);
  }

  getCategories() {
    //     VIRTUAL_CARD
    // FUND_VIRTUAL_CARD
    // WITHDRAW_VIRTUAL_CARD
    // LOCAL_BANK_TRANSFER
    // LOCAL_FUND_TRANSFER
    // BETTING
    // ELECTRICITY
    // CABLE
    // EDUCATION
    // DATA
    // AIRTIME
    const transactionsHolder = this.dataService.getTransactions();
    this.transactions = transactionsHolder.reduce((groups, transaction) => {
      const segment = transaction.action;
      if (!groups[segment]) {
        groups[segment] = [];
      }

      //form sub group array
      groups[segment].push(transaction);
      return groups;
    }, {});
    const groupArrays = Object.keys(this.transactions).map((segment) => {
      return {
        category: segment,
        transactions: this.transactions[segment],
      };
    });
    console.log(this.transactions);
    console.log(groupArrays);
    return groupArrays;
  }

  sumTransaction(transactions) {
    console.log;
    var sum = 0;

    // Calculation the sum using forEach
    transactions.forEach((x) => {
      sum += parseFloat(x.amount);
    });
    return sum;
  }

  ionViewDidEnter() {
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  // Create bar chart
  createBarChart() {
    let helperService = this.helperService;

    // Random array of numbers
    let rand_numbers = [...Array(12)].map((e) => (Math.random() * 100) | 0);

    // Set labels
    this.bar_chart_data.labels = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    // Set datasets
    this.bar_chart_data.datasets = [
      {
        data: rand_numbers,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          // Create gradient
          return helperService.createGradientChart(ctx, 'primary', 'primary');
        },
        barThickness: 10,
        borderRadius: 4,
        borderColor: helperService.getColorVariable('primary'),
        hoverBackgroundColor: helperService.getColorVariable('primary'),
        pointStyle: 'circle',
      },
    ];
  }

  back() {
    this.modalCtrl.dismiss();
  }
}
