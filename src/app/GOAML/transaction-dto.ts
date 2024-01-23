export class TransactionDto {

    module: string;
    trnRefNo: string;
    // acEntrySrNo:string;
    userRefNo: string;
    brn: string;
    relatedCustomer: string;
    // accNo:string;
    dr_acc_no: string;
    cr_acc_no: string;
    // transactionType: string;
    transactionDate: Date;
    valueDate: DataCue;
    instType: string;
    // currency:string;
    dr_ccy: string;
    cr_ccy: string;
    acyAmount: number;
    exchangeRate: number;
    lcyAmount: number;
    purpose: string;
    originator: string;
    beneficiary: string;
    trnLocation: string;
    teller: string;
    authorizer: string;
    tranModeCode: string;
    reported: string;
    reportingDate: Date;
    reportType: string;
    reportId: string;
    reportName: string;
    // status:string;
}
