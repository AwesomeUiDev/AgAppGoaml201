import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class SecurityDto {
    client_id: number;
    auth_status: string;
    authorized_by: string;
    authorized_time: Timestamp<Date>;
    max_inv_logins: number;
    max_pswd_length: number;
    min_pswd_length: number;
    modified_by: string;
    modified_time: Timestamp<Date>;
    notify_password_expiry_in_days: number;
    pswd_complexity: Array<number>;
     pswd_complex_lcase: any;
     pswd_complex_num: any;
     pswd_complex_splc: any;
     pswd_complex_ucase: any;
    pswd_expiry: number;
    pswd_reuse_aft: number;
    version: number;
}
