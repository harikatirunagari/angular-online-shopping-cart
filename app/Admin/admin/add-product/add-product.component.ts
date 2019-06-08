import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators,FormControl } from '@angular/forms';
import {CategoriesService} from '../../../static/productServices/product-categories.service';
import {ProductsByCategoryService} from '../../../static/productServices/products-by-category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  angForm: FormGroup;
  productCategories = [];

  productName:FormControl;
  productPrice:FormControl;
  productCategory:FormControl;
  productBrand:FormControl;
  productImg:FormControl;

  constructor(private fb: FormBuilder,
              private categories:CategoriesService,
              private byCategory:ProductsByCategoryService) {
    this.categories.getCategories().snapshotChanges().subscribe(item => {
      this.productCategories = [];
      item.forEach(ele => {
        let y = ele.payload.toJSON();
        //console.log(y);
        this.productCategories.push(y);
      });
    });;
    console.log(`${this.productCategories}`);
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({      
      productName: this.productName,
      productPrice:this.productPrice,
      productCategory:this.productCategory,
      productBrand:this.productBrand,
      productImg:this.productImg
   });
  }

  addProduct(){
    this.byCategory.addProductsByCategory(this.angForm.value);
  }

  createFormControls(){
    this.productName = new FormControl('',Validators.required);
    this.productPrice = new FormControl('',Validators.required);
    this.productCategory = new FormControl('',Validators.required);
    this.productImg = new FormControl('',Validators.required);
    this.productBrand = new FormControl('',Validators.required);
  }

  
}
