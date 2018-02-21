import { BaseEntity } from './../../shared';

export class Empresa implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public nit?: string,
        public telefono?: string,
        public direccion?: string,
        public productos?: BaseEntity[],
    ) {
    }
}
