import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
//import { fmsMonitoringRoutes } from './fms-monitoring-routing.module';
import { RouterModule } from '@angular/router';
//import { CusttranComponent } from './custtran/custtran.component';
//import { DatabaselevelComponent } from './databaselevel/databaselevel.component';
//import { TablelevelComponent } from './tablelevel/tablelevel.component';
//import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EmpMonitorComponent } from './emp-monitor/emp-monitor.component';
// import { MatSortModule } from '@angular/material';
// import { DsUserComponent } from './ds-user/ds-user.component';
import {securitypolicymod} from './security-policy-routing.module'
import {SecurityPolicyComponent} from './security-policy.component'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { SecuritysummaryComponent } from './securitysummary/securitysummary.component';
import { SecurityPolicyEditComponent } from './security-policy-edit/security-policy-edit.component';

@NgModule({
  declarations: [
    // CusttranComponent,
    // DatabaselevelComponent,
    // EmpMonitorComponent,
    // TablelevelComponent,
    // DsUserComponent
    SecurityPolicyComponent,
    SecurityPolicyEditComponent,
    
  ],
  imports: [
    CommonModule,
   // SharedMaterialModule,
   AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // MatSortModule,
   // RouterModule.forChild(fmsMonitoringRoutes)
   RouterModule.forChild(securitypolicymod),
   MatInputModule,
   MatFormFieldModule
  ],
  exports:[
    CommonModule,
   // SharedMaterialModule,
   AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SecurityPolicyModule { }
