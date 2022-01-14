import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public API_URL: string = "http://localhost:8000/api/v1";

  public currentMenuTab: any = [true, false, false];

  constructor(private http: HttpClient) { }

  public resetMenuTabs(): void {
    for(let i = 0;i < 3; i++) {
      this.currentMenuTab[i] = false;
    }
  }

  public onChangeMenuTab(id: number): void {
    this.resetMenuTabs();
    this.currentMenuTab[id] = true;
  }

  public getProductsFromJson(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + "/infoproducts"); // Get /inforproducts "../assets/data/products.json"
  }

  public putProduct(id: number, product: PutProductOnSale): Observable<PutProductOnSale> {
    return this.http.put<PutProductOnSale>(this.API_URL + "/putonsale/" + id + "/", product,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  public updateProducts(products: UpdatedProduct[]): Observable<Product[]> {
    return this.http.put<Product[]>(this.API_URL + "/products/", products,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  public putIncrementQuantityStockProduct(id: number, nbProduct: StockProduct): Observable<StockProduct> {
    nbProduct.number = Number(nbProduct.number)
    return this.http.put<StockProduct>(this.API_URL + "/incrementStock/" + id + "/", nbProduct,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  public putDecrementQuantityStockProduct(id: number, nbProduct: StockProduct): Observable<StockProduct> {
    nbProduct.number = Number(nbProduct.number)
    return this.http.put<StockProduct>(this.API_URL + "/decrementStock/" + id + "/", nbProduct,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
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
  price: number,
  price_selling: number,
  price_on_sale: number,
  sale: boolean,
  availability: boolean,
  quantity_in_stock: number,
  quantity_sold: number,
}

export interface UpdatedProduct {
  id: number,
  price_selling?: number,
  discount?: number,
  quantity_in_stock?: number,
}

export interface PutProductOnSale {
  discount: number,
}

export interface StockProduct {
  number: number,
}
