/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './account/change-password.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


const companyModule = () => import('./company/company.module').then(x => x.CompanyModule);
const customerModule = () => import('./customer/customer.module').then(x => x.CustomerModule);
const purchaseModule = () => import('./purchase/purchase.module').then(x => x.PurchaseModule);
const deliveryModule = () => import('./delivery/delivery.module').then(x => x.DeliveryModule);
const dashboardModule = () => import('./dashboard/dashboard.module').then(x => x.DashboardModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

export const routes: Routes = [
  

    { path: '',  redirectTo: 'home',pathMatch:'full' },
    { path: 'company', loadChildren: companyModule },
    { path: 'customer', loadChildren: customerModule },
    { path: 'purchase', loadChildren: purchaseModule },
    { path: 'delivery', loadChildren: deliveryModule },
    { path: 'dashboard', loadChildren: dashboardModule },
    { path: 'users', loadChildren: usersModule },
    //{ path: 'account', loadChildren: accountModule },
    { path: 'account', component: ChangePasswordComponent },
    { path: 'home', component: HomeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    //imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
