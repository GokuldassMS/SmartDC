import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {

  validateForm!: FormGroup;
  purchaseForm:FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = false;
  isVisibleTop = false;
  isVisibleMiddle = false;
  purchaseTitle='';
  isVisible = false;

  size: NzSelectSizeType = 'default';
  listOfOption: Array<{ label: string; value: string }> = [];
  
  multipleValue = ['a10', 'c12'];

  custListOfOption = ['Option 01', 'Option 02'];
  listOfSelectedValue = ['Default 01', 'Default 02'];
  defaultOption = [...this.listOfSelectedValue];

  selectedValue = 'Default';
  

  resetForm(): void {
    this.validateForm.reset();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    
  }

  constructor(private fb: FormBuilder) {}
  PurchaseList:any=[];

  ngOnInit(): void {

    //this.purchaseTitle='Add Purchase Details';

    this.validateForm = this.fb.group({

      customerName: [null, [Validators.required]],
      purchaseDate: [null, null],
      dcNo: [null, null],
     
    });

    this.purchaseForm = this.fb.group({

      purCustomerName: [null, [Validators.required]],
      purDate: [null, [Validators.required]],
      purStyleNo:  [null, [Validators.required]],
      purDcNo:  [null, [Validators.required]],
      purVehicleNo:  [null, [Validators.required]],
     
    });

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 0; i < 5; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
   
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  showModal(): void {
    this.purchaseTitle="Add Purchase Details";
    this.isVisible = true;
  }

  handleOk(): void {
    for (const i in this.purchaseForm.controls) {
      if (this.purchaseForm.controls.hasOwnProperty(i)) {
        this.purchaseForm.controls[i].markAsDirty();
        this.purchaseForm.controls[i].updateValueAndValidity();
      }
    }

    alert(this.purchaseForm.invalid);
    if (this.purchaseForm.invalid) {       
        return;
    }

    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}