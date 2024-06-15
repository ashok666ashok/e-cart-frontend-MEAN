import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ApiService} from '../services/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 products:any=[]
 total:number=0
//  totalPrice:Number=0

 constructor(private api:ApiService,private router:Router){}
  ngOnInit(): void {
    this.getCart()
    this.cartTotal()

    
  }

  

  getCart(){
    if(sessionStorage.getItem('token')){
      this.api.getCartApi().subscribe({
  next:(res)=>{
    this.products=res

    // console.log(this.products) 
 
   this.api.getCartCount()
  },
  error:(reason)=>{
    console.log(reason.error)
  }
})
    }else(
      alert('please login')
    )

  }

  removeCart(id:any){
   this.api.removeCartApi(id).subscribe((res:any)=>{
    this.getCart()
    alert('item removed successfully')

   })
  }

 incrementCart(id:any){
  this.api.incrementCartItem(id).subscribe({
    next:(res:any)=>{
      this.getCart()
    },error:(err:any)=>{
      console.log(err)
    }
  })
 }
 decrementCart(id:any){
  this.api.decrementCartItem(id).subscribe({
    next:(res:any)=>{
      this.getCart()
      // alert(res)
    },error:(err:any)=>{
      console.log(err)
      alert(err.error)
    }
  })
 }

 cartTotal(){
  this.api.cartTotal().subscribe((res:any)=>{
    // this.total=res
    // console.log(res)
    res.forEach((p:any)=>{
    this.total+=p.totalPrice
    
    })
    console.log('total',this.total)
  })
 }

}
