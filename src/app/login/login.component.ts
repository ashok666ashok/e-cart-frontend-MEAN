import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern(`[a-zA-Z,0-9]*`)]],
    
  })
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}

  login(){
    if(this.loginForm.valid){
      const email=this.loginForm.value.email
      const password=this.loginForm.value.password
      const user={email,password}

      this.api.loginApi(user).subscribe({
        next:(res:any)=>{
          alert(`${res.existingUser.username} has loggedIn...`)
          sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
          sessionStorage.setItem('token',res.token)
          this.api.getWishlistCount()
          this.api.getCartCount()
          this.loginForm.reset()
          this.router.navigateByUrl('')

        },
        error:(reason:any)=>{
          alert(reason.error)
        }
      })

    }else{
      alert('invalid form')
    }
  }
}
