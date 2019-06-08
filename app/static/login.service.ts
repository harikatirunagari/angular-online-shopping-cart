import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList,AngularFireObject} from 'angularfire2/database';

@Injectable()
export class LoginService {

  adminUser:any;
  obj={
    admin:false,
    userName:'',
    $key:null
  };
  inputData;
  

  //fireList:AngularFireList<any>;
  clientsList:any = [];

  constructor(private db:AngularFireDatabase) {
    this.getAdmindata();
    this.getClientdata();    
  }
 

  validateLogin(data){
    this.inputData = data;
    //console.log(this.getAdmindata());    
    /* let a = this.getAdmindata();
    console.log(a); */
    let a = this.checkAdminLogin(this.adminUser);
    console.log(a);
    if(a) {return a;}
    console.log('HHHH');
    let b = this.validateClient();
    console.log(b);
    if(b) {return b;}  
    
  }

  checkAdminLogin(y){
    let a = this.inputData.userName != y.userName;
    if(a){ return false;}
    let b = this.inputData.password != y.password;
    if(b) {return false;}

    this.obj.admin = true;
    this.obj.userName = y.userName;
    console.log('i checkAdminLogin');
    console.log(this.obj);
    return this.obj;    
  }

  getAdmindata(){
    //console.log('check for Admin');
    this.db.object('Users/Admin').snapshotChanges().subscribe(item => {
      let y = item.payload.toJSON();
      this.adminUser = y;      
    });
  }

  

  getClientdata(){
    this.db.list('Users/clients').snapshotChanges().subscribe(listItems => {
      this.clientsList = [];
      listItems.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;        
        this.clientsList.push(y);        
      });
    });
  }

  validateClient(){
    for(let i of this.clientsList){
      let a = this.checkClientData(i);
      if(a){ return a;}
    }
    return false;
  }

  checkClientData(y){
    let a = this.inputData.userName != y.userName;
    //console.log(`${this.inputData.userName } ${y.userName}`);
    if(a){ return false;}
    let b = this.inputData.password != y.password;
    //console.log(`${this.inputData.password } ${y.password}`);
    if(b) {return false;}

    this.obj.admin = false;
    this.obj.userName = y.userName;
    this.obj.$key = y.$key;
    /* console.log(this.obj); */
    return  this.obj;
  }

  

}
