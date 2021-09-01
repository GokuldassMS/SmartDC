import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//import { EmployeesRoutingModule } from './employees-routing.module';
import { LayoutComponent } from './layout.component';
//import { EmployeeListComponent } from './employee-list.component';
//import { SharedModule } from '../shared/shared.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { AddEditCompanyComponent } from './add-edit-company.component';
import { CompanyRoutingModule } from './company-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        //EmployeesRoutingModule,
        CompanyRoutingModule,
        FormsModule,
        NgZorroAntdModule,
       
    ],
    declarations: [
        LayoutComponent,
        AddEditCompanyComponent
    ]
})
export class CompanyModule { }