import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-add-edit-delivery',
  templateUrl: './add-edit-delivery.component.html',
  styleUrls: ['./add-edit-delivery.component.scss']
})
export class AddEditDeliveryComponent implements OnInit {

  deliveryForm: FormGroup;
  companyListOfOption = ['Company 01', 'Company 02'];
  listOfSelectedValue = ['Default 01', 'Default 02'];
  defaultOption = [...this.listOfSelectedValue];

  selectedValue = 'Default';

  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  listOfControl1: Array<{ id: number; controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    const id1 = this.listOfControl1.length > 0 ? this.listOfControl1[this.listOfControl1.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };

    const control1 = {
      id1,
      controlInstance: `quantity${id1}`
    };

    const index = this.listOfControl.push(control);
    const index1 = this.listOfControl1.push(control);

    console.log(this.listOfControl[this.listOfControl.length - 1]);
    console.log(this.listOfControl1[this.listOfControl1.length - 1]);
    this.deliveryForm.addControl(
      this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required),
      
     
    );
    /*this.deliveryForm.addControl(
      this.listOfControl1[index1 - 1].controlInstance, new FormControl(null, Validators.required),
    );*/
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.deliveryForm.removeControl(i.controlInstance);
    }
    /*if (this.listOfControl1.length > 1) {
      const index1 = this.listOfControl1.indexOf(i);
      this.listOfControl.splice(index1, 1);
      console.log(this.listOfControl1);
      this.deliveryForm.removeControl(i.controlInstance);
    }*/
  }

  submitForm(): void {
    for (const i in this.deliveryForm.controls) {
      if (this.deliveryForm.controls.hasOwnProperty(i)) {
        this.deliveryForm.controls[i].markAsDirty();
        this.deliveryForm.controls[i].updateValueAndValidity();
      }
    }
    console.log(this.deliveryForm.value);
  }
  

  constructor(private fb: FormBuilder) {}
 

  ngOnInit(): void {

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

     this.addField();

  }

  

  resetForm(): void {
    this.deliveryForm.reset();
  }



  

}