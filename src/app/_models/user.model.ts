export class User {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    status:string; 
    phoneNoCode:string; 
    phoneNo:string;  
    email:string;
    token: string;
    createdBy: number; 
    createdOn: string; 
    modifiedBy: number; 
    modifiedOn: string;

    constructor(userId:number,firstName: string,lastName: string,
        userName:string,pwd:string,status:string,phoneNoCode:string,phoneNo:string,email:string,
        createdBy: number,createdOn: string,modifiedBy: number,modifiedOn: string
        ) {
        this.userId = userId;
        this.firstName = firstName; 
        this.lastName=lastName;  
        this.userName=userName;
        this.password=pwd;
        this.status=status;
        this.phoneNoCode=phoneNoCode;
        this.phoneNo=phoneNo;
        this.email=email;
        this.createdBy = createdBy; 
        this.createdOn = createdOn; 
        this.modifiedBy = modifiedBy; 
        this.modifiedOn = modifiedOn;   

    }
}