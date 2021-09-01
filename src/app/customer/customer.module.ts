import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { AddEditCustomerComponent } from './add-edit-customer.component';
import { CustomerRoutingModule } from './customer-routing-module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CustomerRoutingModule,
        FormsModule,
        NgZorroAntdModule,
       
    ],
    declarations: [
        LayoutComponent,
        AddEditCustomerComponent
    ]
})
export class CustomerModule { }