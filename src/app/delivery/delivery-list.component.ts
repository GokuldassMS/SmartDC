import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  validateForm!: FormGroup;
  deliveryForm:FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  size: NzSelectSizeType = 'default';
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = false;
  deliveryTitle='';
  isVisible = false;

  listOfOption: Array<{ label: string; value: string }> = [];
  
  multipleValue = ['a10', 'c12'];

  companyListOfOption = ['Company 01', 'Company 02'];
  listOfSelectedValue = ['Default 01', 'Default 02'];
  defaultOption = [...this.listOfSelectedValue];

  selectedValue = 'Default';
  
  

  resetForm(): void {
    this.validateForm.reset();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    
  }

  constructor(private fb: FormBuilder,
              private router: Router,) {}
  DeliveryList:any=[];

  ngOnInit(): void {

    this.validateForm = this.fb.group({

      customerName: [null, [Validators.required]],
      deliveryDate: [null, null],
      ChallanNo: [null, null],
      partyDCNo: [null, null],
     
    });

    this.addField();

    this.deliveryForm = this.fb.group({

      delCompName: [null, [Validators.required]],
      delCompGSTNo: [null,null],
      delCustName: [null, [Validators.required]],
      delCustGSTNo: [null,null],
      delPurchaseDate: [null, [Validators.required]],
      delPartyDCNo:  [null, [Validators.required]],
      delChallanNo:  [null, [Validators.required]],
      delDate:  [null, [Validators.required]],
      delVehicleNo:  [null, [Validators.required]],
     
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
    //this.deliveryTitle="Add Delivery Details";
    //this.isVisible = true;
    this.router.navigate(['/delivery/add']);
  }

  handleOk(): void {
    for (const i in this.deliveryForm.controls) {
      if (this.deliveryForm.controls.hasOwnProperty(i)) {
        this.deliveryForm.controls[i].markAsDirty();
        this.deliveryForm.controls[i].updateValueAndValidity();
      }
    }

    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }




}