import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList,AngularFireObject} from 'angularfire2/database';

@Injectable()
export class AddToCartService {

  userDetail = {
    userName:'',
    key:''
  };
  constructor(private db:AngularFireDatabase) { }

  addproductToCart(product){
    console.log('in Cart ---- add');
    if(this.userDetail.userName){
      console.log(`addToCart/${this.userDetail.userName}`);
      this.db.list(`addToCart/${this.userDetail.userName}`).push(product);
    }    
  }

  displayCart(){
    console.log('in DISPLAY CART ---');
    if(this.userDetail.userName){}
    console.log(`addToCart/${this.userDetail.userName}`);
    return this.db.list(`addToCart/${this.userDetail.userName}`);
  }

  removeFromCart(product?){
    if(product)
      {this.db.list(`addToCart/${this.userDetail.userName}`).remove(product.key);}
    else
      {this.db.list(`addToCart/${this.userDetail.userName}`).remove();}
  }

  setUserDetails(userDetail){    
    this.userDetail = userDetail;
    console.log('setting UserName in Add To Cart');
    console.log(this.userDetail);
  }

  verifyUserEmailId(emailId){
    console.log(this.userDetail);
    let key = this.userDetail.key;
    console.log(key);
    this.db.object(`Users/clients/${key}`).snapshotChanges().subscribe(i => {
       let y = i.payload.toJSON();
       console.log(y);
      if(y.emailId == emailId){
        console.log(y.emailId);
        return true;
      }
      else{ return false;}
    });
    /* this.db.list(`Users/clients/${key}`).snapshotChanges.subscribe(i => {
      let y = i.payload.toJSON();
      if(y.emaiId == emailId){
        return true;
      }
      else{ return false;}
    }); */
  }

  storeShippingId(shippingId){
    this.db.list('Shipping').push({
      userName:this.userDetail.userName,
      shippingId:shippingId
    });
  }

  getShippingDetails(){
    return this.db.list('Shipping');
  }

}
