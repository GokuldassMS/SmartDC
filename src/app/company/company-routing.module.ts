import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
//import { EmployeeListComponent } from './employee-list.component';
//import { EmployeeAddEditComponent } from './employee-add-edit.component';
import { AddEditCompanyComponent } from './add-edit-company.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: AddEditCompanyComponent },
            { path: 'add', component: AddEditCompanyComponent },
            { path: 'edit/:id', component: AddEditCompanyComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule { }