import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Customer } from '../_models/customer.model.';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, take, exhaustMap,catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {HttpHeaders} from '@angular/common/http'; 


@Injectable({ providedIn: 'root' })
export class CustomerService {
    private customers: Customer[] = [];
    readonly baseURL = 'http://localhost:6821/api/customer';      
    private headers: HttpHeaders;
    header : any;

    customersChanged = new Subject<Customer[]>();
    constructor(public http : HttpClient) { 
      this.headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4201'
    });   
    } 

    addCustomer(customer: Customer) {
        /*this.departments.push(department);        
        this.departmentsChanged.next(this.departments.slice());*/   
        return this.http.post(this.baseURL, customer);
    }

    updateCustomer(customer: Customer){      
      return this.http.put(`${this.baseURL}/${customer.customerId}`,customer);
    }

    getAll() {   
         
      return this.http.get(this.baseURL,  { headers: this.headers } );  
    }

    getCustomerCount(params) {   
         
      return this.http.get(this.baseURL+ '/GetCustCount',  {params } );  
    }

    getAllByFilter(params) {   
         
      return this.http.get(this.baseURL+ '/GetCustomersByFilter',  { params } );  
    }

    CustomerNameExist(customerName:string){    
      return this.http.post<any>(this.baseURL+ '/GetCustomerNameExists',{ customerName: customerName },{ headers: this.header});
    }

    deleteCustomer(id:number){
     return this.http.delete(`${this.baseURL}/${id}`);
    }

}