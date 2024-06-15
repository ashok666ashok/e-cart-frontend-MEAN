import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  constructor(private api:ApiService){}
  products:any=[]
ngOnInit(): void {
    this.getWishlist()
}

getWishlist(){
  if(sessionStorage.getItem('token')){
    this.api.getWishlist().subscribe((res:any)=>{
    this.products=res;
    // console.log(this.products);
    this.api.getWishlistCount()
    

  })
  }else{
    alert('please loggin')
  }
  
}

removeItem(id:any){
  this.api.removeWishlist(id).subscribe((res:any)=>{
    this.getWishlist()
  })
}

addToCart(product:any){
  const existingUser=sessionStorage.getItem('existingUser')
  if(sessionStorage.getItem('token')){
  product.quantity=1
  this.api.addToCartApi(product).subscribe({
    next:(res:any)=>{
      alert(res)
      this.api.getCartCount()
      this.removeItem(product._id)
    },error:(reason:any)=>{
      alert(reason.error)
    }
  })
  }else{
    alert('please loggin')
  }
}
}
