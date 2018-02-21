import { BaseEntity } from './../../shared';

export class Driver implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public cars?: BaseEntity[],
    ) {
    }
}
