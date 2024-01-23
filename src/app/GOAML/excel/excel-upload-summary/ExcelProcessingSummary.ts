import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class ExcelProcessingSummary
{
    extSysName:string;
    processName:string;
    executionDate:Date;
    uploadTime:Date;
    version:number;
    username:string;
    filename:string;
    status:string;
}