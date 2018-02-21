/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { EmpresaDetailComponent } from '../../../../../../main/webapp/app/entities/empresa/empresa-detail.component';
import { EmpresaService } from '../../../../../../main/webapp/app/entities/empresa/empresa.service';
import { Empresa } from '../../../../../../main/webapp/app/entities/empresa/empresa.model';

describe('Component Tests', () => {

    describe('Empresa Management Detail Component', () => {
        let comp: EmpresaDetailComponent;
        let fixture: ComponentFixture<EmpresaDetailComponent>;
        let service: EmpresaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EmpresaDetailComponent],
                providers: [
                    EmpresaService
                ]
            })
            .overrideTemplate(EmpresaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpresaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpresaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Empresa(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.empresa).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
