import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ComponentRef } from '@angular/core';
import { AppComponent } from './app.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { ViewUserComponent } from './user-management/view-user/view-user.component';
import { AppRoutingModule } from './app-routing.module';
import { createComponent } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { FcdRefreshComponent } from './fcd/fcd-refresh/fcd-refresh.component';
import { FcdManualValuesInputComponent } from './fcd/fcd-manual-values-input/fcd-manual-values-input.component';
import { FcdFileUploadComponent } from './fcd/fcd-file-upload/fcd-file-upload.component';
import { FcdMaintenanceComponent } from './fcd/fcd-maintenance/fcd-maintenance.component';
import { FcdSubsidaryFileUploadComponent } from './fcd/fcd-subsidary-file-upload/fcd-subsidary-file-upload.component';
import { CreateRoleComponent } from './role-management/create-role/create-role.component';
import { ViewRoleComponent } from './role-management/view-role/view-role.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RiskRefreshComponent } from './risk/risk-refresh/risk-refresh.component';
import { RiskManualValuesInputComponent } from './risk/risk-manual-values-input/risk-manual-values-input.component';
import { RiskMaintenanceComponent } from './risk/risk-maintenance/risk-maintenance.component';
import { CarMaintenanceComponent } from './risk/car-maintenance/car-maintenance.component';
import { RiskAdjustmentValueComponent } from './risk/risk-adjustment-value/risk-adjustment-value.component';
import { SfInvestmentFilterComponent } from './risk/sf-investment-filter/sf-investment-filter.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { RefreshComponent } from './datamart-refresh/refresh/refresh.component';
import { ErrorComponent } from './datamart-refresh/error/error.component';
import { StagingComponent } from './datamart-refresh/staging/staging.component';
import { MasterComponent } from './datamart-refresh/master/master.component';
import { IbCapitalRefreshComponent } from './ib-capital/ib-capital-refresh/ib-capital-refresh.component';
import { IbCapitalFileUploadComponent } from './ib-capital/ib-capital-file-upload/ib-capital-file-upload.component';
import { ModifyUserComponent } from './user-management/modify-user/modify-user.component';
import { ModifyRoleComponent } from './role-management/modify-role/modify-role.component';
import { FinanceUploadComponent } from './finance/finance-upload/finance-upload.component';
import { BudgetComponent } from './finance/budget/budget.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FetchingComponent } from './mda/fetching/fetching.component';
import { ModificationProcessComponent } from './mda/modification-process/modification-process.component';
import { VerificationComponent } from './mda/verification/verification.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ExceldemoComponent } from './exceldemo/exceldemo.component';
import { APIService } from './api.service';
import {DataTableModule} from "angular-6-datatable";
import { FinanceDownloadComponent } from './finance/finance-download/finance-download.component';
import { FinanceAdjustmentValueComponent } from './finance/finance-adjustment-value/finance-adjustment-value.component';
import { EdoReportRefreshComponent } from './datamart-refresh/edo-report-refresh/edo-report-refresh.component';
import { DatamartRefreshMaintenanceComponent } from './datamart-refresh/datamart-refresh-maintenance/datamart-refresh-maintenance.component';
import { ReportParameterComponent } from './datamart-refresh/report-parameter/report-parameter.component';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { AboutComponent } from './about/about.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule, MatGridListModule, MatIconModule } from '@angular/material';
import { DefaultPasswordComponent } from './default-password/default-password.component';
import { IfrsFetchingComponent } from './ifrs/ifrs-fetching/ifrs-fetching.component';
import { IfrsProcessComponent } from './ifrs/ifrs-process/ifrs-process.component';
import { VerificationCreditComponent } from './ifrs/verification-credit/verification-credit.component';
import { VerificationFinanceComponent } from './ifrs/verification-finance/verification-finance.component';
import { DataExtractionComponent } from './GOAML/newModule/data-extraction/data-extraction.component';
import { GenerateXmlComponent } from './GOAML/generate-xml/generate-xml.component';
import { ReportingMaintenanceComponent } from './GOAML/admin-screen/reporting-maintenance/reporting-maintenance.component';
import { SystemConfigurationComponent } from './GOAML/admin-screen/system-configuration/system-configuration.component';
import { MessagesComponent } from './GOAML/messages/messages.component';
import { ReportsComponent } from './GOAML/reports/reports.component';
import { ExcelUploadComponent } from './GOAML/excel/excel-upload/excel-upload.component';
import { ExcelProcessingComponent } from './GOAML/excel/excel-processing/excel-processing.component';
import { ExcelMappingComponent } from './GOAML/excel/excel-mapping/excel-mapping.component';
import { ExcelUploadSummaryComponent } from './GOAML/excel/excel-upload-summary/excel-upload-summary.component';
import { ErrorlogComponent } from './GOAML/newModule/errorlog/errorlog.component';
import { SummaryComponent } from './GOAML/summary/summary.component';
import { ExtSysListComponent } from './GOAML/ext-system/ext-sys-list/ext-sys-list.component';
import { ExtSystemComponent } from './GOAML/ext-system/ext-system.component';
import { UpdateExtsysComponent } from './GOAML/ext-system/update-extsys/update-extsys.component';
import { ExcelExternalSysComponent } from './GOAML/ext-system/excel-external-sys/excel-external-sys.component';
import { ExtsummaryComponent } from './GOAML/ext-system/extsummary/extsummary.component';
import { UpdateexcelextComponent } from './GOAML/ext-system/extsummary/updateexcelext/updateexcelext.component';
import { TestComponent } from './GOAML/test/test.component';
import { StrDescComponent } from './GOAML/newModule/str-desc/str-desc.component';
import { UpdateExcelMappingComponent } from './GOAML/excel/excel-mapping/update-excel-mapping/update-excel-mapping.component';
import { HomeComponent } from './GOAML/home/home.component';
import { MatTableModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MaterialModule } from './GOAML/material/material.module';
import { LoaderComponent } from './GOAML/service/loader/loader.component';
import { AuthorizeXmlComponent } from './GOAML/authorize-xml/authorize-xml.component';
import { AppConfirmService } from './GOAML/service/app.confirm.service/app-confirm.service';
import { LoaderService } from './GOAML/service/loader.service';
// import { Role } from 'oldsrc/app/role-management/role';
// import { Roles1Component } from './/Roles1Component'
import {SecurityPolicyComponent} from './security-policy/security-policy.component';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { UserComponent } from './user/user.component';
import { DownloadComponent } from './GOAML/download/download.component';
import { UserIdleModule } from 'angular-user-idle';
import { UserAuditlogComponent } from './GOAML/user-auditlog/user-auditlog.component';
import { SecuritysummaryComponent } from './security-policy/securitysummary/securitysummary.component';
import { ReportmainteinanceSummaryComponent } from './GOAML/admin-screen/reportmainteinance-summary/reportmainteinance-summary.component';
import { SystemconfigurationSummaryComponent } from './GOAML/admin-screen/systemconfiguration-summary/systemconfiguration-summary.component';
// import { UserstatusAuditlogComponent } from './GOAML/userstatus-auditlog/userstatus-auditlog.component';








const routes:Routes = [
  { 
    path: 'adminHome', 
    component: AdminHomeComponent
  },
  { 
    path: 'userHome', 
    component: UserHomeComponent
  },
  {
    path: 'roles',
    loadChildren: './roles1/roles1.module#Roles1Module',
  },
  { 
    path: 'createUser', 
    component: CreateUserComponent
  },
  {
    path: 'viewUser',
    component:ViewUserComponent
  },
  { 
    path:'modifyUser',
    component:ModifyUserComponent
  },
  {
    path: 'createRole',
    component:CreateRoleComponent
  },
  {
    path: 'viewRole',
    component:ViewRoleComponent
  },
  {
    path:'modifyRole',
    component:ModifyRoleComponent
  },
  {
    path: 'fcdRefresh',
    component:FcdRefreshComponent
  },
  {
    path: 'fcdManualValuesInput',
    component:FcdManualValuesInputComponent
  },
  {
    path: 'fcdFileUpload',
    component:FcdFileUploadComponent
  },
  {
    path: 'fcdMaintenance',
    component:FcdMaintenanceComponent
  },
  {
    path: 'fcdSubsidaryFileUpload',
    component:FcdSubsidaryFileUploadComponent
  },
  {
    path: 'riskRefresh',
    component:RiskRefreshComponent
  },
  {
    path: 'riskManualValuesInput',
    component:RiskManualValuesInputComponent
  },
  {
    path: 'riskMaintenance',
    component:RiskMaintenanceComponent
  },
  {
    path: 'riskCarMaintenance',
    component:CarMaintenanceComponent
  },
  {
    path: 'riskAdjustmentValue',
    component:RiskAdjustmentValueComponent
  },
  {
    path: 'riskSfInvestmentFilter',
    component:SfInvestmentFilterComponent
  },
  {
    path: 'datamartRefreshStaging',
    component:StagingComponent
  },
  {
    path: 'datamartRefreshMaster',
    component:MasterComponent
  },
  {
    path: 'datamartRefresh',
    component:RefreshComponent
  },
  {
    path: 'datamartRefreshError',
    component:ErrorComponent
  },
  {
    path:'eodReportRefresh',
    component:EdoReportRefreshComponent
  },
  {
    path:'datamartRefreshMaintenance',
    component:DatamartRefreshMaintenanceComponent
  },
  {
    path:'reportParameter',
    component:ReportParameterComponent
  },
  {
    path: 'ibCapitalFileUpload',
    component:IbCapitalFileUploadComponent
  },
  {
    path: 'ibCapitalRefresh',
    component:IbCapitalRefreshComponent
  },
  {
    path: 'financeUpload',
    component:FinanceUploadComponent
  },
  {
    path:'financeDownload',
    component:FinanceDownloadComponent
  },
  {
    path:'financeAdjustmentValue',
    component:FinanceAdjustmentValueComponent
  },
  {
    path: 'financeBudget',
    component:BudgetComponent
  },
  {
    path: 'mdaFetching',
    component:FetchingComponent
  },
  {
    path: 'mdaModificationProcess',
    component:ModificationProcessComponent
  },
  {
    path: 'mdaVerification',
    component:VerificationComponent
  },
  {
    path: 'changePassword',
    component:ChangePasswordComponent
  },
  {
    path: 'defaultPassword',
    component:DefaultPasswordComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'ifrsFetching',
    component:IfrsFetchingComponent
  },
  {
    path:'ifrsProcess',
    component:IfrsProcessComponent
  },
  {
    path:'verificationFinance',
    component:VerificationFinanceComponent
  },
  {
    path:'verificationCredit',
    component:VerificationCreditComponent
  },
  {
    path: 'logout',
    component:LoginComponent
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component:LoginComponent
  },
  // GOAML
  {
    path: 'dataext',
    component: DataExtractionComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'generateXml',
    component: GenerateXmlComponent
    },
    {
      path: 'authorizeXml',
      component: AuthorizeXmlComponent
    },
  {
    path: 'reportingMaintenance',
    component: ReportingMaintenanceComponent
  },

  {
    path: 'systemConfig',
    component: SystemConfigurationComponent
  },

  {
    path: 'message',
    component: MessagesComponent
  },
  {
    path: 'report',
    component: ReportsComponent
  },

  {
    path: 'reports',
    component: DownloadComponent
  },

  {
    path: 'excelMapping',
    component: ExcelMappingComponent
  },
  {
    path: 'excelProcessing',
    component: ExcelProcessingComponent
  },
  {
    path: 'excelUploading',
    component: ExcelUploadComponent
  },
  {
    path: 'excelsummary',
    component: ExcelUploadSummaryComponent
  },
  {
    path: 'errorstack',
    component: ErrorlogComponent
  },
  {
    path: 'summary',
    component: SummaryComponent
  },


  {
    path: 'externalsystemlist',
    component: ExtSysListComponent
  },
  {
    path: 'externalsystem',
    component: ExtSystemComponent
  },
  {
    path: 'updatexternalsystem',
    component: UpdateExtsysComponent
  },
  {
    path: 'excelExtSys',
    component: ExcelExternalSysComponent
  },
  {
    path: 'excelExtSys',
    component: ExcelExternalSysComponent
  },
  {
    path: 'excelExtSysSummary',
    component: ExtsummaryComponent
  },
  {
    path: 'excelExtSysUpdate',
    component: UpdateexcelextComponent
  },
  //new Module
  {
    path: 'abctest1',
    component: TestComponent
  },
  {
    path: 'str',
    component: StrDescComponent
  },
  {
    path: 'securityPolicy',
    component: SecurityPolicyComponent
  },
  {
    path: 'updateExcelMapping',
    component: UpdateExcelMappingComponent
  },
  {
    path: 'user',
    component:  UserComponent
  },
  {
    path: 'download',
    component: UserAuditlogComponent
  },
  //SecuritysummaryComponent
  {
    path: 'securitySummary',
    component: SecuritysummaryComponent
  },
  {
    path: 'ReportmainteinanceSummary',
    component: ReportmainteinanceSummaryComponent
  },
  {
    path: 'SystemconfigurationSummary',
    component: SystemconfigurationSummaryComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ViewUserComponent,
    FcdRefreshComponent,
    FcdManualValuesInputComponent,
    FcdFileUploadComponent,
    FcdMaintenanceComponent,
    FcdSubsidaryFileUploadComponent,
    CreateRoleComponent,
    ViewRoleComponent,
    ChangePasswordComponent,
    RiskRefreshComponent,
    RiskManualValuesInputComponent,
    RiskMaintenanceComponent,
    CarMaintenanceComponent,
    RiskAdjustmentValueComponent,
    SfInvestmentFilterComponent,
    UserHomeComponent,
    RefreshComponent,
    ErrorComponent,
    StagingComponent,
    MasterComponent,
    IbCapitalRefreshComponent,
    IbCapitalFileUploadComponent,
    ModifyUserComponent,
    ModifyRoleComponent,
    FinanceUploadComponent,
    BudgetComponent,
    LoginComponent,
    FetchingComponent,
    ModificationProcessComponent,
    VerificationComponent,
    AdminHomeComponent,
    ExceldemoComponent,
    FinanceDownloadComponent,
    FinanceAdjustmentValueComponent,
    EdoReportRefreshComponent,
    DatamartRefreshMaintenanceComponent,
    ReportParameterComponent,
    AboutComponent,
    DefaultPasswordComponent,
    IfrsFetchingComponent,
    IfrsProcessComponent,
    VerificationCreditComponent,
    VerificationFinanceComponent,
    DataExtractionComponent,
    GenerateXmlComponent,
    ReportingMaintenanceComponent,
    SystemConfigurationComponent,
    MessagesComponent,
    ReportsComponent,
    ExcelMappingComponent,
    ExcelProcessingComponent,
    ExcelUploadComponent,
    ExcelUploadSummaryComponent,
    ErrorlogComponent,
    SummaryComponent,
    ExtSysListComponent,
    SummaryComponent,
    ExtSystemComponent,
    UpdateExtsysComponent,
    ExcelExternalSysComponent,
    ExtsummaryComponent,
    UpdateexcelextComponent,
    TestComponent,
    StrDescComponent,
    // Roles1Component,
    DataExtractionComponent,
    ExcelUploadSummaryComponent,
    ErrorlogComponent,
    UpdateExcelMappingComponent,
    HomeComponent,
    LoaderComponent,
    AuthorizeXmlComponent,
    ExcelUploadComponent,
    SecurityPolicyComponent,
    UserComponent,
    DownloadComponent,
    UserAuditlogComponent,
    SecuritysummaryComponent,
    ReportmainteinanceSummaryComponent,
    SystemconfigurationSummaryComponent
    // UserstatusAuditlogComponent,

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUpperCaseDirectiveModule,
    DataTableModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    UserIdleModule.forRoot({idle: 280, timeout:10,ping:10}),
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    RouterModule.forRoot(routes, { useHash: true }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    MatInputModule,
    MatIconModule,
],
  providers: [AppConfirmService,
              LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
