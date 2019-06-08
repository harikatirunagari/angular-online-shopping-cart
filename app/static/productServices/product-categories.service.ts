import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CategoriesService {

  categories = [];
  constructor(private db:AngularFireDatabase) {
    
  }

  getCategories(){
    return this.db.list('ProductCategories');
  }

  
}
