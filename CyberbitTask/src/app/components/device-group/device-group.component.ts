import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Device, DeviceGroup} from '../../models/app.models';

@Component({
    selector: 'device-group',
    templateUrl: './device-group.component.html',
})

export class DeviceGroupComponent implements OnInit {
    @Input() deviceGroup: DeviceGroup;
    @Output() deviceGroupChanged = new EventEmitter<DeviceGroup>();
    selectedDeviceGroup: DeviceGroup;
    public isCollapsed: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        this.selectedDeviceGroup = {id: this.deviceGroup.id, name: this.deviceGroup.name, devices: []};
    }

    deviceCheckUncheck(device: Device, $event) {

        if (!$event.target.checked) {
            let index = this.selectedDeviceGroup.devices.indexOf(device);

            if (index !== -1) {
                this.selectedDeviceGroup.devices.splice(index, 1);
                this.deviceGroupChanged.emit(this.selectedDeviceGroup);
            }
        } else {
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
        } else {
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
}

