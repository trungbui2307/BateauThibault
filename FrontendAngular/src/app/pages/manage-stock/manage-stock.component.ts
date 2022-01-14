import { Component, OnInit } from '@angular/core';
import {
  Product,
  ProductService,
  UpdatedProduct,
} from 'src/app/core/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.scss'],
})
export class ManageStockComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'price',
    'discount',
    'quantity',
    'quantity_sold',
    'quantityInStock',
    'comments',
    'addStock',
    'addPromo',
  ];
  dataSource: Product[] = [];

  updateData: UpdatedProduct[] = [];

  constructor(private productService: ProductService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productService.getProductsFromJson().subscribe(
      (res: Product[]) => {
        this.dataSource = res;
      },
      (err) => {
        alert('API Get failed');
      }
    );
  }

  getDataSource(i: number) {
    return this.dataSource.filter((d) => d.category === i);
  }

  getTableName(i: number) {
    switch (i) {
      case 0:
        return 'Crustaces';
      case 1:
        return 'Poissons';
      case 2:
        return 'Fruit de mer';
      default:
        return 'Some Table';
    }
  }

  addStock(elementId: number, addStockInput: string) {
    const index = this.updateData.findIndex((d) => d.id === elementId);
    if (index !== -1) {
      this.updateData.splice(index, 1, {
        ...this.updateData[index],
        id: elementId,
        quantityInStock: this.dataSource.find((d) => d.id === elementId)!.quantityInStock! + (+addStockInput),
      });
      return;
    }
    this.updateData.push({
      id: elementId,
      quantityInStock: this.dataSource.find((d) => d.id === elementId)!.quantityInStock! + (+addStockInput),
    });
  }

  addPromo(elementId: number, addPromoInput: string) {
    const index = this.updateData.findIndex((d) => d.id === elementId);
    if (index !== -1) {
      this.updateData.splice(index, 1, {
        ...this.updateData[index],
        id: elementId,
        discount: Math.min(this.dataSource.find((d) => d.id === elementId)!.discount! + (+addPromoInput), 100),
      });
      return;
    }
    this.updateData.push({
      id: elementId,
      discount: Math.min(this.dataSource.find((d) => d.id === elementId)!.discount! + (+addPromoInput), 100),
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  updateProducts() {
    this.productService.updateProducts(this.updateData).subscribe((res: Product[]) => {
      this.openSnackBar("Products updated successfully", "UPDATED!")
      res.forEach(product => {
        this.dataSource.splice(this.dataSource.findIndex(d => d.id === product.id), 1, {
          ...product
        })
      });
    }, (err) => {
      this.openSnackBar(err, "ERROR!")
    });
  }
}
