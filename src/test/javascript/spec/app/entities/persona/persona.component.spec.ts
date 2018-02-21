/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { PersonaComponent } from '../../../../../../main/webapp/app/entities/persona/persona.component';
import { PersonaService } from '../../../../../../main/webapp/app/entities/persona/persona.service';
import { Persona } from '../../../../../../main/webapp/app/entities/persona/persona.model';

describe('Component Tests', () => {

    describe('Persona Management Component', () => {
        let comp: PersonaComponent;
        let fixture: ComponentFixture<PersonaComponent>;
        let service: PersonaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PersonaComponent],
                providers: [
                    PersonaService
                ]
            })
            .overrideTemplate(PersonaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Persona(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.personas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
