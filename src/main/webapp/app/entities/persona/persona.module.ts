import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PersonaService,
    PersonaPopupService,
    PersonaComponent,
    PersonaDetailComponent,
    PersonaDialogComponent,
    PersonaPopupComponent,
    PersonaDeletePopupComponent,
    PersonaDeleteDialogComponent,
    personaRoute,
    personaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personaRoute,
    ...personaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonaComponent,
        PersonaDetailComponent,
        PersonaDialogComponent,
        PersonaDeleteDialogComponent,
        PersonaPopupComponent,
        PersonaDeletePopupComponent,
    ],
    entryComponents: [
        PersonaComponent,
        PersonaDialogComponent,
        PersonaPopupComponent,
        PersonaDeleteDialogComponent,
        PersonaDeletePopupComponent,
    ],
    providers: [
        PersonaService,
        PersonaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPersonaModule {}
