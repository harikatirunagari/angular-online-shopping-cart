import { Component, OnInit } from '@angular/core';
import {AddToCartService} from '../../../static/productServices/add-to-cart.service';

@Component({
  selector: 'app-show-shipping-details',
  templateUrl: './show-shipping-details.component.html',
  styleUrls: ['./show-shipping-details.component.css']
})
export class ShowShippingDetailsComponent implements OnInit {

  shipingDetails = [];
  constructor(
    private cartService:AddToCartService) { }

  ngOnInit() {
    this.cartService.getShippingDetails().snapshotChanges().subscribe(item => {
      this.shipingDetails = [];
      item.forEach(ele => {
        let y = ele.payload.toJSON();
        this.shipingDetails.push(y);
      });
    });
  }

}
