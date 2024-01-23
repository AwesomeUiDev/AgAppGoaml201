export class fmosscreenlabels {
    labelId:number;
    labelName:string;
    labelDescription:string;
    language:string;
    exist:boolean=true;
}

export class RolePermissions {
     labellist:fmosscreenlabels[];
}

export class permissionsLabels
{
    new:fmosscreenlabels;
    copy:fmosscreenlabels;
    delete:fmosscreenlabels;
    close:fmosscreenlabels;
    unlock:fmosscreenlabels;
    reopen:fmosscreenlabels;
    print:fmosscreenlabels;
    auth:fmosscreenlabels;
    view:fmosscreenlabels;
    reject:fmosscreenlabels;
}