import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing-module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        FormsModule,
        NgZorroAntdModule,
       
    ],
    declarations: [
        LayoutComponent,
        DashboardComponent
    ]
})
export class DashboardModule { }