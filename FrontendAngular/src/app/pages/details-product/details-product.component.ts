import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IncrementStockProduct,
  Product,
  ProductService,
  PutProductOnSale,
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
    //this.reloadData();
  }

  public updateQuantityStock() {
    let quantity: number | null = this.quantityStock;

    if (
      this.selectedProduct == undefined ||
      quantity == null ||
      quantity < 0
    )
      return;

    let putIncrementStockProduct: IncrementStockProduct = {
      number: quantity,
    };
    console.log(this.selectedProduct.id);
    this.productService
      .putIncrementQuantityStockProduct(this.selectedProduct.id, putIncrementStockProduct)
      .subscribe((res: IncrementStockProduct) => {
        if (this.selectedProduct) {
          let currentQuantityStock = this.selectedProduct.quantityInStock;
          this.selectedProduct = {
            ...this.selectedProduct!,
            quantityInStock: res.number//currentQuantityStock + res.number,
          };
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          this.products.splice(index, 1, this.selectedProduct)
        }
      });
      console.log(this.selectedProduct.quantityInStock);
    this.quantityStock = 0;
  }

  onChangePercent(event: any) {
    this.percent = event.target.value
  }

  public onChangeQuantityStock(event: any) {
    this.quantityStock = event.target.value;
  }

  private async reloadData() {
    await this.getProducts();
    if (this.selectedProduct != undefined) {
      this.selectedProduct = this.getProduct(this.selectedProduct.id);
    }
  }
}
