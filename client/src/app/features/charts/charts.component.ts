import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, Subscription } from 'rxjs';
import { ParamChart, ProductService } from 'src/app/core/product.service';

//import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;  

  @Input() 
  events!: Observable<ParamChart>;

  @Input() barChartOptions: ChartConfiguration['options'];

  @Input()
  barChartType!: ChartType;  

  @Input() 
  barChartData!: ChartData<'bar'>;

  private eventSubscription!: Subscription;

  public constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    this.eventSubscription = this.events.subscribe(
      (res) => {
        console.log("reload Charts")
        console.log(this.barChartData);
        this.update();
      }
    )
  }

  public ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
  
  public update(): void {    
    this.chart?.update();
  }

}

