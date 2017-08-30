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
let TimePeriodComponent = class TimePeriodComponent {
    constructor() {
        this.timePeriodChanged = new core_1.EventEmitter();
    }
    ngOnInit() {
    }
    selectTimePeriod(timePeriod, e) {
        this.selectedTimePeriod = timePeriod;
        this.timePeriodChanged.emit(timePeriod);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TimePeriodComponent.prototype, "times", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TimePeriodComponent.prototype, "timePeriodChanged", void 0);
TimePeriodComponent = __decorate([
    core_1.Component({
        selector: 'time-period',
        templateUrl: './time-period.component.html',
    })
], TimePeriodComponent);
exports.TimePeriodComponent = TimePeriodComponent;
//# sourceMappingURL=time-period.component.js.map