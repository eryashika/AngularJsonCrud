import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductsModel } from '../models/products_model';

const baseUrl = `${environment.apiUrl}/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) {

   }

 getAll() {
    return this.http.get<ProductsModel[]>(baseUrl);
}

getById(id: string) {
    return this.http.get<ProductsModel>(`${baseUrl}/${id}`);
}

create(params: any) {
    return this.http.post(baseUrl, params);
}

update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
}

}
