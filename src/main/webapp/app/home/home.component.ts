import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {EmpresaService} from '../entities/empresa/empresa.service';
import { Account, LoginModalService, Principal } from '../shared';
import { Empresa } from '../entities/empresa/empresa.model';
import {TaskService} from '../entities/task/task.service';
import {Task} from '../entities/task/task.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    empresas: Empresa[];

    constructor(
        private empresaService: EmpresaService,
        private taskService: TaskService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {

        this.taskService.query().subscribe(
            (res: HttpResponse<Task[]>) => {
                this.empresas = res.body;
            }
        );

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
