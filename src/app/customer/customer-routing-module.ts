import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AddEditCustomerComponent } from './add-edit-customer.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: AddEditCustomerComponent },
            { path: 'add', component: AddEditCustomerComponent },
            { path: 'edit/:id', component: AddEditCustomerComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }