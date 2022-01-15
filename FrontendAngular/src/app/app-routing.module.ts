import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { DetailsProductComponent } from './pages/details-product/details-product.component';
import { HistoricalDataComponent } from './pages/historical-data/historical-data.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageStockComponent } from './pages/manage-stock/manage-stock.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'detail',
    component: DetailsProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'stock',
    component: ManageStockComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'data',
    component: HistoricalDataComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
