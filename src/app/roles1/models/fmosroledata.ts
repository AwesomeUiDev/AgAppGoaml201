import {roleScreens} from './roleScreens'; 
import {roleLabels} from './roleLabels';
import {fmosRolePermissions} from './fmosRolePermissions';
import {roleTabs} from './roleTabs';
import {fmosroles} from './fmosroles';

export class fmosrolesdata {
    roleDto:fmosroles[];
    permissionDto:fmosRolePermissions[];
    tabDto:roleTabs;
    labelDto:roleLabels[];
    screenDto:roleScreens[];
}

