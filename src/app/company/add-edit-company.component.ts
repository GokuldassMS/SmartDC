import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.scss']
})
export class AddEditCompanyComponent implements OnInit {

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
  CompanyList:any=[];

  ngOnInit(): void {

    this.validateForm = this.fb.group({

      companyName: [null, [Validators.required]],
      gstNo: [null, [Validators.required]],
      Address1: [null, [Validators.required]],
      Address2: [null, null],
      City: [null, [Validators.required]],
      status: [true],
      pinCode: [null, [Validators.required]],
      phoneNoCode: ['+91'],
      phoneNo: [null, [Validators.required]],
      altPhoneNoCode: ['+91'],
      altPhoneNo: [null, null],
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