import { Timestamp } from "rxjs";

export class DatamartRefreshLog
{
    serial:number;
	exec_date:Date;
	type:string;
	process:string;
	package_name:string;
	exception_desc:string;
	log_timestamp:Timestamp<Date>;
	stage:string;
}