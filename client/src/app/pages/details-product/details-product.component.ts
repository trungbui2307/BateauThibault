import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Product,
  ProductService,
  UpdatedProduct,
} from 'src/app/core/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss'],
})
export class DetailsProductComponent implements OnInit {
  @ViewChild('dpInput') dpInput: ElementRef | undefined;
  @ViewChild("priceSellings") checkboxes: ElementRef | undefined;

  public products: Product[] = [];
  public selectedProduct: Product | undefined = undefined;
  public percent:number|null = null;
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
      this.priceSelling = this.selectedProduct?.price_selling;
  }

  public updateQuantityStock_v2() {
    if (this.selectedProduct == undefined || this.quantityStock == null)
      return;

    if (this.percent != null && (this.percent < 0 || this.percent > 100)) {
      alert("Le pourcentage de promotion doit etre entre 0 et 100");
      this.percent = 0;
      return;
    }

    let currentQuantityStock:number = this.selectedProduct.quantity_in_stock + Number(this.quantityStock);    
    if (this.percent) {
      this.selectedProduct.price_on_sale = this.selectedProduct.price_selling * (100 - Number(this.percent)) / 100;
      this.selectedProduct.discount = this.percent;
      //this.selectedProduct.sale = true;
    }

    let putProduct: UpdatedProduct[] = [{
      id: this.selectedProduct.id,
      price_selling: Number(this.selectedProduct.price_selling),
      price_on_sale: Number(this.selectedProduct.price_on_sale),
      discount: Number(this.selectedProduct.discount),
      quantity_in_stock: currentQuantityStock,      
    }];

    this.productService
      .updateProducts(putProduct)
      .subscribe((res: Product[]) => {
        if (this.selectedProduct) {          
          this.selectedProduct = {
            ...this.selectedProduct!,
            sale: res[0].sale,
            price_on_sale: res[0].price_on_sale,
            price_selling: res[0].price_selling,
            discount: res[0].discount,
            quantity_in_stock: res[0].quantity_in_stock
          };
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          this.products.splice(index, 1, this.selectedProduct)
        }
        if (this.checkboxes)
          this.checkboxes.nativeElement.checked = false;
        this.percent = null;
      });
  }

  onChangePercent(event: any) {
    this.percent = event.target.value
  }

  public onChangeQuantityStock(event: any) {
    this.quantityStock = event.target.value;
  }

  public onChangePriceSelling(event: any) {
    this.checkBox = !this.checkBox;
    if (!this.selectedProduct)
      return;
    if (this.checkBox) {
      this.selectedProduct.price_selling = 0;
    } else {
      this.selectedProduct.price_selling = this.priceSelling;
    }
  }
}
