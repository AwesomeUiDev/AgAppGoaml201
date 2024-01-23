import { Timestamp } from "rxjs";

export class TvAdjustmentValue
{
    account_number:string;
    branch_code:string;
    currency:string;
    debit_amount:number;
    credit_amount:number;
    department:string;
    exec_date:Timestamp<Date>;
}