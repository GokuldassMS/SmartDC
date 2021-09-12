import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Company } from '../_models/company.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, take, exhaustMap,catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {HttpHeaders} from '@angular/common/http'; 


@Injectable({ providedIn: 'root' })
export class CompanyService {
    private companies: Company[] = [];
    readonly baseURL = 'http://localhost:6821/api/company';      
    private headers: HttpHeaders;
    header : any;

    companiesChanged = new Subject<Company[]>();
    constructor(public http : HttpClient) { 
      this.headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4201'
    });   
    } 

    addCompany(company: Company) {
        /*this.departments.push(department);        
        this.departmentsChanged.next(this.departments.slice());*/   
        return this.http.post(this.baseURL, company);
    }

    updateCompany(company: Company){      
      return this.http.put(`${this.baseURL}/${company.companyId}`,company);
    }

    getAll() {   
         
      return this.http.get(this.baseURL,  { headers: this.headers } );  
    }

    getCompanyCount(params) {   
         
      return this.http.get(this.baseURL+ '/GetCompCount',  {params } );  
    }

    getAllByFilter(params) {   
         
      return this.http.get(this.baseURL+ '/GetCompaniesByFilter',  { params } );  
    }

    companyNameExist(companyName:string){    
      return this.http.post<any>(this.baseURL+ '/GetCompanyNameExists',{ companyName: companyName },{ headers: this.header});
    }

    deleteCompany(id:number){
     return this.http.delete(`${this.baseURL}/${id}`);
    }

}