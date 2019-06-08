import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import { ClientComponent } from './Client/client/client.component';
import { AdminComponent } from './Admin/admin/admin.component';

import { AddProductComponent } from './Admin/admin/add-product/add-product.component';
import { IndexComponent } from './Admin/admin/index/index.component';
import { UpdateProductComponent } from './Admin/admin/index/update-product/update-product.component';
import { LogoutComponent } from './logout/logout.component';

import { CategoryComponent } from './Client/client/category/category.component';
import { ProductComponent } from './Client/client/product/product.component';
import { CartComponent } from './Client/client/cart/cart.component';

import { PaymentComponent } from './Client/client/payment/payment.component';
import { ShowShippingDetailsComponent } from './Admin/admin/show-shipping-details/show-shipping-details.component';

export const routes:Routes = [
  {
    path:'',
    redirectTo:'signIn',
    pathMatch:'full'
  },
  {
    path:'signIn',
    component:SignInComponent
  },
  {
    path:'signUp',
    component:SignUpComponent
  },
  {
    path:'client',
    component:ClientComponent,
    children:[      
      {
        path:'products',
        component:ProductComponent
      },
      {
        path:'viewCart',
        component:CartComponent
      },
      {
        path:'proceedPayment',
        component:PaymentComponent
      }
    ]
  },
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {
        path:'addProduct',
        component:AddProductComponent
      },
      {
        path:'listProducts',
        component:IndexComponent        
      },
      {
        path:'shippingDetails',
        component:ShowShippingDetailsComponent
      }
    ]
  },
  {
    path:'logout/:userName',
    component:LogoutComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRouting{}

export const routingComponents = [SignUpComponent,SignInComponent,PageNotFoundComponent,ClientComponent,AdminComponent,IndexComponent,AddProductComponent,UpdateProductComponent,LogoutComponent,CategoryComponent,ProductComponent,CartComponent,PaymentComponent,ShowShippingDetailsComponent];
