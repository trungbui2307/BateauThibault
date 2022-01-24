import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public elements: any = [
    {title: "Details produit", content: "Afficher les details d'un produit"},
    {title: "Gerer les produits", content: "Gerer tous les produits"},
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public receiveClickEvent(event: any) {
    (event.id == 0) ? this.router.navigate(['detail']) 
    : this.router.navigate(['stock'])
  }
}
