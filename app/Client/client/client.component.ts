import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {CategoriesService} from '../../static/productServices/product-categories.service';
import {ProductsByCategoryService} from '../../static/productServices/products-by-category.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  
  userName:string;
  userKey:string;
  
  categories:string[] = [];

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private categoryService:CategoriesService,
              private productsService:ProductsByCategoryService) {
    
    

    this.categoryService.getCategories().snapshotChanges().subscribe(item => {
      item.forEach(ele => {
        let y = ele.payload.toJSON();
        this.categories.push(y);
      });
    });
 }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      this.userKey = params.get('key');
      this.userName = params.get('userName');
      console.log(`${this.userKey} ${this.userName}`);
    });

    this.router.navigate(['products'],{relativeTo:this.activatedRoute});
  }


/*   getSelectedCategory(event){
    console.log('category selected ' + event);
    this.router.navigate([event],{relativeTo:this.activatedRoute});
  } */

  /* chooseCategory(category){
      console.log(category);
      this.router.navigate(['products',{category}],{relativeTo:this.activatedRoute});
  } */

  viewCart(){
    this.router.navigate(['viewCart'],{relativeTo:this.activatedRoute});
  }

  logout(){
    this.router.navigate(['logout',this.userName]);
  }

}
