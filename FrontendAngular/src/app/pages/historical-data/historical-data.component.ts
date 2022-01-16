import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Subject } from 'rxjs';
import { ApiResponse, ParamChart, ParamRequest, ProductService } from 'src/app/core/product.service';

//import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent implements OnInit {

  public eventSubject: Subject<ParamChart> = new Subject<ParamChart>();

  public selectedTypes: any = [
    { 
      start_date: '',
      end_date: '',
      year: '',
      isYearHidden: true,
      start_date_label: 'Start Day:',            
      end_date_label: 'End Day:',  
      type: "day"
    },
    {
      start_date: '', 
      end_date: '',
      year: '',
      isYearHidden: false,
      start_date_label: 'Start Week:',
      end_date_label: 'End Week',
      type: "week"
    },
    {
      start_date: '',
      end_date: '',   
      year: '',        
      isYearHidden: false,
      start_date_label: 'Start Month',
      end_date_label: 'End Month',
      type: "month"  
    },
    {
      start_date: '',
      end_date: '',
      year: '',
      isYearHidden: true,
      start_date_label: 'Start Year:',
      end_date_label: 'End Year:',
      type: "year" 
    },
    {
      start_date: '',
      end_date: '',
      year: '',
      isYearHidden: false,
      start_date_label: 'Start Trimestre',
      end_date_label: 'End Trimestre',
      type: "trimestre"
    }
  ];  

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Chiffre d\'affaire' },
      { data: [], label: 'Quantite vendu' }
    ]
  };
  
  public paramRequest: ParamRequest = {
    start_date: '2022-01-12',
    end_date: '2022-01-20',
    type: 'day',
    year: '',
  }

  public constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    //this.getTransactions();    
  }

  public getTransactions() { 
    
    console.log(this.paramRequest);

    this.productService
      .getTransactions(this.paramRequest)
      .subscribe((res: ApiResponse[]) => {
        this.resetDatasets();
        res.forEach((e) => {
          if (e.day) this.barChartData.labels?.push(e.day);
          if (e.week) this.barChartData.labels?.push(e.week.toString());
          if (e.month) this.barChartData.labels?.push(e.month.toString());
          if (e.year) this.barChartData.labels?.push(e.year.toString());
          if (e.trimestre) this.barChartData.labels?.push(e.trimestre.toString());
          this.barChartData.datasets[0].data.push(e.income);
          this.barChartData.datasets[1].data.push(e.selling_quantity);
          
          let paramChart: ParamChart = {
            barChartOptions: this.barChartOptions,
            barChartType: this.barChartType,
            barChartData: this.barChartData
          }

          console.log(this.barChartData);

          this.eventSubject.next(paramChart);
        });        
      });
  }

  public onChangeDay(event: any, id:number, isStartDate: number): void {    
    if (isStartDate == 0) {
      this.paramRequest.start_date = event.target.value;
    } else {
      this.paramRequest.end_date = event.target.value;
    }
    this.paramRequest.type = this.selectedTypes[id].type;
    if (this.paramRequest.type == this.selectedTypes[0].type) {
      this.paramRequest.year = '';
    }
  }

  public onChangeYear(event: any, id:number): void {
    this.paramRequest.year = event.target.value;
    this.paramRequest.type = this.selectedTypes[id].type;
  }

  private resetDatasets() {
    this.barChartData = {
      labels: [],
      datasets: [
        { data: [], label:  'Chiffre d\'affaire'},
        { data: [], label: 'Quantite vendu' }
      ]
    }
  }

}

