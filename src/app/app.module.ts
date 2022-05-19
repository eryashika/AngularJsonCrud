import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './Components/products/products.component';
import { backendProvider, ProductInterceptorInterceptor } from './Interceptor/product-interceptor.interceptor';
import { ProductFilterPipe } from './Pipes/product-filter.pipe';
import { AddEditProductsComponent } from './Components/add-edit-products/add-edit-products.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HighlightPipe } from './Pipes/highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFilterPipe,
    AddEditProductsComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    backendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
