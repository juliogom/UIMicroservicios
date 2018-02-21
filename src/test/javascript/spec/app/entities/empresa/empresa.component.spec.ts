/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { EmpresaComponent } from '../../../../../../main/webapp/app/entities/empresa/empresa.component';
import { EmpresaService } from '../../../../../../main/webapp/app/entities/empresa/empresa.service';
import { Empresa } from '../../../../../../main/webapp/app/entities/empresa/empresa.model';

describe('Component Tests', () => {

    describe('Empresa Management Component', () => {
        let comp: EmpresaComponent;
        let fixture: ComponentFixture<EmpresaComponent>;
        let service: EmpresaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EmpresaComponent],
                providers: [
                    EmpresaService
                ]
            })
            .overrideTemplate(EmpresaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpresaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpresaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Empresa(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.empresas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
