import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './features/header/header.component';
import { DetailsProductComponent } from './pages/details-product/details-product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageStockComponent } from './pages/manage-stock/manage-stock.component';
import { CardComponent } from './features/card/card.component';
import { ProductService } from './core/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './features/footer/footer.component';
import { HistoricalDataComponent } from './pages/historical-data/historical-data.component';
import { LoginComponent } from './pages/login/login.component';
import { ChartsComponent } from './features/charts/charts.component';
import { AuthService } from './core/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DetailsProductComponent,
    ManageStockComponent,
    CardComponent,
    FooterComponent,
    HistoricalDataComponent,
    LoginComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
  ],
  providers: [ProductService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
