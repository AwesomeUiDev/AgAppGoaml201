import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class ExcelMappingAuditLog{
    headerName: string;
    dateFormat: string;
    excelMappingColumn: string;
    columnnName: string;
    dataType: string;
    // extSysName: string;
    mandatory: boolean;
    id:number;
    tableMappingColumn:string;
    startingRow:number;
    headerRepeated:boolean
    authStatus:string;
    modifiedBy:string;
    authorizedBy:string;
    version:number;
    modifiedTime:Timestamp<Date>;
    authorizedTime:Timestamp<Date>;
    recordStatus:string;
    embedId:any;
}