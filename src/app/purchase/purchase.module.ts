import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { PurchaseListComponent } from './purchase-list.component';
import { PurchaseRoutingModule } from './purchase-routing-module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PurchaseRoutingModule,
        FormsModule,
        NgZorroAntdModule,
       
    ],
    declarations: [
        LayoutComponent,
        PurchaseListComponent
    ]
})
export class PurchaseModule { }