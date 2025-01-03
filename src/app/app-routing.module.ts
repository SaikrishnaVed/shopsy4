import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';  // Import the component
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsCardsComponent } from './products-cards/products-cards.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ChatComponent } from './chat/chat.component';
import { ProductsListNewComponent } from './products-list-new/products-list-new.component';
import { WishListProductsComponent } from './wish-list-products/wish-list-products.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'allproducts', component: ProductsCardsComponent },
  { path: 'openCart', component: CartComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'productPage', component: ProductPageComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'productslist', component: ProductsListNewComponent },
  { path: 'wishlistitems', component: WishListProductsComponent },
  { path: 'userslist', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'profilepage', component: ProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }