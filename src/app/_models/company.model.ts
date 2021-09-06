export class Company {    
    public companyId: number;
    public companyName: string;  
    public gstNo: string; 
    public address1: string;  
    public address2: string;  
    public city: string; 
    public pinCode: string;  
    public phoneNoCode: string;  
    public phoneNo: string; 
    public altPhoneNoCode: string; 
    public altPhoneNo: string;  
    public status: string; 
    public createdBy: number; 
    public createdOn: string; 
    public modifiedBy: number; 
    public modifiedOn: string; 
    

    constructor(companyId: number,companyName: string,gstNo: string,address1: string,
         address2: string,city: string,pinCode: string, phoneNoCode: string,phoneNo: string,
         altPhoneNoCode: string,altPhoneNo: string,status: string,createdBy: number,
         createdOn: string,modifiedBy: number,modifiedOn: string
    ) {
    
            this.companyId = companyId;
            this.companyName = companyName;  
            this.gstNo = gstNo; 
            this.address1 = address1;  
            this.address2 = address2;  
            this.city = city; 
            this.pinCode = pinCode;  
            this.phoneNoCode = phoneNoCode;  
            this.phoneNo = phoneNo; 
            this.altPhoneNoCode = altPhoneNoCode; 
            this.altPhoneNo = altPhoneNo;  
            this.status = status; 
            this.createdBy = createdBy; 
            this.createdOn = createdOn; 
            this.modifiedBy = modifiedBy; 
            this.modifiedOn =modifiedOn;   
    }

  
}