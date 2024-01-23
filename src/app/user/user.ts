/* export class User {
    userId:string;
    userName:string;
    emailId:string;
    password:string;
    phoneNumber:number;
    roles:string;
    logoutTime:Date;
    sendNotification:string;
    buttonupdate?:boolean;
} */

export class User {

	userRef : string;
	  userId: string  ;
	  userName: string  ;
	  userType: string  ;
	  roleId: string  ;
	  emailId: string  ;
	  brnCode: string  ;
	  mobileNo: string  ;
	  activeStatus: string  ;
	 sendNotification: boolean  ;
	 phoneNumber: number  ;
	  versionNo: number  ;
	  userPwd: string  ;
	  newPwdFlg: string  ;
	  failLgnCounter: number  ;
	  initBrn: string  ;
	  lastLgnTime: string  ;
	  lastFailLgnTime: string  ;
	  loggerSwitch: string  ;
	  pwdNoExpiry: number  ;
	  pwdExpiryDays: number  ;
	  failedAttempts: number  ;
      pwdChangeDate: Date  ;
      buttonupdate?:boolean;
  password: any;
  logoutTime: any;
  responeMsg:string;
  status: string;
  pacakgemsg:string;
  authStatus:string;
//Quditlog
  creatorId:string;
creatorDtStamp:string;
verifierId:string;
verifierDtStamp:string;
}
