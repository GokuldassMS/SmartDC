import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { first } from 'rxjs/operators';
import { format, endOfMonth, differenceInCalendarDays, subHours } from 'date-fns';
import { UserService } from '../_services/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  UserList:any=[];
  userAddEditForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = false;

  userId: number =0;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  status:string; 
  phoneNoCode:string; 
  phoneNo:string;  
  email:string;
  createdBy: number; 
  createdOn: string; 
  modifiedBy: number; 
  modifiedOn: string;

  isChecked=false;
  error: string = null;
  addupdateUser : any;
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
    this.userId=0;
    this.userAddEditForm.reset();
    this.initializeControls();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getUserList(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private fb: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.getUserList(this.pageIndex, this.pageSize, null, null, []); 
    this.initializeControls();

  }

  submitForm(): void {
    for (const i in this.userAddEditForm.controls) {
      if (this.userAddEditForm.controls.hasOwnProperty(i)) {
        this.userAddEditForm.controls[i].markAsDirty();
        this.userAddEditForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.userAddEditForm.invalid) {       
      return;
    }
    this.loading = true; 
    this.status='A';                 
    if (this.userId > 0) {            
      if (this.addupdateUser.userName.toUpperCase() !== this.userName.toUpperCase()){
          this.OnUserNameExist();                            
      } 
      else {
          this.saveUser();
      }         
    } 
    else {                    
        this.OnUserNameExist();           
    }
    return;
  }


  saveUser(){   
    this.currentDate = new Date();
    this.gettime= format(new Date(this.currentDate.getTime()),'hh:mm:ss');

    this.status='I';
    if (this.isChecked){  this.status='A'; } 
    this.addupdateUser = {
      userId:this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
      status: this.status,
      phoneNoCode: this.phoneNoCode,  
      phoneNo: this.phoneNo,
      email: this.email, 
      createdBy: this.userId > 0 ? this.createdBy : 4 ,    //this.createdBy,To be changed
      createdOn: this.userId > 0 ? this.addupdateUser.createdOn: format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z',
      modifiedBy: this.userId > 0 ? 4 : null ,
      modifiedOn: this.userId > 0 ? format(this.currentDate,'yyyy-MM-dd') +'T' + this.gettime+'.000Z' : null 
    };

    if (this.userId > 0) {             
        this.userService.updateUser(this.addupdateUser).subscribe(res=>{                
            this.toastr.success('Updated successfully', 'SmartDC - User(s)') 
            this.resetForm();
            this.getUserList(this.pageIndex, this.pageSize, null, null, []); 
        },
        
        error => {
            this.error = error;
            this.loading = false;
        });                      
                  
    }
    else {
    
          this.userService.addUser(this.addupdateUser)
          .pipe(first())
          .subscribe(
              data => {                                                                     
                  this.toastr.success('Added successfully', 'SmartDC - User(s)')
                  this.resetForm();
                  this.getUserList(this.pageIndex, this.pageSize, null, null, []); 
              },
              error => {
                  this.error = error;
                  this.loading = false;                  
              }); 
    }
    
  }   

  OnUserNameExist(){
    this.userService.usernameExist(this.userName)
    .pipe(first())
        .subscribe(
            data => {
                if (data.status=='Exist') {                   
                    this.error = data.message;                                                           
                    this.loading = false;                                           
                    return;
                }
                else {
                    this.saveUser();
                }                                     
            },
            error => {               
                this.error = error;                 
                this.loading = false;
            }); 
  }

  getUserList(
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
    
    this.userService.getUserCount(params).subscribe(data => {
      this.total =parseInt(data.toString()); 
    });

    this.userService.getAllByFilter(params).subscribe(data => {
      this.loading = false;
      this.UserList=data;
      console.log(data);
      });
  }

  deleteCust(id: number){
      this.userService.deleteUser(id).subscribe(data=>{         
        this.getUserList(this.pageIndex, this.pageSize, null, null, []);  
        this.toastr.error("Deleted successfully", 'SmartDC - User(s)');
      })
    
  }

  ShowUserDetails(item): void {
    this.addupdateUser=item;
    console.log(this.addupdateUser);
    this.DisplayUserDetails();
        
  }

  DisplayUserDetails(){
    this.userId=this.addupdateUser.userId;
    this.firstName= this.addupdateUser.firstName;
    this.lastName= this.addupdateUser.lastName;
    this.userName = this.addupdateUser.userName;
    this.password = this.addupdateUser.password;
    this.status=this.addupdateUser.status;
    if (this.addupdateUser.status=='A'){
      this.isChecked=true;
    }  
    else {
      this.isChecked =false;
    }
    this.phoneNoCode = this.addupdateUser.phoneNoCode;
    this.phoneNo = this.addupdateUser.phoneNo;
    this.email = this.addupdateUser.email;
    this.createdBy = this.addupdateUser.createdBy
    this.createdOn = this.addupdateUser.createdOn;
    this.modifiedBy = this.addupdateUser.modifiedBy;
    this.modifiedOn =this.addupdateUser.modifiedOn;

  }

  initializeControls(){
    this.userAddEditForm = this.fb.group({

      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      password: [null,[Validators.required]],
      email: [null, null],
      status: [true],
      phoneNoCode: ['+91'],
      phoneNo: [null, [Validators.required]],
    });

    this.phoneNoCode='+91';
    this.isChecked = true;
  }

}