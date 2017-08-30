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
const data_service_1 = require("../../services/data/data.service");
let SelectionsSummaryComponent = class SelectionsSummaryComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.clearSelected = new core_1.EventEmitter();
    }
    ngOnInit() {
        this._selectedTimePeriod = { id: '', name: '' };
    }
    set selectedTimePeriod(selectedTimePeriod) {
        this._selectedTimePeriod = selectedTimePeriod;
    }
    get selectedTimePeriod() {
        return this._selectedTimePeriod;
    }
    set selectedProtocols(selectedProtocols) {
        this._selectedProtocols = selectedProtocols;
    }
    get selectedProtocols() {
        return this._selectedProtocols;
    }
    set selectedDeviceGroup(selectedDeviceGroup) {
        this._selectedDeviceGroups = selectedDeviceGroup;
    }
    get selectedDeviceGroup() {
        return this._selectedDeviceGroups;
    }
    clear() {
        this._selectedDeviceGroups = [];
        this._selectedProtocols = [];
        this._selectedTimePeriod = undefined;
        this.clearSelected.emit();
    }
    startLearning() {
        let protocols = [];
        for (let i = 0; i < this._selectedProtocols.length; i++) {
            protocols.push(this._selectedProtocols[i].name);
        }
        let protocolsAsString = protocols.join();
        let devices = [];
        for (let i = 0; i < this._selectedDeviceGroups.length; i++) {
            for (let j = 0; j < this._selectedDeviceGroups[i].devices.length; j++) {
                devices.push(this._selectedDeviceGroups[i].devices[j].name.replace('device', '').trim());
            }
        }
        let devicesAsString = devices.join();
        let timePeriodAsString = '';
        if (this._selectedTimePeriod) {
            timePeriodAsString = this._selectedTimePeriod.name;
        }
        // this.dataService.sendData(devicesAsString, protocolsAsString, timePeriodAsString);
        window.location.href = '/index.html?devices=' + devicesAsString + '\&protocols=' + protocolsAsString + '\&times=' + timePeriodAsString;
    }
};
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SelectionsSummaryComponent.prototype, "clearSelected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SelectionsSummaryComponent.prototype, "selectedTimePeriod", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], SelectionsSummaryComponent.prototype, "selectedProtocols", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], SelectionsSummaryComponent.prototype, "selectedDeviceGroup", null);
SelectionsSummaryComponent = __decorate([
    core_1.Component({
        selector: 'selections-summary',
        templateUrl: './selections-summary.component.html',
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], SelectionsSummaryComponent);
exports.SelectionsSummaryComponent = SelectionsSummaryComponent;
//# sourceMappingURL=selections-summary.component.js.map