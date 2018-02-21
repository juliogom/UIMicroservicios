import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
    selector: 'jhi-empresa-detail',
    templateUrl: './empresa-detail.component.html'
})
export class EmpresaDetailComponent implements OnInit, OnDestroy {

    empresa: Empresa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private empresaService: EmpresaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmpresas();
    }

    load(id) {
        this.empresaService.find(id)
            .subscribe((empresaResponse: HttpResponse<Empresa>) => {
                this.empresa = empresaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmpresas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'empresaListModification',
            (response) => this.load(this.empresa.id)
        );
    }
}
