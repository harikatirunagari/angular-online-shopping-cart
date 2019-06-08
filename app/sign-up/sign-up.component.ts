import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../static/register.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']

})
export class SignUpComponent implements OnInit {

  public userName:String;
  public emailId:String;
  public password:String;

  /* registrationSuccess:boolean = false; */

  constructor(private registerService:RegisterService,
              private router:Router) { }

  ngOnInit() {
  }

  submitData(f){
    this.registerService.registerClient(f.value);
    f.reset();
    /* this.registrationSuccess = true;   */  
    this.router.navigate(['signIn']);   
  }

}
