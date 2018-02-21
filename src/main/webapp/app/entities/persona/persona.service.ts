import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Persona } from './persona.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Persona>;

@Injectable()
export class PersonaService {

    private resourceUrl =  SERVER_API_URL + 'car/api/personas';

    constructor(private http: HttpClient) { }

    create(persona: Persona): Observable<EntityResponseType> {
        const copy = this.convert(persona);
        return this.http.post<Persona>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(persona: Persona): Observable<EntityResponseType> {
        const copy = this.convert(persona);
        return this.http.put<Persona>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Persona>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Persona[]>> {
        const options = createRequestOption(req);
        return this.http.get<Persona[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Persona[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Persona = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Persona[]>): HttpResponse<Persona[]> {
        const jsonResponse: Persona[] = res.body;
        const body: Persona[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Persona.
     */
    private convertItemFromServer(persona: Persona): Persona {
        const copy: Persona = Object.assign({}, persona);
        return copy;
    }

    /**
     * Convert a Persona to a JSON which can be sent to the server.
     */
    private convert(persona: Persona): Persona {
        const copy: Persona = Object.assign({}, persona);
        return copy;
    }
}
