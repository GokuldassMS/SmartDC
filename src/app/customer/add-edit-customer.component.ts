import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = false;

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder) {}
  CustomerList:any=[];

  ngOnInit(): void {

    this.validateForm = this.fb.group({

      customerName: [null, [Validators.required]],
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

  onQueryParamsChange(params: NzTableQueryParams): void {
    
  }

}