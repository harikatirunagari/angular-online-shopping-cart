import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class RegisterService {

  constructor(private db:AngularFireDatabase) {  }

  registerClient(client){
    this.db.list('Users/clients').push(client);
  }

}
