import {Injectable} from '@angular/core';
import {NetService} from '../net/net.service';
import {Observable} from 'rxjs';
import {Drawing} from '../../models/app.models';

@Injectable()
export class DrawingService {

    constructor(private net: NetService) {

    }

    getPublicDrawings(): Observable<Drawing[]>  {
        return this.net.getPublicDrawings();
    }

    getDrawing(id: string): Observable<Drawing>  {
        return this.net.getDrawing(id);
    }

    uploadDrawing(drawingData: Drawing): Observable<Drawing> {
        return this.net.uploadDrawing(drawingData);
    }

    deleteDrawing(drawingData: Drawing): Observable<Drawing> {
        return this.net.deleteDrawing(drawingData);
    }
}
