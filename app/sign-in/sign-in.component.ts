import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {LoginService} from '../static/login.service';
import {Router} from '@angular/router';
import {AddToCartService} from '../static/productServices/add-to-cart.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm:FormGroup;
  userName:FormControl;
  password:FormControl;

  loginFailed:boolean = false;

  constructor(private fb:FormBuilder,
              private loginService:LoginService,
              private router:Router,
              private cartService:AddToCartService){}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.userName = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.password = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]);
  }

  createForm(){
    this.loginForm = this.fb.group({
      userName:this.userName,
      password:this.password
    });
  }

  onSubmit(){
    this.loginFailed = false;
    console.log(this.loginForm.value);
    let a = this.loginService.validateLogin(this.loginForm.value);
    console.log(a);
    if(!a){
      this.loginFailed = true;
      return;
    }
    if(a.admin){
      this.router.navigate(['admin']);
    }
    else{
      let b = {
        userName:a.userName,
        key:a.$key
      }
      this.cartService.setUserDetails(b);
      this.router.navigate(['client',b]);
    }
  }

}
