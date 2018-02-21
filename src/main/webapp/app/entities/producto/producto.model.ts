import { BaseEntity } from './../../shared';

export class Producto implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public precio?: number,
        public marca?: string,
        public empresas?: BaseEntity[],
    ) {
    }
}
