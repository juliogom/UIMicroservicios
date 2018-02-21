import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-empresa',
    templateUrl: './empresa.component.html'
})
export class EmpresaComponent implements OnInit, OnDestroy {
empresas: Empresa[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private empresaService: EmpresaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.empresaService.query().subscribe(
            (res: HttpResponse<Empresa[]>) => {
                this.empresas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmpresas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Empresa) {
        return item.id;
    }
    registerChangeInEmpresas() {
        this.eventSubscriber = this.eventManager.subscribe('empresaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
