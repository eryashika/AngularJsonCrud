import { Pipe, PipeTransform } from '@angular/core';
import { ProductsModel } from '../models/products_model';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: ProductsModel[], args: string): unknown {
    if(!args){
      return value;
    }
    return value.filter(
      item => item.name.toLowerCase().indexOf(args.toLowerCase()) > -1 
    );
  }

}
