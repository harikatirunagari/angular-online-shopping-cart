import { Injectable } from '@angular/core';
import {CategoriesService} from './product-categories.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ProductsByCategoryService {

  productsByCategory:any = [];

  constructor(private categories:CategoriesService,
              private db:AngularFireDatabase) { }

  getProductsByCategory(category){
    return this.db.list(`Products/${category}`);
  }

 
  addProductsByCategory(data){
    let d = {
      productName:data.productName,
      productPrice:data.productPrice,
      productImg:data.productImg,
      productBrand:data.productBrand
    };
    
    this.db.list(`Products/${data.productCategory}`).push(d);
  }

  updateProduct(data){
    console.log(data);
    this.db.list(`Products/${data.category}`).update(data.key,{
      productName:data.productName,
      productPrice:data.productPrice,
      productImg:data.productImg,
      productBrand:data.productBrand
    });
  }

  deleteProduct(data){
    this.db.list(`Products/${data.category}`).remove(data.key);
  }

}
