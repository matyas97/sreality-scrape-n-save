import { Property } from '../property.entity';

export type NewProperty = Omit<Property, 'id'>;
