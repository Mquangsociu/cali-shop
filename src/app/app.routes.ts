import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductComponent } from './pages/product/product';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'login', component: LoginComponent },
];
