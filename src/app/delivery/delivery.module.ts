import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { DeliveryListComponent } from './delivery-list.component';
import { DeliveryRoutingModule } from './delivery-routing-module';
import { AddEditDeliveryComponent } from './add-edit-deliverycomponent';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DeliveryRoutingModule,
        FormsModule,
        NgZorroAntdModule,
       
    ],
    declarations: [
        LayoutComponent,
        DeliveryListComponent,
        AddEditDeliveryComponent
    ]
})
export class DeliveryModule { }