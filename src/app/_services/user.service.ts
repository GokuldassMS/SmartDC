import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { User } from '../_models/user.model';
import {HttpHeaders} from '@angular/common/http'; 


@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    header : any;
    Url :string;
    Url1 :string;
    private headers: HttpHeaders;
    readonly baseURL = 'http://localhost:6821/api/user';   
        
    constructor(
        private router: Router,
        private http: HttpClient
    ) {   
        this.headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4201'
        });       
    }

    usernameExist(userName:string){
        return this.http.post<any>(this.baseURL+ '/GetUserNameExists',{ username: userName },{ headers: this.header})
    }

    getUserCount(params) {   
        return this.http.get(this.baseURL+ '/GetUserCount',   {params } );  
    }
  
    getAllByFilter(params) { 
        return this.http.get(this.baseURL+ '/GetUsersByFilter',  { params } );  
    }

    addUser(user: User) {
        /*this.departments.push(department);        
        this.departmentsChanged.next(this.departments.slice());*/   
        return this.http.post(this.baseURL, user);
    }

    updateUser(user: User){           
        return this.http.put(`${this.baseURL}/${user.userId}`,user);
    }
    deleteUser(id:number){
        return this.http.delete(`${this.baseURL}/${id}`);
    }

  
}