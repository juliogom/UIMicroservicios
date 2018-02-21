import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Empresa } from './empresa.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Empresa>;

@Injectable()
export class EmpresaService {

    private resourceUrl =  SERVER_API_URL + 'car/api/empresas';

    constructor(private http: HttpClient) { }

    create(empresa: Empresa): Observable<EntityResponseType> {
        const copy = this.convert(empresa);
        return this.http.post<Empresa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(empresa: Empresa): Observable<EntityResponseType> {
        const copy = this.convert(empresa);
        return this.http.put<Empresa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Empresa>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Empresa[]>> {
        const options = createRequestOption(req);
        return this.http.get<Empresa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Empresa[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Empresa = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Empresa[]>): HttpResponse<Empresa[]> {
        const jsonResponse: Empresa[] = res.body;
        const body: Empresa[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Empresa.
     */
    private convertItemFromServer(empresa: Empresa): Empresa {
        const copy: Empresa = Object.assign({}, empresa);
        return copy;
    }

    /**
     * Convert a Empresa to a JSON which can be sent to the server.
     */
    private convert(empresa: Empresa): Empresa {
        const copy: Empresa = Object.assign({}, empresa);
        return copy;
    }
}
