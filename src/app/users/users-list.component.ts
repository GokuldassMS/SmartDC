import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = false;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    
  }

  constructor(private fb: FormBuilder) {}
  UserList:any=[];

  ngOnInit(): void {

    this.validateForm = this.fb.group({

      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      password: [null,[Validators.required]],
      email: [null, null],
      status: [true],
      phoneNoCode: ['+91'],
      phoneNo: [null, [Validators.required]],
    });
   
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

}