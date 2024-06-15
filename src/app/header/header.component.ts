import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  wishlistCount:Number=0
  cartCount:Number=0
  loginUsername:String='';
  constructor(private api:ApiService){}

  ngOnInit(): void {
      if(sessionStorage.getItem('existingUser')){
        this.loginUsername = JSON.parse(sessionStorage.getItem('existingUser')||'').username.split(' ')[0];
        this.api.wishlistCount.subscribe((res:any)=>{
          this.wishlistCount=res
        })
        this.api.cartCount.subscribe((res:any)=>{
          this.cartCount=res
        }) 
      }else{
        this.loginUsername=''
      }
  }

  logout(){
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
  }

}
