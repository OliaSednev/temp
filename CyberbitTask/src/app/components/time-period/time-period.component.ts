import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimePeriod} from '../../models/app.models';

@Component({
    selector: 'time-period',
    templateUrl: './time-period.component.html',
})

export class TimePeriodComponent implements OnInit {

    @Input() times: TimePeriod[];
    @Output() timePeriodChanged = new EventEmitter<TimePeriod>();
    selectedTimePeriod: TimePeriod;

    ngOnInit() {
    }

    selectTimePeriod(timePeriod: TimePeriod, e) {
        this.selectedTimePeriod = timePeriod;
        this.timePeriodChanged.emit(timePeriod);
    }
}
