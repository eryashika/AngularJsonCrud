import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ProductsModel } from 'src/app/models/products_model';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title = 'Angular Practical-Yashika';
  searchText!: string;
  products!: ProductsModel[];
  width = 150;
  margin = 1;
  pageSelect!: number;

  constructor(private productService: ProductServiceService) { 
  }

  ngOnInit(): void {
    this.productService.getAll()
    .pipe(first())
    .subscribe(prod => this.products = prod);
  }

  deleteProduct(id: number) {
    let index = this.products.findIndex(x => x.id === id);
    this.products.splice(index ,1);
}

refresh(){
  localStorage.clear();
  window.location.reload();
}

// onChange(event: any){
//  this.pageSelect = event.value;
// }

}
