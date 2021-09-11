import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CompanyService } from '../_services/company.servive';
import { first } from 'rxjs/operators';
import { format, endOfMonth, differenceInCalendarDays, subHours } from 'date-fns';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.scss']
})
export class AddEditCompanyComponent implements OnInit {

  compAddEditForm!: FormGroup;
  comp:any; 
  //compList:any=[];
  CompanyList:any=[];
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = false;

  companyId: number = 0;
  companyName: string;  
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
  addupdateComp : any;
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
    this.compAddEditForm.reset();
    this.phoneNoCode='+91';
    this.altPhoneNoCode='+91';
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getcompanyList(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private fb: FormBuilder,
    private compService:CompanyService,
    private toastr: ToastrService,
  ) {}
  
  

  ngOnInit(): void {

    this.getcompanyList(this.pageIndex, this.pageSize, null, null, []); 

    this.compAddEditForm = this.fb.group({
      companyName: [null, [Validators.required]],
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

  submitForm(): void {
    for (const i in this.compAddEditForm.controls) {
      if (this.compAddEditForm.controls.hasOwnProperty(i)) {
        this.compAddEditForm.controls[i].markAsDirty();
        this.compAddEditForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.compAddEditForm.invalid) {       
      return;
    }
    this.loading = true; 
    this.status='A';                 
    if (this.companyId > 0) {            
      if (this.addupdateComp.companyName.toUpperCase() !== this.companyName.toUpperCase()){
          this.OnCompNameExist();                            
      } 
      else {
          this.saveCompany();
      }         
    } 
    else {                    
        this.OnCompNameExist();           
    }
    return;
  }


  saveCompany(){   
    this.currentDate = new Date();
    this.gettime= format(new Date(this.currentDate.getTime()),'hh:mm:ss');

    this.status='I';
    if (this.isChecked){  this.status='A'; } 
    this.addupdateComp = {
      companyId:this.companyId,
      companyName: this.companyName,
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
      createdBy: this.companyId > 0 ? this.createdBy : 4 ,    //this.createdBy,To be changed
      createdOn: this.companyId > 0 ? this.addupdateComp.createdOn: format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z',
      modifiedBy: this.companyId > 0 ? 4 : null ,
      modifiedOn: this.companyId > 0 ? format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z' : null 
    };

    if (this.companyId > 0) {             
        this.compService.updateCompany(this.addupdateComp).subscribe(res=>{                
            //this.onCancel(); 
            this.toastr.success('Updated successfully', 'SmartDC - Companie(s)') 
            this.resetForm();
            this.getcompanyList(this.pageIndex, this.pageSize, null, null, []); 
        },
        
        error => {
            this.error = error;
            this.loading = false;
        });                      
                  
    }
    else {
    
          this.compService.addCompany(this.addupdateComp)
          .pipe(first())
          .subscribe(
              data => {                                                                     
                  //this.onCancel();  
                  this.toastr.success('Added successfully', 'SmartDC - Companie(s)')
                  this.resetForm();
                  this.getcompanyList(this.pageIndex, this.pageSize, null, null, []); 
              },
              error => {
                  this.error = error;
                  this.loading = false;                  
              }); 
    }
    
  }   

  OnCompNameExist(){
    this.compService.companyNameExist(this.companyName)
    .pipe(first())
        .subscribe(
            data => {
                if (data.status=='Exist') {                   
                    this.error = data.message;                                                           
                    this.loading = false;                                           
                    return;
                }
                else {
                    this.saveCompany();
                }                                     
            },
            error => {               
                this.error = error;                 
                this.loading = false;
            }); 
  }

  getcompanyList(
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
    
    this.compService.getCompanyCount(params).subscribe(data => {
      this.total =parseInt(data.toString()); 
    });

    this.compService.getAllByFilter(params).subscribe(data => {
      this.loading = false;
      this.CompanyList=data;
      console.log(data);
      });
  }

  deleteComp(id: number){
      this.compService.deleteCompany(id).subscribe(data=>{         
        this.getcompanyList(this.pageIndex, this.pageSize, null, null, []);  
        this.toastr.error("Deleted successfully", 'SmartDC - Companie(s)');
      })
    
  }

  ShowCompanyDetails(item): void {
    this.addupdateComp=item;
    console.log(this.addupdateComp);
    this.DisplayCompanyDetails();
        
  }

  DisplayCompanyDetails(){
    this.companyId=this.addupdateComp.companyId;
    this.companyName= this.addupdateComp.companyName;
    this.gstNo= this.addupdateComp.gstNo;
    this.address1 = this.addupdateComp.address1;
    this.address2 = this.addupdateComp.address2;
    this.city = this.addupdateComp.city;
    this.pinCode =this.addupdateComp.pinCode;
    this.phoneNoCode = this.addupdateComp.phoneNoCode;
    this.phoneNo = this.addupdateComp.phoneNo;
    this.altPhoneNoCode = this.addupdateComp.altPhoneNoCode;
    this.altPhoneNo = this.addupdateComp.altPhoneNo;
    this.status=this.addupdateComp.status;
    if (this.addupdateComp.status=='A'){
      this.isChecked=true;
    }  
    else {
      this.isChecked =false;
    }
    this.createdBy = this.addupdateComp.createdBy
    this.createdOn = this.addupdateComp.createdOn;
    this.modifiedBy = this.addupdateComp.modifiedBy;
    this.modifiedOn =this.addupdateComp.modifiedOn;
  }



}