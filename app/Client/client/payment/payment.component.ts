import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AddToCartService} from '../../../static/productServices/add-to-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  address;
  locality;
  emailId;
  Pay;
  cardNumber;
  cvv;
  shippingId;
  showShipping=false;

  totalItems:number = 0;
  totalAmount:number = 0;
  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private cartService:AddToCartService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.totalItems = parseInt(params.totalItems);
      this.totalAmount = parseInt(params.totalAmount);
      /* console.log(params.get('totalItems'));
      console.log(params.get('totalPrice')); */
      console.log(params.totalAmount);
      console.log(params.totalItems)
    });
  }

  takeOrder(payForm:NgForm){
    console.log('in Place Order');
    console.log(payForm.value);
    /* let a = this.cartService.verifyUserEmailId(payForm.value.emailId);
    console.log(a);
    if(a){

    } */
    let b = Math.random()*100;
    this.shippingId = b;
    this.showShipping = true;
    this.cartService.storeShippingId(b);
  }

  

}
