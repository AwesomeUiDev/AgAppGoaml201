import { Routes } from '@angular/router';
import { SecurityPolicyComponent } from './security-policy.component';

export const securitypolicymod: Routes = [

  {
    path: '',
    component: SecurityPolicyComponent,
    pathMatch: 'full',
    data: { title: 'Security Policy', breadcrumb: 'Security Policy' }
  }
  // ,{
  //   path: 'database-level',
  //   component: DatabaselevelComponent,
  //   pathMatch: 'full',
  //   data: { title: 'DataBase Level', breadcrumb: 'DataBase Level' }
  // },{
  //   path: 'table-level',
  //   component: TablelevelComponent,
  //   pathMatch: 'full',
  //   data: { title: 'Data Store Monitoring', breadcrumb: 'Data Store Monitoring' }
  // },{
  //   path: 'empMonitoring',
  //   component: EmpMonitorComponent,
  //   pathMatch: 'full',
  //   data: { title: 'Employee Monitoring', breadcrumb: 'Employee Monitoring' }
  // },
  // {
  //   path: 'dsUserMonitoring',
  //   component: DsUserComponent,
  //   pathMatch: 'full',
  //   data: { title: 'DS User Monitoring', breadcrumb: 'DS User Monitoring' }
  // }


];

export class SecurityPolicyRouting { }
