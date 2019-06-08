import { Component, OnInit } from '@angular/core';
import {ProductsByCategoryService} from '../../../static/productServices/products-by-category.service';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {CategoriesService} from '../../../static/productServices/product-categories.service';
import {AddToCartService} from '../../../static/productServices/add-to-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  category;
  allCategories = [];
  productsList:any = [];
  constructor(private byCategoryService:ProductsByCategoryService,
              private router:Router,
              private categories:CategoriesService,
              private activatedRoute:ActivatedRoute,
              private cartService:AddToCartService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      let category = params.get('category');
      this.category = category;
      if(this.category){ this.getProductsfromCategory();}
      else {  this.allProducts();  }
    });
  }

  getProductsfromCategory(){    
    this.byCategoryService.getProductsByCategory(this.category).snapshotChanges().subscribe(item => {
      this.productsList = [];
      item.forEach(ele => {
        let y = ele.payload.toJSON();
        y['key'] = ele.key;
        this.productsList.push(y);
      });
    });
  }

  allProducts(){
    this.categories.getCategories().snapshotChanges().subscribe(item => {
      this.allCategories = [];
      this.productsList = [];
      item.forEach(ele => {
        let y = ele.payload.toJSON();

        this.byCategoryService.getProductsByCategory(y).snapshotChanges().subscribe(item => {
          item.forEach(ele => {
            let s = ele.payload.toJSON();
            s['key'] = ele.key;
            s['category'] = y;
            this.productsList.push(s);
          });
          
        });

        //console.log(y);
        this.allCategories.push(y);
      });
      console.log(this.allCategories);
      console.log(this.allProducts);
      
    });
  }

  addToCart(product){
    this.cartService.addproductToCart(product);
  }

}
