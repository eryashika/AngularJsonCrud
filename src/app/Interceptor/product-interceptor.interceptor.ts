import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
const productsKey = 'angular-practical-yashika';
const productsJSON = localStorage.getItem(productsKey);
let products: any[] = productsJSON ? JSON.parse(productsJSON) : [
  {
    id: 1,
    name: 'Nike',
    imageUrl: 'assets/Products/nike.jpg',
    quantity: 5,
    price: 1999
},
{
  id: 2,
  name: 'Levis',
  imageUrl: 'assets/Products/levis.jpg',
  quantity: 7,
  price: 2099
},
{
  id: 3,
  name: 'Puma',
  imageUrl: 'assets/Products/puma.jpg',
  quantity: 19,
  price: 1899
},
{
  id: 4,
  name: 'HRX',
  imageUrl: 'assets/Products/hrx.jpg',
  quantity: 26,
  price: 899
},
{
  id: 5,
  name: 'DressBerry',
  imageUrl: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/9044853/2019/4/26/7afcc1de-b5bb-469c-94d8-4e0a4d4a5df71556280740922-DressBerry-Women-Black-Solid-Round-Neck-T-shirt-186155628073-1.jpg',
  quantity: 4,
  price: 699
},
{
  id: 6,
  name: 'H&M',
  imageUrl: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/17186188/2022/2/17/819f5dcc-dbfb-44e7-b4b0-b24338ced55e1645108751701WidecottonT-shirt1.jpg',
  quantity: 27,
  price: 1099
},
{
  id: 7,
  name: 'Roadster',
  imageUrl: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10968510/2020/2/4/604f209c-9256-4c8a-b018-f15d46a9fdb11580792216828-Roadster-Women-Tshirts-8821580792215054-1.jpg',
  quantity: 43,
  price: 789
},
{
  id: 8,
  name: 'Adidas',
  imageUrl: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13544926/2021/3/2/2efba380-4e83-43a2-840b-f645b98b4e9b1614667491161-ADIDAS-Originals-Women-Black--White-Adicolor-Classics-Trefoi-1.jpg',
  quantity: 3,
  price: 1788
},
{
  id: 9,
  name: 'UCB',
  imageUrl: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13867078/2021/8/27/6e348054-2896-4337-8944-5d0cccd38d831630042026653-United-Colors-of-Benetton-Women-Green--Silver-Brand-Logo-Foi-1.jpg',
  quantity: 8,
  price: 1499
},
{
  id: 10,
  name: 'Reebok',
  imageUrl: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14795978/2021/10/25/35d2c995-e5bd-4e65-9126-193423f113451635133359572ReebokWomenBluePrintedHighWaistWORAOPRunningTightsTshirtsRee1.jpg',
  quantity: 9,
  price: 1699
}
];

@Injectable()
export class ProductInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith('/products') && method === 'GET':
                return getProducts();
            case url.match(/\/products\/\d+$/) && method === 'GET':
                return getProductsById();
            case url.endsWith('/products') && method === 'POST':
                return createProduct();
            case url.match(/\/products\/\d+$/) && method === 'PUT':
                return updateProduct();
            default:
                return next.handle(request);
        }    
    }

    function getProducts() {
        return ok(products.map(x => basicDetails(x)));
    }

    function getProductsById() {
        const productN = products.find(x => x.id === idFromUrl());
        return ok(basicDetails(productN));
    }

    function createProduct() {
      const product = body
        product.id = newProductId();
        products.push(product);
        localStorage.setItem(productsKey, JSON.stringify(products));
        return ok();
    }

    function updateProduct() {
        let params = body;
        let product = products.find(x => x.id === idFromUrl());
        Object.assign(product, params);
        localStorage.setItem(productsKey, JSON.stringify(products));
        return ok();
    }

    function basicDetails(prod: any) {
      const { id, name, imageUrl, quantity, price} = prod;
      return { id, name, imageUrl, quantity, price};
  }
  function newProductId() {
    return products.length ? Math.max(...products.map(x => x.id)) + 1 : 1;
}
  function idFromUrl() {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 1]);
}

  function ok(body?: any) {
    return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); 
}

}
}

export const backendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ProductInterceptorInterceptor,
  multi: true
};