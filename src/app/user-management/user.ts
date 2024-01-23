export class User {
    userRef:number;
    userId: string;
    userName: string;
    userType: string;
    roleId: string;
    emailId: string;
    brnCode: string;
    mobileNo:string;
    authStatus:string;
    activeStatus:string;
    userPwd:string;
    newPwdFlg:string;
    modifyBy:string;
    authBy:string;
    versionNo:string;
    lastLgnTime:string;
    authDate:Date;
    changePwdDate:Date;
	  applications: string;
    changePassword: boolean;
    createdAt: Date;
    creatorDtStamp: Date;
    creatorId: string;
    currentSignInAt: Date;
    currentSignInIp: string;
    email: string;
    emailNotification: string;
    encryptedPassword: string;
    failedAttempts: number;
    lastSignInAt: Date;
    ldapUserId: string;
    lockedAt: Date;
    mobile: number;
    msadUserId: string;
    notificationEmails: string;
    notificationMobiles: boolean;
    rememberCreatedAt: Date;
    resetPasswordSentAt: Date;
    resetPasswordToken: string;
    recordStatus: string;
    signInCount: number;
    smsNotification: boolean;
    unlockToken: string;
    updatedAt: Date;
  
    
    
    verified: boolean;
    verifierDtStamp: Date;
    verifierId: string;
    
    autoAuth: boolean;
    maintAllowed: boolean;
    userAccessOption: string;
    roleForUser: string;
    
    updatedBy: string;
    logoutTime: string;
    fristTimeAuth: string;
    fristTimeLogin: string;
    newRoleForUser:any;
    userStatus:string;
  failLgnCounter: number;
 
  pwdChangeDate: Date;
  loggerSwitch: any;

    User(userId,userName,userType,roleId,emailId,brnCode,mobileNo)
    {
        this.userId=userId;
        this.userName=userName;
        this.userType=userType;
        this.roleId=roleId;
        this.emailId=emailId;
        this.brnCode=brnCode;
        this.mobileNo=mobileNo;

    }

}
