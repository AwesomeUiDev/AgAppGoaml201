import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { roles1Routes } from './roles1-routing.module';
import { RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
//import { SearchRoleComponent } from './search-role/search-role.component';
import { Roles1Component } from './roles1.component';
//import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';


//import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleDetailsComponent } from './role-details/role-details.component';


@NgModule({
  declarations: [
    RoleListComponent,
   // SearchRoleComponent,
    Roles1Component,
    RoleDetailsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(roles1Routes)
  ]
})
export class Roles1Module { }
