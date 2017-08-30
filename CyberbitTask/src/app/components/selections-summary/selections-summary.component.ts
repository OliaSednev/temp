import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceGroup, Protocol, TimePeriod} from '../../models/app.models';
import {DataService} from '../../services/data/data.service';

@Component({
    selector: 'selections-summary',
    templateUrl: './selections-summary.component.html',
})

export class SelectionsSummaryComponent implements OnInit {
    private _selectedDeviceGroups: DeviceGroup[];
    private _selectedProtocols: Protocol[];
    private _selectedTimePeriod: TimePeriod;
    @Output() clearSelected = new  EventEmitter();

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this._selectedTimePeriod = {id: '', name: ''};
    }

    @Input()
    set selectedTimePeriod(selectedTimePeriod: TimePeriod) {
        this._selectedTimePeriod = selectedTimePeriod;
    }

    get selectedTimePeriod(): TimePeriod {
        return this._selectedTimePeriod;
    }

    @Input()
    set selectedProtocols(selectedProtocols: Protocol[]) {
        this._selectedProtocols = selectedProtocols;
    }

    get selectedProtocols(): Protocol[] {
        return this._selectedProtocols;
    }

    @Input()
    set selectedDeviceGroup(selectedDeviceGroup: DeviceGroup[]) {
        this._selectedDeviceGroups = selectedDeviceGroup;
    }

    get selectedDeviceGroup(): DeviceGroup[] {
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

        let protocolsAsString: string = protocols.join();

        let devices = [];
        for (let i = 0; i < this._selectedDeviceGroups.length; i++) {

            for (let j = 0; j < this._selectedDeviceGroups[i].devices.length; j++) {
                devices.push(this._selectedDeviceGroups[i].devices[j].name.replace('device','').trim());
            }
        }

        let devicesAsString: string = devices.join();

        let timePeriodAsString = '';

        if (this._selectedTimePeriod) {
            timePeriodAsString = this._selectedTimePeriod.name;
        }

        // this.dataService.sendData(devicesAsString, protocolsAsString, timePeriodAsString);

        window.location.href = '/index.html?devices=' + devicesAsString + '\&protocols=' + protocolsAsString + '\&times=' + timePeriodAsString;
    }
}
