import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Producto } from './producto.model';
import { ProductoPopupService } from './producto-popup.service';
import { ProductoService } from './producto.service';
import { Empresa, EmpresaService } from '../empresa';

@Component({
    selector: 'jhi-producto-dialog',
    templateUrl: './producto-dialog.component.html'
})
export class ProductoDialogComponent implements OnInit {

    producto: Producto;
    isSaving: boolean;

    empresas: Empresa[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productoService: ProductoService,
        private empresaService: EmpresaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.empresaService.query()
            .subscribe((res: HttpResponse<Empresa[]>) => { this.empresas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.producto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productoService.update(this.producto));
        } else {
            this.subscribeToSaveResponse(
                this.productoService.create(this.producto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Producto>>) {
        result.subscribe((res: HttpResponse<Producto>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Producto) {
        this.eventManager.broadcast({ name: 'productoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmpresaById(index: number, item: Empresa) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-producto-popup',
    template: ''
})
export class ProductoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productoPopupService: ProductoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productoPopupService
                    .open(ProductoDialogComponent as Component, params['id']);
            } else {
                this.productoPopupService
                    .open(ProductoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
