import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmpresaComponent } from './empresa.component';
import { EmpresaDetailComponent } from './empresa-detail.component';
import { EmpresaPopupComponent } from './empresa-dialog.component';
import { EmpresaDeletePopupComponent } from './empresa-delete-dialog.component';

export const empresaRoute: Routes = [
    {
        path: 'empresa',
        component: EmpresaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empresas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'empresa/:id',
        component: EmpresaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empresas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const empresaPopupRoute: Routes = [
    {
        path: 'empresa-new',
        component: EmpresaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empresas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empresa/:id/edit',
        component: EmpresaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empresas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empresa/:id/delete',
        component: EmpresaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empresas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
