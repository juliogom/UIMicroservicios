import { BaseEntity } from './../../shared';

export class Persona implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public edad?: number,
    ) {
    }
}
