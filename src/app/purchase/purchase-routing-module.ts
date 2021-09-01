import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { PurchaseListComponent } from './purchase-list.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PurchaseListComponent },
            { path: 'add', component: PurchaseListComponent },
            { path: 'edit/:id', component: PurchaseListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseRoutingModule { }