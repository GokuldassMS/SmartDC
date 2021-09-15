export class Purchase {    
    public purchaseId: number;
    public companyId: number;
    public customerId: number;
    public purchaseDate: string;  
    public styleNo: string; 
    public dcNo: string;  
    public vehicleNo: string;  
    public createdBy: number; 
    public createdOn: string; 
    public modifiedBy: number; 
    public modifiedOn: string; 
    

    constructor(purchaseId: number,companyId: number,customerId: number,purchaseDate: string,
        styleNo: string,dcNo: string,vehicleNo: string,createdBy: number,
        createdOn: string,modifiedBy: number,modifiedOn: string
    ) {
    
        this.purchaseId =purchaseId;
        this.companyId = companyId;
        this.customerId = customerId;
        this.purchaseDate = purchaseDate;  
        this.styleNo = styleNo; 
        this.dcNo = dcNo;  
        this.vehicleNo = vehicleNo;  
        this.createdBy = createdBy; 
        this.createdOn = createdOn; 
        this.modifiedBy = modifiedBy; 
        this.modifiedOn =modifiedOn;   
    }

  
}