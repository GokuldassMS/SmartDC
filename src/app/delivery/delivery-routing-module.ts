import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DeliveryListComponent } from './delivery-list.component';
import { AddEditDeliveryComponent } from './add-edit-deliverycomponent';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DeliveryListComponent },
            { path: 'add', component: AddEditDeliveryComponent },
            { path: 'edit/:id', component: AddEditDeliveryComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryRoutingModule { }