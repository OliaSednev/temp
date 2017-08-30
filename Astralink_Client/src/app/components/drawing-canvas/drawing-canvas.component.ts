import {AfterViewInit, Component, ViewChild, ElementRef, Input} from '@angular/core';
import {DrawingService} from '../../services/drawing/drawing.service';
import {Drawing, Line, Point} from '../../models/app.models';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'drawing',
    templateUrl: './drawing-canvas.component.html'
})

export class DrawingComponent implements AfterViewInit {

    @ViewChild('canvas') public canvas: ElementRef;

    @Input() public width = 1100;
    @Input() public height = 450;

    private cx: CanvasRenderingContext2D;
    startTime: Date;
    endTime: Date;
    drawingTime: Date;
    creationTime: number;
    img: string;
    drawing_id: string;
    selectedColor: string;
    private _selectedLineWidth: number;
    measuringTimerId: number;
    recordedLines: Line[];
    clicked: number;
    isRecording: boolean;
    isPlaying: boolean;
    playIntervalId: number;
    prevPosPoint: Point;
    currentPosPoint: Point;

    constructor(private drawingService: DrawingService,
                private userService: UserService,
                private toast: ToastService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.recordedLines = [];
        this.isRecording = null;
        this.isPlaying = null;

        this.activatedRoute.params.forEach((params: Params) => {
            this.drawing_id = params['id'];
        });
    }

    public ngAfterViewInit() {

        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this._selectedLineWidth = 5;
        this.cx.lineWidth = this._selectedLineWidth;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';

        this.addDrawingToCanvas();

        this.selectColor('blue');
    }

    touchStart(e) {

        if (!this.startTime) {
            this.startTime = new Date();
            this.creationTime = null;
            this.startMeasuringTimer();
        }

        this.cx.beginPath();

        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        const rect = canvasEl.getBoundingClientRect();

        let x = e.changedTouches[0].pageX - rect.left;
        let y = e.changedTouches[0].pageY - rect.top;

        this.cx.moveTo(x, y);

        if (this.isRecording) {
            this.prevPosPoint = {x: x, y: y};
        }
    }

    touchMove(e) {

        this.endTime = new Date();
        this.creationTime = this.endTime.getTime() - this.startTime.getTime();

        e.preventDefault();

        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        const rect = canvasEl.getBoundingClientRect();

        let x = e.changedTouches[0].pageX - rect.left;
        let y = e.changedTouches[0].pageY - rect.top;

        this.cx.lineTo(x, y);
        this.cx.stroke();

        if (this.isRecording) {
            this.currentPosPoint = {x: x, y: y};
            this.recordedLines.push({
                prevPos: this.prevPosPoint,
                currentPos: this.currentPosPoint,
                color: this.selectedColor,
                lineWidth: this._selectedLineWidth
            });
            this.prevPosPoint = this.currentPosPoint;
        }
    }

    onmousedown(e) {

        if (!this.startTime) {
            this.startTime = new Date();
            this.creationTime = null;
            this.startMeasuringTimer();
        }

        this.clicked = 1;

        this.cx.beginPath();

        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        const rect = canvasEl.getBoundingClientRect();

        let x = e.pageX - rect.left;
        let y = e.pageY - rect.top;
        this.cx.moveTo(x, y);

        if (this.isRecording) {
            this.prevPosPoint = {x: x, y: y};
        }
    }

    onmousemove(e) {
        if (this.clicked) {

            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            const rect = canvasEl.getBoundingClientRect();

            let x = e.pageX - rect.left;
            let y = e.pageY - rect.top;
            this.cx.lineTo(x, y);
            this.cx.stroke();

            if (this.isRecording) {
                this.currentPosPoint = {x: x, y: y};
                this.recordedLines.push({
                    prevPos: this.prevPosPoint,
                    currentPos: this.currentPosPoint,
                    color: this.selectedColor,
                    lineWidth: this._selectedLineWidth
                });
                this.prevPosPoint = this.currentPosPoint;
            }
        }
    }

    onmouseup() {
        this.clicked = 0;

        this.endTime = new Date();
        this.creationTime = this.endTime.getTime() - this.startTime.getTime();
    }

    addDrawingToCanvas() {

        if (this.drawing_id) {

            this.drawingService.getDrawing(this.drawing_id).subscribe((drawing: Drawing) => {
                this.img = drawing.data;
                // });

                let paint = new Image();

                paint.src = this.img; // can also be a remote URL e.g. http://

                let _this = this;

                paint.onload = function () {
                    _this.cx.drawImage(paint, 0, 0);
                };
            });
        }
    }

    get selectedLineWidth(): number {
        return this._selectedLineWidth;
    }

    set selectedLineWidth(value: number) {
        this._selectedLineWidth = value;
        this.cx.lineWidth = value;
    }

    newCanvas(isResetStartTime = true) {
        this.cx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        window.clearInterval(this.measuringTimerId);
        if (isResetStartTime) {
            this.startTime = null;
        }
    }

    saveDrawing() {

        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        let dataURL = canvasEl.toDataURL('image/png', 1.0);

        let drawing: Drawing = {
            created_by: this.userService.getLoggedInUser().name,
            creation_date_time: this.startTime,
            drawing_time: this.creationTime.toString(),
            data: dataURL
        };

        this.drawingService.uploadDrawing(drawing).subscribe((arrivedData: Drawing) => {
            this.toast.success('your painting hab been successfuly uploaded to the server.');
        });

        this.startTime = null;
        window.clearInterval(this.measuringTimerId);
    }

    startMeasuringTimer() {
        this.measuringTimerId = window.setInterval(() => {
            let currentTimeMilli: number = new Date().getTime();
            let startTimeMilli: number = this.startTime.getTime();
            this.drawingTime = new Date(currentTimeMilli - startTimeMilli);
        }, 1000);
    }

    selectErase() {
        this.selectColor('white');
    }

    isSelectedColor(color: string): boolean {
        return color === this.selectedColor ? true : false;
    }

    selectColor(color: string) {
        this.cx.strokeStyle = color;
        this.selectedColor = color;
    }

    record() {
        this.isRecording = true;
    }

    stopRecordingOrPlaying() {
        if (this.isPlaying) {
            this.stopPlaying();
        }
        this.isRecording = false;
        this.isPlaying = false;
    }

    stopPlaying() {
        window.clearInterval(this.playIntervalId);
        this.isPlaying = false;
    }

    clearRecord() {
        this.newCanvas();
        this.recordedLines = [];
    }

    play() {
        this.newCanvas(false);
        this.isPlaying = true;
        let index = 0;
        let _this = this;

        this.playIntervalId = window.setInterval(() => {

            if (index === this.recordedLines.length) {
                _this.stopPlaying();
                return;
            }

            if (_this.recordedLines[index].prevPos && _this.recordedLines[index].currentPos) {
                _this.drawLine(_this.recordedLines[index]);
                index++;
            }
        }, 50);
    }

    private drawLine(line: Line) {
        if (!this.cx) {
            return;
        }

        this.cx.beginPath();

        if (line) {
            this.cx.strokeStyle = line.color;
            this.cx.lineWidth = line.lineWidth;
            this.cx.moveTo(line.prevPos.x, line.prevPos.y); // from
            this.cx.lineTo(line.currentPos.x, line.currentPos.y);
            this.cx.stroke();
        }
    }

    saveDrawingToDisk() {

        if (window.navigator.msSaveOrOpenBlob === undefined) {
            const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
            let dataURL = canvasEl.toDataURL('image/png', 1.0);
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', dataURL);
            downloadLink.setAttribute('download', 'canvas_drawing_' + new Date().valueOf() + this.userService.getLoggedInUser().name);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
}
