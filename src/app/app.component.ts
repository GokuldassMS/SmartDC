import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  template: `                   
  
  <nz-layout class="app-layout" >
  <nz-sider class="menu-sidebar"
            nzCollapsible
            nzWidth="256px"
            nzBreakpoint="md"
            [(nzCollapsed)]="isCollapsed"
            [nzTrigger]="null">
    <br>
    <div class="sidebar-logo">
      <a>
        <!-- <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo"> -->
        <img src="https://img.icons8.com/emoji/96/000000/desktop-computer.png"/>
        <h1>Smart DC</h1>
      </a>
    </div>
    <ul nz-menu nzTheme="dark" nzMode="inline" [nzInlineCollapsed]="isCollapsed">
      <li nz-menu-item routerLink="/home" [nzMatchRouter]="true" routerLinkActive="active">
        <i nz-icon nzType="dashboard"></i>
        <span>Dashboard</span>
      </li>
      <li nz-submenu nzTitle="Masters" nzIcon="ordered-list">
        <ul>
          <li nz-menu-item routerLink="/company" [nzMatchRouter]="true" routerLinkActive="active">Company Details</li>
          <li nz-menu-item routerLink="/customer" [nzMatchRouter]="true" routerLinkActive="active">Customer Details</li>
          <li nz-menu-item routerLink="/users" [nzMatchRouter]="true" routerLinkActive="active">User Details</li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Transactions" nzIcon="transaction">
        <ul>
          <li nz-menu-item routerLink="/purchase" [nzMatchRouter]="true" routerLinkActive="active">Purchase Details</li>
          <li nz-menu-item routerLink="/delivery" [nzMatchRouter]="true" routerLinkActive="active">Delivery Details</li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Reports" nzIcon="form">
        <ul>
          <li nz-menu-item>Transaction History</li>
        </ul>
      </li>
      <li nz-submenu nzTitle="Account" nzIcon="user">
        <ul>
          <li nz-menu-item>My Profile</li>
        </ul>
        <ul>
          <li nz-menu-item routerLink="/account" [nzMatchRouter]="true" routerLinkActive="active">Change Password</li>
        </ul>
        <!-- <ul>
          <li nz-menu-item>Change Company</li>
        </ul>-->
        <ul>
        <li nz-menu-item>System Parameters</li>
        </ul>
      </li>
      <li nz-menu-item >
        <i nz-icon nzType="logout"></i>
        <span>Logout</span>
      </li>
    </ul>
  </nz-sider>
  <nz-layout>
    <nz-header>
      <div class="app-header">
        <span class="header-trigger" (click)="isCollapsed = !isCollapsed">
            <i class="trigger"
               nz-icon
               [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
            ></i>
        </span>
      </div>
    </nz-header>
    <nz-content>
      <!-- <nz-breadcrumb>
        <nz-breadcrumb-item>User</nz-breadcrumb-item>
        <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
      </nz-breadcrumb> -->
      <!-- <nz-breadcrumb nz-col nzFlex="auto" [nzAutoGenerate]="true"></nz-breadcrumb> -->
      <!-- <nz-breadcrumb [nzAutoGenerate]="true" [nzRouteLabel]="'customBreadcrumb'"></nz-breadcrumb> -->
      <div class="inner-content" >
        <router-outlet></router-outlet>
      </div>
    </nz-content>
  </nz-layout>
</nz-layout>
                   
`,
styles: [
  `

  /*.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  nz-header {
    background: #fff;
    padding: 0;
  }

  nz-content {
    margin: 0 16px;
  }

  nz-breadcrumb {
    margin: 16px 0;
  }

  .inner-content {
    padding: 24px;
    background: #fff;
    min-height: 360px;
  }

  nz-footer {
    text-align: center;
  }

  .app-layout {
    height: 100vh;
  }*/

  .app-layout {
    height: 100vh;
  }
  
  .menu-sidebar {
    position: relative;
    z-index: 10;
    min-height: 100vh;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
  }
  
  .header-trigger {
    height: 64px;
    padding: 20px 24px;
    font-size: 20px;
    cursor: pointer;
    transition: all .3s,padding 0s;
  }
  
  .trigger:hover {
    color: #1890ff;
  }
  
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .sidebar-logo {
    position: relative;
    height: 64px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #001529;
    transition: all .3s;
  }
  
  .sidebar-logo img {
    display: inline-block;
    height: 64px;
    width: 64px;
    vertical-align: middle;
  }
  
  .sidebar-logo h1 {
    display: inline-block;
    margin: 0 0 0 20px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    vertical-align: middle;
  }
  
  nz-header {
    padding: 0;
    width: 100%;
    z-index: 2;
  }
  
  .app-header {
    position: relative;
    height: 64px;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
  
  nz-content {
    margin: 24px;
  }
  
  .inner-content {
    padding: 24px;
    background: #fff;
    height: 100%;
  }
  
  nz-breadcrumb {
    margin: 12px 0;
  }

  `
]
})
export class AppComponent {
  error: string = null;
 
  title = 'SmartDC';
  isCollapsed = false;
  currentYear: number = new Date().getFullYear();
  
  ngOnInit(){
   
    
   }
  
}
