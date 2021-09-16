import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Purchase } from '../_models/purchase.model';
import {HttpHeaders} from '@angular/common/http'; 


@Injectable({ providedIn: 'root' })
export class PurchaseService {

    header : any;
    Url :string;
    Url1 :string;
    private headers: HttpHeaders;
    readonly baseURL = 'http://localhost:6821/api/PurchaseDetail';   
        
    constructor(
        private router: Router,
        private http: HttpClient
    ) {   
        this.headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4201'
        });       
    }

    getPurchaseCount(params) {   
        return this.http.get(this.baseURL+ '/GetPurchaseDetailsCount',   {params } );  
    }
  
    getAllByFilter(params) { 
        return this.http.get(this.baseURL+ '/GetPurchaseDetailsByFilter',  { params } );  
    }

    addPurchase(purchase: Purchase) {
       
        return this.http.post(this.baseURL, purchase);
    }

    updatePurchase(purchase: Purchase){    
        alert('1');       
        return this.http.put(`${this.baseURL}/${purchase.purchaseId}`,purchase);
    }
    deletePurchase(id:number){
        return this.http.delete(`${this.baseURL}/${id}`);
    }

  
}