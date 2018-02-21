import { BaseEntity } from './../../shared';

export class Car implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public modelo?: number,
        public precio?: number,
        public drivers?: BaseEntity[],
    ) {
    }
}
