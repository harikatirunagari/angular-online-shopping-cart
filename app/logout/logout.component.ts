import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {AddToCartService} from '../static/productServices/add-to-cart.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  userName:string = '';
  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private cartService:AddToCartService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params.userName);
      if(params.userName != 'admin'){
        this.userName = params.userName;
        this.cartService.removeFromCart();
      }
    });
  }

}
