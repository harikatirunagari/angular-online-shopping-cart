import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../../../static/productServices/product-categories.service';
import {ProductsByCategoryService} from '../../../static/productServices/products-by-category.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  allProducts = [];
  allCategories =[];
  selectedProduct;
  constructor(private categories:CategoriesService,
              private serachByCategory:ProductsByCategoryService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { 
      console.log('Hello');
      this.refreshData();
  }
  

  ngOnInit() {
  }

  refreshData(){
    this.categories.getCategories().snapshotChanges().subscribe(item => {
      this.allCategories = [];
      this.allProducts = [];
      item.forEach(ele => {
        let y = ele.payload.toJSON();

        this.serachByCategory.getProductsByCategory(y).snapshotChanges().subscribe(item => {
          item.forEach(ele => {
            let s = ele.payload.toJSON();
            s['key'] = ele.key;
            s['category'] = y;
            this.allProducts.push(s);
          });
          
        });

        //console.log(y);
        this.allCategories.push(y);
      });
      console.log(this.allCategories);
      console.log(this.allProducts);
      
    });
  }

  refreshDataRequest(event){
    console.log(event);
    if(event) {
      this.refreshData();
    }
    

  }

  updateProduct(product){
    this.selectedProduct = Object.assign({},product);
    //this.router.navigate(['updateProduct'],{relativeTo:this.activatedRoute});
  }

  deleteProduct(product){
    this.serachByCategory.deleteProduct(product);
    this.refreshData();
  }
}
