import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {CategoriesService} from '../../../static/productServices/product-categories.service';
import {Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  
  //@Output() setProductsByCategory = new EventEmitter<any>();
  categories:string[] = [];

  constructor(private categoryService:CategoriesService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }
  ngOnInit() { 
    this.categoryService.getCategories().snapshotChanges().subscribe(item => {
      item.forEach(ele => {
        let y = ele.payload.toJSON();
        this.categories.push(y);
      });
    });
  }

  chooseCategory(category){
    console.log(category);
    this.router.navigate(['products',{category}],{relativeTo:this.activatedRoute});
    //this.setProductsByCategory.emit(category);
  }
}
