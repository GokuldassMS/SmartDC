import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
//import { SharedModule } from '../shared/shared.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { UsersListComponent } from './users-list.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        FormsModule,
        NgZorroAntdModule,
       
    ],
    declarations: [
        LayoutComponent,
        UsersListComponent
    ]
})
export class UsersModule { }