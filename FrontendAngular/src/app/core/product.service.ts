import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public putProduct(product: PutProductOnSale): Observable<PutProductOnSale> {
    return this.http.put<PutProductOnSale>(this.API_URL + "/infoproduct/"+product.id, product, 
      {
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    );
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

export interface PutProductOnSale {
  id: number,
  discount: number,
}
