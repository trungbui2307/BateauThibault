import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {

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

  public getProduct(id:number) {
    return this.products.find(e => e.id === id);
  }

  public onSelectProductChange(ob: any): void {
    this.selectedProduct = this.getProduct(ob.value);
    console.log(this.selectedProduct);
    console.log(ob.value);
  }
}
