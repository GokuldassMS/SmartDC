import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
//import { SharedModule } from '../shared/shared.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { ChangePasswordComponent } from './change-password.component';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        FormsModule,
        NgZorroAntdModule,
       
    ],
    declarations: [
        LayoutComponent,
        ChangePasswordComponent
    ]
})
export class AccountModule { }