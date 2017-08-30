import { Component } from '@angular/core';
import { DrawingService } from '../../services/drawing/drawing.service';
import { Drawing } from '../../models/app.models';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'drawing-list',
    templateUrl: './drawing-list.component.html'
})
export class DrawingListComponent {

    drawings: Drawing[];
    userName: string;

    constructor(private drawingService: DrawingService,  private userService: UserService) {
    }

    ngOnInit(): void {
        this.drawingService.getPublicDrawings().subscribe(arrivedData => {
                this.drawings = arrivedData;
            }
        );
        this.userName = this.userService.getLoggedInUser().name;
    }

    deleteDrawing(drawing: Drawing) {
        this.drawingService.deleteDrawing(drawing).subscribe((arrivedData: Drawing) => {
            this.drawingService.getPublicDrawings().subscribe(drawings => {
                    this.drawings = drawings;
                }
            );
        });
    }
}
