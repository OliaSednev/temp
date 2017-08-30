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
let ProtocolsComponent = class ProtocolsComponent {
    constructor() {
        this.protocolChanged = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.selectedProtocols = [];
    }
    checkUncheckProtocol(protocol, $event) {
        if (!$event.target.checked) {
            let index = this.selectedProtocols.indexOf(protocol);
            if (index !== -1) {
                this.selectedProtocols.splice(index, 1);
            }
        }
        else {
            if (!this.selectedProtocols.includes(protocol)) {
                this.selectedProtocols.push(protocol);
            }
        }
        this.protocolChanged.emit(this.selectedProtocols);
    }
    clearSelections() {
        for (let protocol of this.protocols) {
            protocol.state = false;
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ProtocolsComponent.prototype, "protocols", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ProtocolsComponent.prototype, "protocolChanged", void 0);
ProtocolsComponent = __decorate([
    core_1.Component({
        selector: 'protocols',
        templateUrl: './protocols.component.html',
    })
], ProtocolsComponent);
exports.ProtocolsComponent = ProtocolsComponent;
//# sourceMappingURL=protocols.component.js.map