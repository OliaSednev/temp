import {Component, OnInit, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {Data, DeviceGroup, Protocol, TimePeriod} from '../../models/app.models';
import {ProtocolsComponent} from '../protocols/protocols.component';
import {DeviceGroupComponent} from '../device-group/device-group.component';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
})

export class RootComponent implements OnInit {
    selectedDeviceGroups: DeviceGroup[];
    selectedProtocols: Protocol[];
    selectedTimePeriod: TimePeriod;
    data: Data;

    @ViewChild(ProtocolsComponent)
    private protocolsComponent: ProtocolsComponent;

    @ViewChildren('cmp') components: QueryList<DeviceGroupComponent>;

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.resetSelections();

        this.dataService.getData().subscribe((arrivedData: Data) => {
            this.data = arrivedData;
        });
    }

    onTimePeriodSelected(timePeriod: TimePeriod) {
        this.selectedTimePeriod = timePeriod;
    }

    onProtocolSelected(protocols: Protocol[]) {
        this.selectedProtocols = protocols;
    }

    onDeviceGroupSelectionChanged(deviceGroup: DeviceGroup) {

        let index = this.selectedDeviceGroups.indexOf(deviceGroup);

        if (index !== -1) {
            this.selectedDeviceGroups[index] = deviceGroup;
        } else {
            this.selectedDeviceGroups.push(deviceGroup);
        }
    }

    resetSelections() {
        this.selectedProtocols = [];
        this.selectedTimePeriod = {id: '', name: ''};
        this.selectedDeviceGroups = [];
    }

    onClearSelected() {
        this.resetSelections();
        this.protocolsComponent.clearSelections();
        this.components.forEach((child) => {
            child.clearSelections();
        });
    }
}

