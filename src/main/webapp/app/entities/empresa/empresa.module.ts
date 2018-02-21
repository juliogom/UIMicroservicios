import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    EmpresaService,
    EmpresaPopupService,
    EmpresaComponent,
    EmpresaDetailComponent,
    EmpresaDialogComponent,
    EmpresaPopupComponent,
    EmpresaDeletePopupComponent,
    EmpresaDeleteDialogComponent,
    empresaRoute,
    empresaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...empresaRoute,
    ...empresaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmpresaComponent,
        EmpresaDetailComponent,
        EmpresaDialogComponent,
        EmpresaDeleteDialogComponent,
        EmpresaPopupComponent,
        EmpresaDeletePopupComponent,
    ],
    entryComponents: [
        EmpresaComponent,
        EmpresaDialogComponent,
        EmpresaPopupComponent,
        EmpresaDeleteDialogComponent,
        EmpresaDeletePopupComponent,
    ],
    providers: [
        EmpresaService,
        EmpresaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEmpresaModule {}
