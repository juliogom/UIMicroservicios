import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Producto } from './producto.model';
import { ProductoService } from './producto.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-producto',
    templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit, OnDestroy {
productos: Producto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productoService: ProductoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productoService.query().subscribe(
            (res: HttpResponse<Producto[]>) => {
                this.productos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Producto) {
        return item.id;
    }
    registerChangeInProductos() {
        this.eventSubscriber = this.eventManager.subscribe('productoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
