import { Photo } from './photo';

export interface Bike {
    id: number;
    brand: string;
    name: string;
    gears: number;
    bikerHeight: number;
    description: string;
    sex: string;
    color: string;
    photoUrl: string;
    model?: string;
    wheelSize?: number;
    type?: string;
    basket?: boolean;
    dateAdded?: Date;
    gearType?: string;
    breakType?: string;
    luggageRack?: boolean;
    photos?: Photo[];
}
