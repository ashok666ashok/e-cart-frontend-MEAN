import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allproducts: any = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.api.getAllProducts().subscribe({
      next: (res: any) => {
        this.allproducts = res;
      },
      error: (reason: any) => {
        console.log(reason);
      },
    });
  }
  addToCart(product:any){
    const existingUser=sessionStorage.getItem('existingUser')
    if(sessionStorage.getItem('token')){
    product.quantity=1
    this.api.addToCartApi(product).subscribe({
      next:(res:any)=>{
        alert(res)
        this.api.getCartCount()
      },error:(reason:any)=>{
        alert(reason.error)
      }
    })
    }else{
      alert('please loggin')
    }
  }
  addToWhishlistt(product:any){
    const existingUser=sessionStorage.getItem('existingUser')
    if(sessionStorage.getItem('token')){
      this.api.addToWishlistApi(product).subscribe({
        next:(res:any)=>{
          alert(`product ${product.title} added to wishlist`)
          this.api.getWishlistCount()
        },
        error:(err:any)=> {
            console.log(err);
            alert(err)
            
        },
      })

    }else{
      alert('please loggin')
    }
  }
}
