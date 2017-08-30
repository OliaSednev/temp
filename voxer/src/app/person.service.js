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
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var PersonService = (function () {
    function PersonService(http) {
        this.http = http;
        this.personsJsonFile = 'persons.json'; // URL to json file
    }
    PersonService.prototype.getAllPersons = function () {
        return this.http.get(this.personsJsonFile)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PersonService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    PersonService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    PersonService.prototype.readFile = function ($event) {
        var file = $event.target.files[0];
        var reader = new FileReader();
        var service = this;
        reader.onload = function (e) {
            var text = reader.result;
            var data = JSON.parse(text);
            service.persons = data.data;
        };
        reader.readAsText(file);
    };
    return PersonService;
}());
PersonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PersonService);
exports.PersonService = PersonService;
//# sourceMappingURL=person.service.js.map