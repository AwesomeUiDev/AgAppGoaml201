import { Timestamp } from "rxjs";

export class TwMartRefresh
{
    exec_date: Date;
    module:string;
    exectime:Date;
    status:string;
    exec_start:Timestamp<Date>;
    exec_end:Timestamp<Date>;
    area:string;
    serial_no:number;

}