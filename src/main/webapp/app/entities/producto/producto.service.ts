import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Producto } from './producto.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Producto>;

@Injectable()
export class ProductoService {

    private resourceUrl =  SERVER_API_URL + 'car/api/productos';

    constructor(private http: HttpClient) { }

    create(producto: Producto): Observable<EntityResponseType> {
        const copy = this.convert(producto);
        return this.http.post<Producto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(producto: Producto): Observable<EntityResponseType> {
        const copy = this.convert(producto);
        return this.http.put<Producto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Producto>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Producto[]>> {
        const options = createRequestOption(req);
        return this.http.get<Producto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Producto[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Producto = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Producto[]>): HttpResponse<Producto[]> {
        const jsonResponse: Producto[] = res.body;
        const body: Producto[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Producto.
     */
    private convertItemFromServer(producto: Producto): Producto {
        const copy: Producto = Object.assign({}, producto);
        return copy;
    }

    /**
     * Convert a Producto to a JSON which can be sent to the server.
     */
    private convert(producto: Producto): Producto {
        const copy: Producto = Object.assign({}, producto);
        return copy;
    }
}
