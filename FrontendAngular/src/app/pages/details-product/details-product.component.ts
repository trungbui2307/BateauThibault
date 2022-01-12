import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {

  public listeProduits: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productService.getProductsFromJson().subscribe((res: Product[]) => {
      this.listeProduits = res;
    },
    (err) => {
      alert("failed loading json data");
    });
  }

  public getProduct(id:number) {
    return this.listeProduits.find(e => e.id === id);
  }


}
