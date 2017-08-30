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
const protocols_component_1 = require("../protocols/protocols.component");
let RootComponent = class RootComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.resetSelections();
        this.dataService.getData().subscribe((arrivedData) => {
            this.data = arrivedData;
        });
    }
    onTimePeriodSelected(timePeriod) {
        this.selectedTimePeriod = timePeriod;
    }
    onProtocolSelected(protocols) {
        this.selectedProtocols = protocols;
    }
    onDeviceGroupSelectionChanged(deviceGroup) {
        let index = this.selectedDeviceGroups.indexOf(deviceGroup);
        if (index !== -1) {
            this.selectedDeviceGroups[index] = deviceGroup;
        }
        else {
            this.selectedDeviceGroups.push(deviceGroup);
        }
    }
    resetSelections() {
        this.selectedProtocols = [];
        this.selectedTimePeriod = { id: '', name: '' };
        this.selectedDeviceGroups = [];
    }
    onClearSelected() {
        this.resetSelections();
        this.protocolsComponent.clearSelections();
        this.components.forEach((child) => {
            child.clearSelections();
        });
    }
};
__decorate([
    core_1.ViewChild(protocols_component_1.ProtocolsComponent),
    __metadata("design:type", protocols_component_1.ProtocolsComponent)
], RootComponent.prototype, "protocolsComponent", void 0);
__decorate([
    core_1.ViewChildren('cmp'),
    __metadata("design:type", core_1.QueryList)
], RootComponent.prototype, "components", void 0);
RootComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './root.component.html',
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], RootComponent);
exports.RootComponent = RootComponent;
//# sourceMappingURL=root.component.js.map