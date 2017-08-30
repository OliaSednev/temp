export interface Drawing {
    created_by: string;
    creation_date_time: Date;
    drawing_time: string;
    _id?: string;
    data: string;
}

export interface User {
    name: string;
    password: string;
}

export enum LocalStorageKey {
    User
}

export interface Point {
    x: number;
    y: number;
}

export interface Line {
    prevPos: Point;
    currentPos: Point;
    color: string;
    lineWidth: number;
}
