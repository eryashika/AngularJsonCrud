import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductsComponent } from './Components/add-edit-products/add-edit-products.component';
import { ProductsComponent } from './Components/products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'add', component: AddEditProductsComponent },
  { path: 'edit/:id', component: AddEditProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
