import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  product:any={}
constructor(private api:ApiService,private route:ActivatedRoute){}
ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const{id}=res
      // console.log(res)
      this.getProduct(id)
    })
}

getProduct(pid:any){
  this.api.viewProductApi(pid).subscribe((res:any)=>{
    this.product=res;
  })
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
}
