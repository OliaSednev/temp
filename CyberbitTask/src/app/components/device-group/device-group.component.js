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
let DeviceGroupComponent = class DeviceGroupComponent {
    constructor() {
        this.deviceGroupChanged = new core_1.EventEmitter();
        this.isCollapsed = false;
    }
    ngOnInit() {
        this.selectedDeviceGroup = { id: this.deviceGroup.id, name: this.deviceGroup.name, devices: [] };
    }
    deviceCheckUncheck(device, $event) {
        if (!$event.target.checked) {
            let index = this.selectedDeviceGroup.devices.indexOf(device);
            if (index !== -1) {
                this.selectedDeviceGroup.devices.splice(index, 1);
                this.deviceGroupChanged.emit(this.selectedDeviceGroup);
            }
        }
        else {
            if (!this.selectedDeviceGroup.devices.includes(device)) {
                this.selectedDeviceGroup.devices.push(device);
                this.deviceGroupChanged.emit(this.selectedDeviceGroup);
            }
        }
    }
    checkAll(event) {
        event.stopPropagation();
        this.deviceGroup.devices.forEach(x => x.state = event.target.checked);
        if (!event.target.checked) {
            this.selectedDeviceGroup.devices = [];
        }
        else {
            for (let device of this.deviceGroup.devices) {
                this.selectedDeviceGroup.devices.push(device);
            }
        }
        this.deviceGroupChanged.emit(this.selectedDeviceGroup);
    }
    isAllChecked() {
        return this.deviceGroup.devices.every(x => x.state);
    }
    clearSelections() {
        this.selectedDeviceGroup.devices = [];
        for (let device of this.deviceGroup.devices) {
            device.state = false;
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DeviceGroupComponent.prototype, "deviceGroup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DeviceGroupComponent.prototype, "deviceGroupChanged", void 0);
DeviceGroupComponent = __decorate([
    core_1.Component({
        selector: 'device-group',
        templateUrl: './device-group.component.html',
    }),
    __metadata("design:paramtypes", [])
], DeviceGroupComponent);
exports.DeviceGroupComponent = DeviceGroupComponent;
//# sourceMappingURL=device-group.component.js.map