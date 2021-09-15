import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { format, endOfMonth, differenceInCalendarDays, subHours } from 'date-fns';
import { CustomerService } from '../_services/customer.service';
import { PurchaseService } from '../_services/purchase.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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

  CustomerList:any=[];
  PurchaseList:any=[];
  purchaseItem:any; 
  addupdatePurchase : any;
  currentDate:any;
  gettime:any;
  error: string = null;

  purchaseId: number;
  companyId: number;
  customerId: number;
  purchaseDate: string;  
  styleNo: string; 
  dcNo: string;  
  vehicleNo: string;  
  createdBy: number; 
  createdOn: string; 
  modifiedBy: number; 
  modifiedOn: string; 

  size: NzSelectSizeType = 'default';
  listOfOption: Array<{ label: string; value: string }> = [];
  
  multipleValue = ['a10', 'c12'];

  custListOfOption = ['Option 01', 'Option 02'];
  listOfSelectedValue = ['Default 01', 'Default 02'];
  defaultOption = [...this.listOfSelectedValue];

  //selectedValue = 'Default';
  selectedCustValue = 'Default';
   

  resetForm(): void {
    this.validateForm.reset();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    
  }

  constructor(private fb: FormBuilder,
    private custService:CustomerService,
    private purchaseService:PurchaseService,
    private toastr: ToastrService,
  ) {}


  ngOnInit(): void {

    this.validateForm = this.fb.group({

      purCustName: [null, [Validators.required]],
      purDate: [null, null],
      purDcNo: [null, null],
     
    });

    this.purchaseForm = this.fb.group({

      customerName: [null, [Validators.required]],
      purchaseDate: [null, [Validators.required]],
      styleNo:  [null, [Validators.required]],
      dcNo:  [null, [Validators.required]],
      vehicleNo:  [null, [Validators.required]],
     
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

  showModal(item): void {
    this.purchaseItem=item;
  
    if ( this.purchaseItem ==''){
     
      this.purchaseItem={
        purchaseId:0,
        companyId:0,
        customerId:0,
        purchaseDate: "", 
        styleNo:"",
        dcNo: "", 
        vehicleNo:"", 
        createdBy:"",
        createdOn:"",
        modifiedBy:"",
        modifiedOn:"", 
        
      }  
      this.purchaseTitle="Add Purchase Details"; 
    }
    else {
      this.purchaseTitle="Edit Purchase Details"; 
    }

    //this.purchaseTitle="Add Purchase Details";
    this.isVisible = true;
    this.loadCustomerList();
    this.DisplayEmployeeDetails();
  }

  onSubmit(): void {
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
    this.savePurchase(); 
    this.isVisible = false;
  }

  onCancel(): void {
    this.isVisible = false;
  }

  loadCustomerList(){
    this.custService.getAll().subscribe(data=>{         
      this.CustomerList=data;
    });
  }

  savePurchase(){   
    this.currentDate = new Date();
    this.gettime= format(new Date(this.currentDate.getTime()),'hh:mm:ss');

    
    this.addupdatePurchase = {
      purchaseId:this.purchaseId,
      companyId: 4,// To be changed this.companyId,
      customerId:  parseInt(this.selectedCustValue),
      purchaseDate: this.purchaseDate,
      styleNo: this.styleNo,
      dcNo: this.dcNo,
      vehicleNo: this.vehicleNo,  
      createdBy: this.purchaseId > 0 ? this.createdBy : 4 ,    //this.createdBy,To be changed
      createdOn: this.purchaseId > 0 ? this.addupdatePurchase.createdOn: format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z',
      modifiedBy: this.purchaseId > 0 ? 4 : null ,
      modifiedOn: this.purchaseId > 0 ? format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z' : null 
    };

    if (this.purchaseId > 0) {             
        this.purchaseService.updatePurchase(this.addupdatePurchase).subscribe(res=>{                
            this.toastr.success('Updated successfully', 'SmartDC - Purchase(s)') 
            this.getPurchaseList(this.pageIndex, this.pageSize, null, null, []); 
        },
        
        error => {
            this.error = error;
            this.loading = false;
        });                      
                  
    }
    else {
    
          this.purchaseService.addPurchase(this.addupdatePurchase)
          .pipe(first())
          .subscribe(
              data => {                                                                     
                  this.toastr.success('Added successfully', 'SmartDC - Purchase(s)')
                  this.getPurchaseList(this.pageIndex, this.pageSize, null, null, []); 
              },
              error => {
                  this.error = error;
                  this.loading = false;                  
              }); 
    }
    
  } 
  
  getPurchaseList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;

    let params = new HttpParams()
    .append('pageIndex', `${pageIndex}`)
    .append('pageSize', `${pageSize}`)
    .append('sortField', `${sortField}`)
    .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
        console.log(params);
      });
      
    });
    
    this.purchaseService.getPurchaseCount(params).subscribe(data => {
      this.total =parseInt(data.toString()); 
    });

    this.purchaseService.getAllByFilter(params).subscribe(data => {
      this.loading = false;
      this.PurchaseList=data;
      console.log(data);
      });
  }

  DisplayEmployeeDetails(){
    this.purchaseId=this.purchaseItem.purchaseId;
    this.companyId=this.purchaseItem.companyId;  
    if (this.purchaseItem.customerId!=''){
      this.selectedCustValue=this.purchaseItem.customerId;
    }
    else{            
      this.selectedCustValue='Default';
    } 
    this.purchaseDate =""; 
    if (this.purchaseItem.purchaseDate !=""){
      this.purchaseDate = format(new Date(this.purchaseItem.purchaseDate), 'MM/dd/yyyy');
    }
    this.styleNo=this.purchaseItem.styleNo 
    this.dcNo=this.purchaseItem.dcNo;
    this.vehicleNo=this.purchaseItem.vehicleNo;
    this.createdBy = this.purchaseItem.createdBy
    this.createdOn = this.purchaseItem.createdOn;
    this.modifiedBy = this.purchaseItem.modifiedBy;
    this.modifiedOn =this.purchaseItem.modifiedOn;
    
  }


  

}