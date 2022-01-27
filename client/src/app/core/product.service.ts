import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public API_URL: string = 'http://server:8000/api/v1';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${localStorage.getItem('accessToken')}`,
    }),
  };

  public currentMenuTab: any = [true, false, false, false];

  constructor(private http: HttpClient) {}

  public resetMenuTabs(): void {
    for (let i = 0; i < this.currentMenuTab.length; i++) {
      this.currentMenuTab[i] = false;
    }
  }

  public onChangeMenuTab(id: number): void {
    this.resetMenuTabs();
    this.currentMenuTab[id] = true;
  }

  public getProductsFromJson(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + '/infoproducts', this.httpOptions);
  }

  public updateProducts(products: UpdatedProduct[]): Observable<Product[]> {
    console.log(products);
    return this.http.put<Product[]>(this.API_URL + '/products/', products, this.httpOptions);
  }

  public getTransactions(paramRequest: ParamRequest): Observable<ApiResponse[]> {
    let urlWithoutYear = this.API_URL+"/transactions/"+"?start_date="+paramRequest.start_date+"&end_date="+paramRequest.end_date+"&type="+paramRequest.type;
    let urlWithYear = urlWithoutYear + "&year="+paramRequest.year;
    return (paramRequest.year === '')
      ? this.http.get<ApiResponse[]>(urlWithoutYear, this.httpOptions)
      : this.http.get<ApiResponse[]>(urlWithYear, this.httpOptions);
  }

  public getStatistics(paramRequest: ParamRequest): Observable<ApiStatisticResponse[]> {
    return this.http.get<ApiStatisticResponse[]>(this.API_URL+"/statistic/?year_start="+paramRequest.start_date+"&year_end="+paramRequest.end_date, this.httpOptions);
  }

}

export interface Product {
  id: number;
  unit: string;
  category: number;
  name: string;
  discount: number;
  comments: string;
  owner: string;
  price: number;
  price_selling: number;
  price_on_sale: number;
  sale: boolean;
  availability: boolean;
  quantity_in_stock: number;
  quantity_sold: number;
}

export interface UpdatedProduct {
  id: number,
  price_selling?: number,
  price_on_sale?: number,
  discount?: number,
  quantity_in_stock?: number,
}

export interface ParamRequest {
  start_date: string,
  end_date: string,
  type: string,
  year: string,
}

export interface ApiResponse {
  day?: string,
  week?: number,
  month?: number,
  year?: number,
  trimestre?: number,
  selling_quantity: number,
  income: number,
}

export interface ApiStatisticResponse {
  year: number,
  selling_sum: number,
  depending_sum: number,
  tax: number,
  benefice: number
}

export interface ParamChart {
  barChartOptions: any,
  barChartType: any,
  barChartData: any
}
