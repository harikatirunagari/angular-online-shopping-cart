import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductsByCategoryService} from '../../../../static/productServices/products-by-category.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() productData;
  @Output() refreshRequest = new EventEmitter<boolean>();
  /* editForm:NgForm;
  productName:string = '';
  productPrice:string = '';
  $key:string = null; */

  constructor(private productsService:ProductsByCategoryService) { }

  ngOnInit() {
   this.resetForm();
  }

  editedInfo(formData){
    console.log(formData.value);
    this.productsService.updateProduct(formData.value);
    this.resetForm(formData);
    this.refreshRequest.emit(true);
  }

  resetForm(myForm?:NgForm){   
    this.productData = {
      productName:'',
      productPrice:0,
      productImg:'',
      productBrand:'',
      key:null,
      category:''
    }
    if(myForm){ myForm.reset();}    
  }

}
