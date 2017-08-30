"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const drawing_service_1 = require("../../services/drawing/drawing.service");
const user_service_1 = require("../../services/user/user.service");
const router_1 = require("@angular/router");
const toast_service_1 = require("../../services/toast/toast.service");
let DrawingComponent = class DrawingComponent {
    constructor(drawingService, userService, toast, activatedRoute) {
        this.drawingService = drawingService;
        this.userService = userService;
        this.toast = toast;
        this.activatedRoute = activatedRoute;
        this.width = 1100;
        this.height = 450;
    }
    ngOnInit() {
        this.recordedLines = [];
        this.isRecording = null;
        this.isPlaying = null;
        this.activatedRoute.params.forEach((params) => {
            this.drawing_id = params['id'];
        });
    }
    ngAfterViewInit() {
        const canvasEl = this.canvas.nativeElement;
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
        const canvasEl = this.canvas.nativeElement;
        const rect = canvasEl.getBoundingClientRect();
        let x = e.changedTouches[0].pageX - rect.left;
        let y = e.changedTouches[0].pageY - rect.top;
        this.cx.moveTo(x, y);
        if (this.isRecording) {
            this.prevPosPoint = { x: x, y: y };
        }
    }
    touchMove(e) {
        this.endTime = new Date();
        this.creationTime = this.endTime.getTime() - this.startTime.getTime();
        e.preventDefault();
        const canvasEl = this.canvas.nativeElement;
        const rect = canvasEl.getBoundingClientRect();
        let x = e.changedTouches[0].pageX - rect.left;
        let y = e.changedTouches[0].pageY - rect.top;
        this.cx.lineTo(x, y);
        this.cx.stroke();
        if (this.isRecording) {
            this.currentPosPoint = { x: x, y: y };
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
        const canvasEl = this.canvas.nativeElement;
        const rect = canvasEl.getBoundingClientRect();
        let x = e.pageX - rect.left;
        let y = e.pageY - rect.top;
        this.cx.moveTo(x, y);
        if (this.isRecording) {
            this.prevPosPoint = { x: x, y: y };
        }
    }
    onmousemove(e) {
        if (this.clicked) {
            const canvasEl = this.canvas.nativeElement;
            const rect = canvasEl.getBoundingClientRect();
            let x = e.pageX - rect.left;
            let y = e.pageY - rect.top;
            this.cx.lineTo(x, y);
            this.cx.stroke();
            if (this.isRecording) {
                this.currentPosPoint = { x: x, y: y };
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
            this.drawingService.getDrawing(this.drawing_id).subscribe((drawing) => {
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
    get selectedLineWidth() {
        return this._selectedLineWidth;
    }
    set selectedLineWidth(value) {
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
        const canvasEl = this.canvas.nativeElement;
        let dataURL = canvasEl.toDataURL('image/png', 1.0);
        let drawing = {
            created_by: this.userService.getLoggedInUser().name,
            creation_date_time: this.startTime,
            drawing_time: this.creationTime.toString(),
            data: dataURL
        };
        this.drawingService.uploadDrawing(drawing).subscribe((arrivedData) => {
            this.toast.success('your painting hab been successfuly uploaded to the server.');
        });
        this.startTime = null;
        window.clearInterval(this.measuringTimerId);
    }
    startMeasuringTimer() {
        this.measuringTimerId = window.setInterval(() => {
            let currentTimeMilli = new Date().getTime();
            let startTimeMilli = this.startTime.getTime();
            this.drawingTime = new Date(currentTimeMilli - startTimeMilli);
        }, 1000);
    }
    selectErase() {
        this.selectColor('white');
    }
    isSelectedColor(color) {
        return color === this.selectedColor ? true : false;
    }
    selectColor(color) {
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
    drawLine(line) {
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
            const canvasEl = this.canvas.nativeElement;
            let dataURL = canvasEl.toDataURL('image/png', 1.0);
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', dataURL);
            downloadLink.setAttribute('download', 'canvas_drawing_' + new Date().valueOf() + this.userService.getLoggedInUser().name);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
};
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", core_1.ElementRef)
], DrawingComponent.prototype, "canvas", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DrawingComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DrawingComponent.prototype, "height", void 0);
DrawingComponent = __decorate([
    core_1.Component({
        selector: 'drawing',
        templateUrl: './drawing-canvas.component.html'
    }),
    __metadata("design:paramtypes", [drawing_service_1.DrawingService,
        user_service_1.UserService,
        toast_service_1.ToastService,
        router_1.ActivatedRoute])
], DrawingComponent);
exports.DrawingComponent = DrawingComponent;
//# sourceMappingURL=drawing-canvas.component.js.map