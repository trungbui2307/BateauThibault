import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Product,
  ProductService,
  PutProductOnSale,
  StockProduct,
  UpdatedProduct,
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
  public priceSelling = 0;
  public checkBox: boolean = false;

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
    if (this.selectedProduct)
      this.priceSelling = this.selectedProduct?.price;
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

  public updateQuantityStock_v2() {
    if (this.selectedProduct == undefined || this.quantityStock == null)
      return;

    let currentQuantityStock:number = this.selectedProduct.quantityInStock + Number(this.quantityStock);
    console.log(this.selectedProduct.quantityInStock);
    console.log(currentQuantityStock);
    let putProduct: UpdatedProduct[] = [{
      id: this.selectedProduct.id,
      price_selling: this.priceSelling,
      discount: this.percent,
      quantityInStock: currentQuantityStock,      
    }];

    this.productService
      .updateProducts(putProduct)
      .subscribe((res: Product[]) => {
        if (this.selectedProduct) {          
          this.selectedProduct = {
            ...this.selectedProduct!,
            quantityInStock: currentQuantityStock
          };
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          this.products.splice(index, 1, this.selectedProduct)
        }
      });
  }

  public updateQuantityStock_v1() {
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

  public onChangePriceSelling(event: any) {
    //this.priceSelling = event.target.value;
    this.checkBox = !this.checkBox;
    if (!this.selectedProduct)
      return;
    if (this.checkBox) {
      this.selectedProduct.price = 0;
    } else {
      this.selectedProduct.price = this.priceSelling;
    }
  }
}
