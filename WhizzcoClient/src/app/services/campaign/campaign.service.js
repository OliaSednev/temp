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
const net_service_1 = require("../net/net.service");
let CampaignService = class CampaignService {
    constructor(net) {
        this.net = net;
    }
    getCampaignData(id) {
        return this.net.getCampaignData(id);
    }
};
CampaignService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [net_service_1.NetService])
], CampaignService);
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map