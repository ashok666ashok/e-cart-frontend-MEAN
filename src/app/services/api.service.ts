import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../userModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  wishlistCount = new BehaviorSubject(0);
  cartCount = new BehaviorSubject(0);
  totalCart = new BehaviorSubject([]);
  // paymentService=new BehaviorSubject(0)
  SERVER_URI = 'https://e-cart-api-mean.onrender.com';
  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.getWishlistCount();
      this.getCartCount();
    }
  }

  getAllProducts() {
    return this.http.get(`${this.SERVER_URI}/allproducts`);
  }

  registerApi(user: any) {
    return this.http.post(`${this.SERVER_URI}/register`, user);
  }

  loginApi(user: any) {
    return this.http.post(`${this.SERVER_URI}/login`, user);
  }

  viewProductApi(id: any) {
    return this.http.get(`${this.SERVER_URI}/viewproduct/${id}`);
  }

  appendTokenHeader() {
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }
  addToWishlistApi(product: any) {
    return this.http.post(
      `${this.SERVER_URI}/addwhishlist`,
      product,
      this.appendTokenHeader()
    );
  }

  getWishlist() {
    return this.http.get(
      `${this.SERVER_URI}/getwhishlist`,
      this.appendTokenHeader()
    );
  }

  getWishlistCount() {
    this.getWishlist().subscribe((res: any) => {
      this.wishlistCount.next(res.length);
    });
  }

  removeWishlist(id: any) {
    return this.http.delete(
      `${this.SERVER_URI}/removewishlist/${id}`,
      this.appendTokenHeader()
    );
  }

  addToCartApi(product: any) {
    return this.http.post(
      `${this.SERVER_URI}/addtocart`,
      product,
      this.appendTokenHeader()
    );
  }
  getCartApi() {
    return this.http.get(
      `${this.SERVER_URI}/getcart`,
      this.appendTokenHeader()
    );
  }

  getCartCount() {
    this.getCartApi().subscribe((res: any) => {
      this.cartCount.next(res.length);
    });
  }

  removeCartApi(id: any) {
    return this.http.delete(
      `${this.SERVER_URI}/removecart/${id}`,
      this.appendTokenHeader()
    );
  }

  incrementCartItem(id: any) {
    return this.http.get(
      `${this.SERVER_URI}/incrementcartitem/${id}`,
      this.appendTokenHeader()
    );
  }
  decrementCartItem(id: any) {
    return this.http.get(
      `${this.SERVER_URI}/decrementcartitem/${id}`,
      this.appendTokenHeader()
    );
  }

  cartTotal() {
    return this.http.get(
      `${this.SERVER_URI}/carttotalprice`,
      this.appendTokenHeader()
    );
  }
  // getCartTotal(){
  //   this.getCartApi().subscribe((res:any)=>{
  //     console.log(res)
  //     res.forEach((p:any)=>{
  //       console.log(p.totalPrice)
  //       this.totalCart+=p.totalPrice
  //       })
  //     console.log(this.totalCart)

  //   })
  // }
}
