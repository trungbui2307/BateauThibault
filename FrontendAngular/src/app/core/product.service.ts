import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public API_URL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getProductsFromJson():Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + "/infoproducts"); // Get /inforproducts "../assets/data/products.json"
  }
}

export interface Product {
  id: number,
  unit: string,
  category: number,
  name: string,
  discount: number,
  comments: string,
  owner: string,
  price:number,
  price_on_sale: number,
  sale: boolean,
  availability: boolean,
  quantity_stock: number,
  quantity_sold: number,
}
