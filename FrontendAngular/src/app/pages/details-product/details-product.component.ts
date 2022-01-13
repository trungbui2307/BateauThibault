import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Product,
  ProductService,
  PutProductOnSale,
  StockProduct,
} from 'src/app/core/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss'],
})
export class DetailsProductComponent implements OnInit {
  @ViewChild('dpInput') dpInput: ElementRef | undefined;

  public products: Product[] = [];
  public selectedProduct: Product | undefined = undefined;
  public percent = 0;
  public quantityStock = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productService.getProductsFromJson().subscribe(
      (res: Product[]) => {
        this.products = res;
      },
      (err) => {
        alert('API Get failed');
      }
    );
  }

  public getProduct(id: number) {
    return this.products.find((e) => e.id === id);
  }

  public onSelectProductChange(ob: any): void {
    this.selectedProduct = this.getProduct(ob.value);
  }

  public updateSale() {
    let sale: number | null = this.percent;

    if (
      this.selectedProduct == undefined ||
      sale == null ||
      sale < 0 ||
      sale > 100
    )
      return;

    let putProductOnSale: PutProductOnSale = {
      discount: sale / 100,
    };
    this.productService
      .putProduct(this.selectedProduct.id, putProductOnSale)
      .subscribe((res: PutProductOnSale) => {
        this.selectedProduct = {
          ...this.selectedProduct!,
          discount: res.discount,
        };
        const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
        this.products.splice(index, 1, this.selectedProduct)
      });
    this.percent = 0;
  }

  public updateQuantityStock() {
    let quantity: number | null = this.quantityStock;

    if (this.selectedProduct == undefined || quantity == null || quantity == 0)
      return;

    let putIncrementStockProduct: StockProduct = {
      number: quantity,
    };    
    if (quantity > 0) {
      this.productService
      .putIncrementQuantityStockProduct(this.selectedProduct.id, putIncrementStockProduct)
      .subscribe((res: StockProduct) => {
        if (this.selectedProduct) {
          let currentQuantityStock = this.selectedProduct.quantityInStock;
          this.selectedProduct = {
            ...this.selectedProduct!,
            quantityInStock: currentQuantityStock + putIncrementStockProduct.number,
          };
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          this.products.splice(index, 1, this.selectedProduct)
        }
      });
    } else {
      putIncrementStockProduct.number *= -1;
      this.productService
      .putDecrementQuantityStockProduct(this.selectedProduct.id, putIncrementStockProduct)
      .subscribe((res: StockProduct) => {
        if (this.selectedProduct) {
          let currentQuantityStock = this.selectedProduct.quantityInStock;
          this.selectedProduct = {
            ...this.selectedProduct!,
            quantityInStock: currentQuantityStock - putIncrementStockProduct.number,
          };
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          this.products.splice(index, 1, this.selectedProduct)
        }
      });
    }
    
    this.quantityStock = 0;
  }

  onChangePercent(event: any) {
    this.percent = event.target.value
  }

  public onChangeQuantityStock(event: any) {
    this.quantityStock = event.target.value;
  }
}
