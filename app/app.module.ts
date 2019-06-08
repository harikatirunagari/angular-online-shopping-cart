import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {environment} from './environment/environment';

import {AppRouting,routingComponents} from './app.routing';

import { SampleSelectionDirective } from './static/sample-selection.directive';

import { RegisterService } from './static/register.service';
import {LoginService} from './static/login.service';
import { CategoriesService } from './static/productServices/product-categories.service';

import { ProductsByCategoryService } from './static/productServices/products-by-category.service';
import { AddToCartService } from './static/productServices/add-to-cart.service';








@NgModule({
  imports:      [ BrowserModule, FormsModule,
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireDatabaseModule, AppRouting,
                ReactiveFormsModule
                ],

  declarations: [ AppComponent,routingComponents, SampleSelectionDirective,    ],
  bootstrap:    [ AppComponent ],
  providers: [RegisterService, LoginService, CategoriesService, ProductsByCategoryService, AddToCartService]
})
export class AppModule { }
