import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectedIndex: number = 0;
  //public backgroundColor: string = 'black';

  public elements: any = [
    {
      id: 0,
      title: "Home", 
      path: "",
      isClicked: true
    },
    {
      id: 1,
      title: "Details d'un produit", 
      path: "detail",
      isClicked: false
    },
    {
      id: 2,
      title: "Gerer les produits", 
      path: "stock",
      isClicked: false
    }
  ]

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  public onClickMenu(selectedIndex:number): void {
    this.resetElements();
    this.elements[selectedIndex].isClicked = true;
    //console.log(selectedIndex);

    this.route.navigate([this.elements[selectedIndex].path])
  }

  private resetElements(): void {
    for(let i = 0;i < 3; i++) {
      this.elements[i].isClicked = false;
    }
  }
}
