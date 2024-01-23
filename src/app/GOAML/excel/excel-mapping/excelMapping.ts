export class ExcelMappingClass {
    extSys: string;
    processName: string;
    headerName: string;
    dateFormat: string;
    //headerName:string;
    mappingColumn: string;
    id: number;
    columnnDescription: string;
    columnnName: string;
    dataType: string;
    extSysName: string;
    mandatory: boolean;
    version:number;
    creatorId:string;
creatorDtStamp:string;
verifierId:string;
verifierDtStamp:string;

}
export class ExcelMappingClass2 {
    columnnName: string;
    dataType: string;
    headerName: string;
    dateFormat: string;
  
    mappingColumn: string;
    mandatory: boolean;
    id: number;
    version:number;
    creatorId:string;
creatorDtStamp:string;
verifierId:string;
verifierDtStamp:string;
}
export class ExcelMappingClass3 {
    excelMappingDto: ExcelMappingClass[];
    excelMapping: Array<ExcelMappingClass2>;
}