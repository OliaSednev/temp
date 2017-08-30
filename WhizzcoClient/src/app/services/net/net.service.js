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
const http_1 = require("@angular/http");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/observable/of");
let NetService = class NetService {
    constructor(http) {
        this.http = http;
        this.serverUrl = 'http://localhost:4005';
    }
    // *************** Login / Logout ************************
    login(username, password) {
        return this.http.post(`${this.serverUrl}/api/login`, { username, password })
            .map(this.extractData)
            .catch(this.handleError);
    }
    // *************** Dashboard ************************
    getDashboardData() {
        return this.http.get(`${this.serverUrl}/api/dashboard`)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // *************** Websites ************************
    getWebsitesData() {
        return this.http.get(`${this.serverUrl}/api/websites`)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // *************** Campaigns ************************
    getCampaignData(id) {
        return this.http.get(`${this.serverUrl}/api/websites/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // *************** Handlers ************************
    extractData(res) {
        let body = res.json();
        return body.data || {};
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg;
        if (error instanceof http_1.Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    }
};
NetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NetService);
exports.NetService = NetService;
//# sourceMappingURL=net.service.js.map