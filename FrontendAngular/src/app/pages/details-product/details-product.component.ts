import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product, ProductService, PutProductOnSale } from 'src/app/core/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {

  @ViewChild('dpInput') dpInput: ElementRef | undefined;


  public products: Product[] = [];
  public selectedProduct: Product | undefined = undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productService.getProductsFromJson().subscribe((res: Product[]) => {
      this.products = res;
    },
      (err) => {
        alert("API Get failed");
      });
  }

  public getProduct(id: number) {
    return this.products.find(e => e.id === id);
  }

  public onSelectProductChange(ob: any): void {
    this.selectedProduct = this.getProduct(ob.value);
  }

  public updateSale(): void {
    let sale: number | null = this.dpInput?.nativeElement.value;

    if (this.selectedProduct == undefined || sale == null || sale < 0 || sale > 100)
      return;
      
    let putProductOnSale: PutProductOnSale = {
      id: this.selectedProduct.id,
      discount: sale
    }
    this.productService.putProduct(putProductOnSale);
  }
}
