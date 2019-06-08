import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {AddToCartService} from '../../../static/productServices/add-to-cart.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 /*  @Output() hideCategory = new EventEmitter<boolean>(); */
  cartProducts = [];
  constructor(private cartService:AddToCartService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }
  /* i = 0; */
  totalPrice:number = 0;
  totalItems:number = 0;

  ngOnInit() {
    this.refreshData();
    console.log('in Cart Products');
      
  }

  refreshData(){
    this.cartService.displayCart().snapshotChanges().subscribe(item => {
      console.log('got called --- 2');
      console.log(item);
      this.cartProducts = [];
      item.forEach(ele => {
        let y = ele.payload.toJSON();
        y['key'] = ele.key;
        this.cartProducts.push(y);
      });
      this.calculateTotal();
      console.log(this.cartProducts);  
    });
  }

  removeProduct(product){
    this.totalPrice = this.totalPrice - parseInt(product.productPrice);
    this.cartService.removeFromCart(product);    
  }

  /* ngDoCheck(){
    this.i++;
    console.log('in doCheck' + this.i);
  } */

  calculateTotal(){
    this.totalItems = (this.cartProducts).length;
    for(let i of this.cartProducts){
      this.totalPrice += parseInt(i.productPrice);
    }
  }

  proceedToPayment(){
   /*  this.hideCategory.emit(true); */
    if(!this.totalItems){
      return;
    }
    this.router.navigate(['../proceedPayment',{totalItems:this.totalItems,totalAmount:this.totalPrice}],{relativeTo:this.activatedRoute});
  }

}
