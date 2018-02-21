import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayEmpresaModule } from './empresa/empresa.module';
import { GatewayCarModule } from './car/car.module';
import { GatewayPersonaModule } from './persona/persona.module';
import { GatewayProductoModule } from './producto/producto.module';
import { GatewayDriverModule } from './driver/driver.module';
import { GatewayTaskModule } from './task/task.module';
import { GatewayJobModule } from './job/job.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayEmpresaModule,
        GatewayCarModule,
        GatewayPersonaModule,
        GatewayProductoModule,
        GatewayDriverModule,
        GatewayTaskModule,
        GatewayJobModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
