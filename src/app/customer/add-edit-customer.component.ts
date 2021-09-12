import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { first } from 'rxjs/operators';
import { format, endOfMonth, differenceInCalendarDays, subHours } from 'date-fns';

import { CustomerService } from '../_services/customer.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  custAddEditForm: FormGroup;
  cust:any; 
  //compList:any=[];
  CustomerList:any=[];
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = false;

  customerId: number = 0;
  customerName: string;  
  gstNo: string; 
  address1: string;  
  address2: string;  
  city: string; 
  pinCode: string;  
  phoneNoCode: string;  
  phoneNo: string; 
  altPhoneNoCode: string; 
  altPhoneNo: string;  
  status: string; 
  createdBy: number; 
  createdOn: string; 
  modifiedBy: number; 
  modifiedOn: string; 


  isChecked=false;
  error: string = null;
  addupdateCust : any;
  currentDate:any;
  gettime:any;


  filterStatus = [
    { text: 'Active', value: 'A' },
    { text: 'Inactive', value: 'I' }
  ];


  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.error=null;
    this.customerId=0;
    this.custAddEditForm.reset();
    this.initializeControls();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getcustomerList(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private fb: FormBuilder,
    private custService:CustomerService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {

    this.getcustomerList(this.pageIndex, this.pageSize, null, null, []); 
    this.initializeControls();
   
  }

  submitForm(): void {
    for (const i in this.custAddEditForm.controls) {
      if (this.custAddEditForm.controls.hasOwnProperty(i)) {
        this.custAddEditForm.controls[i].markAsDirty();
        this.custAddEditForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.custAddEditForm.invalid) {       
      return;
    }
    this.loading = true; 
    this.status='A';                 
    if (this.customerId > 0) {            
      if (this.addupdateCust.customerName.toUpperCase() !== this.customerName.toUpperCase()){
          this.OnCustNameExist();                            
      } 
      else {
          this.saveCustomer();
      }         
    } 
    else {                    
        this.OnCustNameExist();           
    }
    return;
  }


  saveCustomer(){   
    this.currentDate = new Date();
    this.gettime= format(new Date(this.currentDate.getTime()),'hh:mm:ss');

    this.status='I';
    if (this.isChecked){  this.status='A'; } 
    this.addupdateCust = {
      customerId:this.customerId,
      customerName: this.customerName,
      gstNo: this.gstNo,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      pinCode: this.pinCode, 
      phoneNoCode: this.phoneNoCode,  
      phoneNo: this.phoneNo,
      altPhoneNoCode: this.altPhoneNoCode, 
      altPhoneNo: this.altPhoneNo,
      status: this.status,
      createdBy: this.customerId > 0 ? this.createdBy : 4 ,    //this.createdBy,To be changed
      createdOn: this.customerId > 0 ? this.addupdateCust.createdOn: format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z',
      modifiedBy: this.customerId > 0 ? 4 : null ,
      modifiedOn: this.customerId > 0 ? format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z' : null 
    };

    if (this.customerId > 0) {             
        this.custService.updateCustomer(this.addupdateCust).subscribe(res=>{                
            //this.onCancel(); 
            this.toastr.success('Updated successfully', 'SmartDC - Customer(s)') 
            this.resetForm();
            this.getcustomerList(this.pageIndex, this.pageSize, null, null, []); 
        },
        
        error => {
            this.error = error;
            this.loading = false;
        });                      
                  
    }
    else {
    
          this.custService.addCustomer(this.addupdateCust)
          .pipe(first())
          .subscribe(
              data => {                                                                     
                  //this.onCancel();  
                  this.toastr.success('Added successfully', 'SmartDC - Customer(s)')
                  this.resetForm();
                  this.getcustomerList(this.pageIndex, this.pageSize, null, null, []); 
              },
              error => {
                  this.error = error;
                  this.loading = false;                  
              }); 
    }
    
  }   

  OnCustNameExist(){
    this.custService.CustomerNameExist(this.customerName)
    .pipe(first())
        .subscribe(
            data => {
                if (data.status=='Exist') {                   
                    this.error = data.message;                                                           
                    this.loading = false;                                           
                    return;
                }
                else {
                    this.saveCustomer();
                }                                     
            },
            error => {               
                this.error = error;                 
                this.loading = false;
            }); 
  }

  getcustomerList(
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
    
    this.custService.getCustomerCount(params).subscribe(data => {
      this.total =parseInt(data.toString()); 
    });

    this.custService.getAllByFilter(params).subscribe(data => {
      this.loading = false;
      this.CustomerList=data;
      console.log(data);
      });
  }

  deleteCust(id: number){
      this.custService.deleteCustomer(id).subscribe(data=>{         
        this.getcustomerList(this.pageIndex, this.pageSize, null, null, []);  
        this.toastr.error("Deleted successfully", 'SmartDC - Customer(s)');
      })
    
  }

  ShowCustomerDetails(item): void {
    this.addupdateCust=item;
    console.log(this.addupdateCust);
    this.DisplayCustomerDetails();
        
  }

  DisplayCustomerDetails(){
    this.customerId=this.addupdateCust.customerId;
    this.customerName= this.addupdateCust.customerName;
    this.gstNo= this.addupdateCust.gstNo;
    this.address1 = this.addupdateCust.address1;
    this.address2 = this.addupdateCust.address2;
    this.city = this.addupdateCust.city;
    this.pinCode =this.addupdateCust.pinCode;
    this.phoneNoCode = this.addupdateCust.phoneNoCode;
    this.phoneNo = this.addupdateCust.phoneNo;
    this.altPhoneNoCode = this.addupdateCust.altPhoneNoCode;
    this.altPhoneNo = this.addupdateCust.altPhoneNo;
    this.status=this.addupdateCust.status;
    if (this.addupdateCust.status=='A'){
      this.isChecked=true;
    }  
    else {
      this.isChecked =false;
    }
    this.createdBy = this.addupdateCust.createdBy
    this.createdOn = this.addupdateCust.createdOn;
    this.modifiedBy = this.addupdateCust.modifiedBy;
    this.modifiedOn =this.addupdateCust.modifiedOn;
  }

  initializeControls(){
    this.custAddEditForm = this.fb.group({
      customerName: [null, [Validators.required]],
      gstNo: [null, [Validators.required]],
      address1: [null, [Validators.required]],
      address2: [null, null],
      city: [null, [Validators.required]],
      status: [true],
      pinCode: [null, [Validators.required]],
      phoneNoCode: ['+91'],
      phoneNo: [null, [Validators.required]],
      altPhoneNoCode: ['+91'],
      altPhoneNo: [null, null],
    });

    this.phoneNoCode='+91';
    this.altPhoneNoCode='+91';
    this.isChecked = true;
  }

}