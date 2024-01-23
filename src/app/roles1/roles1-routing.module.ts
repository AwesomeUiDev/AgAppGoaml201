import { Routes } from '@angular/router';
import { Roles1Component } from './roles1.component';
import { RoleListComponent } from './role-list/role-list.component';
import {RoleDetailsComponent} from './role-details/role-details.component';

export const roles1Routes: Routes = [
  {
    path: "",
    component: RoleListComponent
  },
  {
    path: 'summary',
    component: RoleListComponent,
    pathMatch: "full",
    data: { title: 'Role Summary', breadcrumb: 'Role Summary' }
  }, /*{
    path: 'search',
    component: SearchRoleComponent,
    pathMatch: "full",
    data: { title: 'Role Maintenance', breadcrumb: 'Role Maintenance' }
  }, */{
    path: 'create',
    component: Roles1Component,
    pathMatch: "full",
    data: { title: 'Role Maintenance', breadcrumb: 'Role Maintenance' }
  },
  {
    path: 'details',
    component:RoleDetailsComponent,
    pathMatch: "full",
    data: { title: 'Role Maintenance', breadcrumb: 'Role Maintenance' }
  },
];

