import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductComponent } from './pages/details-product/details-product.component';
import { HomeComponent } from './pages/home/home.component';
import { ManageStockComponent } from './pages/manage-stock/manage-stock.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailsProductComponent},
  { path: 'stock', component: ManageStockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
