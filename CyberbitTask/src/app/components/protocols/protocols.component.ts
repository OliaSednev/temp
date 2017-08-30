import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Protocol} from '../../models/app.models';

@Component({
    selector: 'protocols',
    templateUrl: './protocols.component.html',
})

export class ProtocolsComponent implements OnInit {
    @Input() protocols: Protocol[];
    @Output() protocolChanged = new EventEmitter<Protocol[]>();
    selectedProtocols: Protocol[];

    ngOnInit(): void {
        this.selectedProtocols = [];
    }

    checkUncheckProtocol(protocol: Protocol, $event) {
        if (!$event.target.checked) {
            let index = this.selectedProtocols.indexOf(protocol);

            if (index !== -1) {
                this.selectedProtocols.splice(index, 1);
            }
        } else {
            if (!this.selectedProtocols.includes(protocol)) {
                this.selectedProtocols.push(protocol);
            }
        }

        this.protocolChanged.emit(this.selectedProtocols);
    }

    clearSelections() {
        for ( let protocol of this.protocols) {
            protocol.state = false;
        }
    }
}
