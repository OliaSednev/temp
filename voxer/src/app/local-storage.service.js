"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// declare var toastr: any;
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.storageKey = 'personStorage';
    }
    LocalStorageService.prototype.saveToStorage = function (persons) {
        var stringifyObject = JSON.stringify(persons);
        localStorage.setItem(this.storageKey, stringifyObject);
        toastr.success('persons saved successfuly');
    };
    LocalStorageService.prototype.removeStorage = function () {
        localStorage.removeItem(this.storageKey);
    };
    LocalStorageService.prototype.getFromStorage = function () {
        return JSON.parse(localStorage.getItem(this.storageKey));
    };
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    core_1.Injectable()
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=local-storage.service.js.map