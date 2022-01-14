import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectedIndex: number = 0;

  public elements: any = [
    {
      id: 0,
      title: "Home", 
      path: "",
      isClicked: this.produitService.currentMenuTab[0]
    },
    {
      id: 1,
      title: "Details d'un produit", 
      path: "detail",
      isClicked: this.produitService.currentMenuTab[1]
    },
    {
      id: 2,
      title: "Gerer les produits", 
      path: "stock",
      isClicked: this.produitService.currentMenuTab[2]
    }
  ]

  constructor(private route: Router, public produitService: ProductService) { }

  ngOnInit(): void {
  }

  public onClickMenu(selectedIndex:number): void {
    this.produitService.onChangeMenuTab(selectedIndex);
    this.route.navigate([this.elements[selectedIndex].path])
  }
}
